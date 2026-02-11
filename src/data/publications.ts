export interface Publication {
	slug: string;
	title: string;
	authors: string[];
	highlightAuthor: string;
	venue: string;
	venueType: "IEEE" | "Springer" | "Preprint";
	year: number;
	citations: number;
	doi?: string;
	link: string;
	status: "published" | "accepted" | "preprint";
	isFirstAuthor?: boolean;
	abstract: string;
	keyFindings: string[];
	pdfFile?: string;
	publishedDate?: string;
	bibtex: string;
}

export interface ConferenceService {
	type: "conference";
	role: string;
	conference: string;
	abbreviation: string;
	organizers: string[];
	year: number;
	location: string;
	dates: string;
	details: string;
	link: string;
}

export interface TeachingService {
	type: "teaching";
	role: string;
	course: string;
	courseCode: string;
	department: string;
	institution: string;
	year: number;
	location: string;
	dates: string;
	responsibilities: string[];
}

export type AcademicService = ConferenceService | TeachingService;

export const publications: Publication[] = [
	{
		slug: "cmu-dnanexus-hackathon-2025",
		title: "Addressing Background Genomic and Environmental Effects on Health through Accelerated Computing and Machine Learning: Results from the 2025 Hackathon at Carnegie Mellon University",
		authors: ["S. Sabata", "J. Kubica", "R. Gupta", "L.W. Ericson", "H.C. Atanda", "G. Subramaniam", "A.G. Moller", "R.O. Abolade", "A. Banka", "S. Blechman", "R. Brenner", "M. Chikina", "L.C. Chong", "N.P. Cooley", "D. Chang", "P. Greer", "A. Gupta", "A. Jha", "E. Kacar", "N. Kubota", "W. Lu", "L. Luo", "T. Ly", "R. Mondal", "C. O'Donoghue", "A.M. Phyo", "P. Qiu", "G. Ross-Dolan", "A. Saadat", "S. Sadasivan", "R. Satterwhite", "S. Shirolkar", "Y. Zheng", "H. Wang", "M. Gainey", "B. Busby"],
		highlightAuthor: "A. Jha",
		venue: "CMU-DNAnexus Hackathon",
		venueType: "Preprint",
		year: 2025,
		citations: 1,
		doi: "https://doi.org/10.37044/osf.io/3a8cn_v1",
		link: "https://doi.org/10.37044/osf.io/3a8cn_v1",
		status: "preprint",
		isFirstAuthor: false,
		abstract: "",
		keyFindings: [],
		publishedDate: "Jan 2025",
		bibtex: ""
	},
	{
		slug: "eeg-feature-extraction",
		title: "Harnessing Creative Methods for EEG Feature Extraction and Modeling in Neurological Disorder Diagnoses",
		authors: ["A. Jha", "N. Kuruvilla", "P. Garg", "A. Victor"],
		highlightAuthor: "A. Jha",
		venue: "7th CSITSS",
		venueType: "IEEE",
		year: 2023,
		citations: 7,
		doi: "https://doi.org/10.1109/CSITSS60515.2023.10334244",
		link: "https://doi.org/10.1109/CSITSS60515.2023.10334244",
		status: "published",
		isFirstAuthor: true,
		abstract: "",
		keyFindings: [],
		publishedDate: "Nov 2023",
		bibtex: ""
	},
	{
		slug: "multiresolution-dark-channel-dehazing",
		title: "Enhancing Visibility: Multiresolution Dark Channel Prior for Dehazing and Fog Removal in Images",
		authors: ["P. Garg", "A. Jha", "S.K. Jindal"],
		highlightAuthor: "A. Jha",
		venue: "7th CSITSS",
		venueType: "IEEE",
		year: 2023,
		citations: 2,
		doi: "https://doi.org/10.1109/CSITSS60515.2023.10334128",
		link: "https://doi.org/10.1109/CSITSS60515.2023.10334128",
		status: "published",
		isFirstAuthor: false,
		abstract: "",
		keyFindings: [],
		publishedDate: "Nov 2023",
		bibtex: ""
	},
	{
		slug: "sudoku-backtracking-analysis",
		title: "Randomised Analysis of Backtracking-based Search Algorithms in Elucidating Sudoku Puzzles Using a Dual Serial/Parallel Approach",
		authors: ["P. Garg", "A. Jha", "A. Shukla"],
		highlightAuthor: "A. Jha",
		venue: "4th ICICIT · LNNS vol. 336",
		venueType: "Springer",
		year: 2022,
		citations: 2,
		doi: "https://link.springer.com/chapter/10.1007/978-981-16-6723-7_21",
		link: "https://link.springer.com/chapter/10.1007/978-981-16-6723-7_21",
		status: "published",
		isFirstAuthor: false,
		abstract: "",
		keyFindings: [],
		publishedDate: "2022",
		bibtex: ""
	},
	{
		slug: "automated-driving-pathway-detection",
		title: "Automated Detection Of Driving Pathway Using Image Processing",
		authors: ["P. Priyadarshini", "A. Jha", "M. Raj"],
		highlightAuthor: "A. Jha",
		venue: "ic-ETITE",
		venueType: "IEEE",
		year: 2020,
		citations: 0,
		doi: "https://ieeexplore.ieee.org/document/9077722",
		link: "https://ieeexplore.ieee.org/document/9077722",
		status: "published",
		isFirstAuthor: false,
		abstract: "",
		keyFindings: [],
		publishedDate: "Feb 2020",
		bibtex: ""
	}
];

