declare module "citation-js" {
	export default class Cite {
		constructor(data: string);
		format(type: string, options: Record<string, string>): string;
	}

	interface Templates {
		has(name: string): boolean;
		add(name: string, template: string): void;
	}

	interface CSLConfig {
		templates: Templates;
	}

	export const plugins: {
		config: {
			get(id: string): CSLConfig;
		};
	};
}
