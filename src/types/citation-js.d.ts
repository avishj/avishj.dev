declare module "citation-js" {
	export default class Cite {
		constructor(data: string);
		format(type: string, options: Record<string, string>): string;
	}
}