export const academicService: AcademicService[] = [
	{
		type: "conference",
		role: "Programme Committee Member",
		conference: "17th International Conference on Swarm Intelligence",
		abbreviation: "ICSI 2026",
		organizers: ["IASEI", "Sichuan University", "Peking University", "IEEE CIS"],
		year: 2026,
		location: "Chengdu, China",
		dates: "Jul 11 · 14, 2026",
		details: "Reviewer · Proceedings in Springer LNCS",
		link: "https://iasei.org/icsi2026/"
	},
	{
		type: "teaching",
		role: "Teaching Assistant",
		course: "Formal Methods",
		courseCode: "17-614",
		department: "Software and Societal Systems Department",
		institution: "Carnegie Mellon University",
		year: 2025,
		location: "Pittsburgh, PA",
		dates: "Fall 2025",
		responsibilities: ["Grading", "Office Hours", "Doubt Clearing"]
	}
];

export const venueColors: Record<string, string> = {
	IEEE: "var(--color-accent-ieee)",
	Springer: "var(--color-accent-springer)",
	Preprint: "#2ea44f"
};

export const venueLabels: Record<string, string> = {
	IEEE: "IEEE",
	Springer: "Springer",
	Preprint: "BioHackrXiv"
};

export const MAX_AUTHORS = 8;

export interface DisplayAuthor {
	name: string;
	isHighlight: boolean;
	separator: string;
}

export function getDisplayAuthors(pub: Publication): { authors: DisplayAuthor[]; truncated: boolean } {
	if (pub.authors.length <= MAX_AUTHORS) {
		return {
			authors: pub.authors.map((a, i) => ({
				name: a,
				isHighlight: a === pub.highlightAuthor,
				separator: i < pub.authors.length - 1 ? ", " : ""
			})),
			truncated: false
		};
	}
	const shown = pub.authors.slice(0, 6);
	const highlightInShown = shown.includes(pub.highlightAuthor);
	const result: DisplayAuthor[] = shown.map((a) => ({
		name: a,
		isHighlight: a === pub.highlightAuthor,
		separator: ", "
	}));
	if (!highlightInShown) {
		result.push({ name: "...", isHighlight: false, separator: " " });
		result.push({ name: pub.highlightAuthor, isHighlight: true, separator: ", " });
	}
	return { authors: result, truncated: true };
}

/** Get first N sentences of abstract as a preview */
export function getAbstractPreview(abstract: string, sentences = 2): string {
	if (!abstract) return "";
	const matches = abstract.match(/[^.!?]+[.!?]+/g);
	if (!matches) return abstract;
	return matches.slice(0, sentences).join("").trim();
}
