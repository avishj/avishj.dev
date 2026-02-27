// Portal Burn Worker
// Runs WebGL2 shader compilation + animation off the main thread
// via OffscreenCanvas to avoid blocking TBT/TTI

import VERT from "../shaders/portal-burn.vert.glsl?raw";
import FRAG from "../shaders/portal-burn.frag.glsl?raw";

type InitMessage = {
	type: "init";
	canvas: OffscreenCanvas;
	originX: number;
	originY: number;
	W: number;
	H: number;
	dpr: number;
};

type ResizeMessage = {
	type: "resize";
	W: number;
	H: number;
};

type WorkerMessage = InitMessage | ResizeMessage;

let gl: WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;
let uDissolve: WebGLUniformLocation | null = null;
let uResolution: WebGLUniformLocation | null = null;
let uMaxDist: WebGLUniformLocation | null = null;

let W = 0;
let H = 0;
let centerX = 0;
let centerY = 0;

function computeMaxDist(): number {
	const aspect = W / H;
	let maxDist = 0;
	for (const [cx, cy] of [
		[0, 0],
		[1, 0],
		[0, 1],
		[1, 1],
	]) {
		const dx = (cx - centerX) * aspect;
		const dy = cy - centerY;
		const d = Math.sqrt(dx * dx + dy * dy);
		if (d > maxDist) maxDist = d;
	}
	return maxDist * 1.4;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram {
	const vs = gl.createShader(gl.VERTEX_SHADER)!;
	gl.shaderSource(vs, VERT);
	gl.compileShader(vs);

	const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
	gl.shaderSource(fs, FRAG);
	gl.compileShader(fs);

	const prog = gl.createProgram()!;
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);

	return prog;
}

function handleInit(data: InitMessage) {
	const canvas = data.canvas;
	W = data.W;
	H = data.H;
	const dpr = data.dpr;

	centerX = data.originX / W;
	centerY = 1.0 - data.originY / H;

	canvas.width = W * dpr;
	canvas.height = H * dpr;

	gl = canvas.getContext("webgl2", { alpha: true, antialias: false }) as WebGL2RenderingContext;
	if (!gl) {
		self.postMessage({ type: "complete" });
		return;
	}

	gl.viewport(0, 0, canvas.width, canvas.height);

	program = createProgram(gl);
	gl.useProgram(program);

	const buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
	const aPos = gl.getAttribLocation(program, "aPosition");
	gl.enableVertexAttribArray(aPos);
	gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

	uDissolve = gl.getUniformLocation(program, "uDissolve");
	const uCenter = gl.getUniformLocation(program, "uCenter");
	uResolution = gl.getUniformLocation(program, "uResolution");
	uMaxDist = gl.getUniformLocation(program, "uMaxDist");

	const maxDist = computeMaxDist();
	gl.uniform2f(uCenter, centerX, centerY);
	gl.uniform2f(uResolution, W, H);
	gl.uniform1f(uMaxDist, maxDist);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	const aspect = W / H;
	const distToHeader =
		Math.sqrt(Math.pow((0.5 - centerX) * aspect, 2) + Math.pow(1 - centerY, 2)) / maxDist;
	const nameX = 0.05;
	const distToName =
		Math.sqrt(Math.pow((nameX - centerX) * aspect, 2) + Math.pow(1 - centerY, 2)) / maxDist;

	const duration = 3800;
	const startTime = performance.now();
	let headerRevealed = false;
	let nameRevealed = false;

	setTimeout(() => self.postMessage({ type: "complete" }), 400);

	function animate() {
		if (!gl) return;
		const elapsed = performance.now() - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = 1 - Math.pow(1 - progress, 3);

		gl.uniform1f(uDissolve, easedProgress);

		if (!nameRevealed && easedProgress >= distToName) {
			nameRevealed = true;
			self.postMessage({ type: "nameReveal" });
		}
		if (!headerRevealed && easedProgress >= distToHeader) {
			headerRevealed = true;
			self.postMessage({ type: "headerReveal" });
		}

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		if (progress < 1) {
			requestAnimationFrame(animate);
		} else {
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			self.postMessage({ type: "done" });
		}
	}

	requestAnimationFrame(animate);
}

function handleResize(data: ResizeMessage) {
	if (!gl) return;
	W = data.W;
	H = data.H;
	const dpr = Math.min(self.devicePixelRatio ?? 2, 2);
	(gl.canvas as OffscreenCanvas).width = W * dpr;
	(gl.canvas as OffscreenCanvas).height = H * dpr;
	gl.viewport(0, 0, W * dpr, H * dpr);
	gl.uniform2f(uResolution, W, H);
	gl.uniform1f(uMaxDist, computeMaxDist());
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
	if (e.data.type === "init") {
		handleInit(e.data);
	} else if (e.data.type === "resize") {
		handleResize(e.data);
	}
};
