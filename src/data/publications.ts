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
		link: "/view/cmu-dnanexus-hackathon-2025/",
		status: "preprint",
		isFirstAuthor: false,
		abstract: "In March 2025, 34 scientists from the United States, Ireland, the United Kingdom, Switzerland, France, Germany, Spain, India, and Australia gathered in Pittsburgh, Pennsylvania and virtually for a collaborative biohackathon, hosted by DNAnexus and Carnegie Mellon University Libraries. The goal of the hackathon was to explore machine learning approaches for multimodal problems in computational biology using public datasets. Teams worked on the following innovative projects: applying machine learning techniques for clustering and similarity analysis of haplotypes; adapting the StructLMM framework to study Gene-Gene (GxG) interactions; creating a nextflow workflow for generating an imputation reference panel using large-scale cohort data; optimizing discovery of causal relationships in large electronic health record (EHR) datasets using the open source causal analysis software Tetrad; examining the evolution of a graph neural network in a Lenski-esque experiment; and developing tools and workflows for generating pathway intersection diagrams and graph-based analyses for multiomics data. All projects were dedicated to study the background genomic and environmental effects underlying complex genotype-phenotype relationships. Their objective was to set foundations for further studies on predicting complex phenotypic traits using integrative multi-omic and environmental analyses. \n\n Haplotype analysis plays a critical role in understanding genetic variation and evolutionary relationships. This study presents a computational pipeline on DNANexus that integrates haplotype data processing, ancestral recombination graph (ARG) reconstruction, and machine learning techniques to explore genetic similarity and clustering among samples. We used SHAPEIT2 phased variant call format (VCF) files from chromosomes 6, 8, 21, and 22 of the 1000 Genomes Project, converted the data into haplotype (HAP) format using Plink2, and applied preprocessing steps to standardize the input for ARG Needle. We also filtered chromosome 6 haplotypes for TNF and HLA-A variants and chromosome 8 for beta defensin, as TNF is one of the least variable genes in the human genome, while HLA-A and beta defensin are amongst the most variable. We obtained 61, 313, and 486 deduplicated biallelic SNPs for TNF, HLA-A, and beta defensin, respectively. We then performed hierarchical clustering and similarity matrix calculation from these gene-specific haplotypes.",
		keyFindings: [
			"Developed a cloud-based computational pipeline on DNANexus integrating haplotype processing and Ancestral Recombination Graph (ARG) reconstruction.",
			"Analyzed 1000 Genomes Project data across chromosomes 6, 8, 21, and 22 to explore genetic similarity and clustering.",
			"Focused on highly variable genes (HLA-A, beta defensin) and conserved genes (TNF) to study evolutionary relationships.",
			"Demonstrated scalable machine learning approaches for multimodal problems in computational biology using public datasets."
		],

		publishedDate: "Jun 2025",
		bibtex: `@article{sabata2025addressing,
                title={Addressing Background Genomic and Environmental Effects on Health through Accelerated Computing and Machine Learning: Results from the 2025 Hackathon at Carnegie Mellon University},
                author={Sabata, Siddharth and Kubica, J{\k{e}}drzej and Gupta, Rishika and Ericson, Lars and Atanda, Halimat and Subramaniam, Gobikrishnan and Moller, Abraham and Abolade, Rachael and Banka, Arth and Blechman, Samuel and others},
                year={2025},
                publisher={OSF}
                }`
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
		link: "/view/eeg-feature-extraction/",
		status: "published",
		isFirstAuthor: true,
		abstract: "Amidst the rising incidence of neurological disorders detected through electroencephalograms (EEG), this study explores innovative techniques for feature extraction. Analyzing EEG data from 88 subjects across 19 channels, a diverse set of 18 features including Relative Intensity Ratio, Power Spectral Intensity, Petrosian Fractal Dimensions, Hjorth Mobility, Hjorth Complexity, Detrended Fluctuation Analysis, Higuchi Fractal Dimension, Hjorth Activity, Sample Entropy, and Lempel-Ziv Complexity and many more are extracted. Encompassing temporal and spectral domains, these features provide comprehensive insights into neurophysiological processes, enabling nuanced EEG data exploration and identification of subtle patterns linked with various neurological disorders. Through rigorous analysis, we evaluate the efficacy of these features in precise disease discrimination using advanced building on two models: Bagging Blended Combination of XGBoost and LightGBM (BBE-XL) and a Multilayer Artificial Neural Network (ML-ANN). By deciphering intricate EEG signal information, this study aids in early detection and intervention for EEG-related disorders, with 97.62% accuracy.",
		keyFindings: [
			"Achieved 97.62% diagnostic accuracy using a novel Bagging Blended Combination of XGBoost and LightGBM (BBE-XL).",
			"Extracted 18 diverse features across temporal and spectral domains, including Fractal Dimensions and Hjorth parameters.",
			"Analyzed EEG data from 88 subjects across 19 channels to identify subtle patterns linked to neurological disorders.",
			"Demonstrated that combining creative feature extraction with ensemble learning significantly improves disease discrimination."
		],

		publishedDate: "Dec 2023",
		bibtex: `@inproceedings{jha2023harnessing,
                title={Harnessing creative methods for EEG feature extraction and modeling in neurological disorder diagnoses},
                author={Jha, Avish and Kuruvilla, Nevin and Garg, Pramika and Victor, Akila},
                booktitle={2023 7th International Conference on Computation System and Information Technology for Sustainable Solutions (CSITSS)},
                pages={1--6},
                year={2023},
                organization={IEEE}
                }`
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
		link: "/view/multiresolution-dark-channel-dehazing/",
		status: "published",
		isFirstAuthor: false,
		abstract: "Capturing images in conditions marked by fog or smog results in compromised visual quality, characterized by reduced visibility and contrast. Such limitations impede critical tasks like image segmentation, target detection, and video surveillance within outdoor monitoring systems. This paper presents an effective image defogging algorithm designed to rectify these issues and restore image clarity. In this study, we introduce a method centered around a dark channel prior, a foundational image characteristic preceding the haze removal process. This prior harnesses statistical insights from haze-free outdoor images, revealing a significant finding: numerous set of patches in haze-free images harbor pixels exhibiting remarkably minuscule intensities in more than a single colour channel. Through integration of this algorithm into the imaging model for hazing, the algorithm adeptly estimates haze thickness, thereby facilitating the recovery of high-quality, haze-free images. We take a novel approach enhancing the dark channel prior, and its practical implementation demonstrates promise. By improving visibility and contrast, it has the potential to enhance the performance of outdoor monitoring systems, including video surveillance, in unfavorable weather conditions. Extensive testing underscores the effectiveness of our approach in improving image quality and its utility across various real-world applications.",
		keyFindings: [
			"Enhanced the Dark Channel Prior (DCP) algorithm to more accurately estimate haze thickness in outdoor images.",
			"Demonstrated significant improvements in visibility and contrast for video surveillance systems in poor weather.",
			"Validated that haze-free patches consistently exhibit low intensity in at least one color channel, enabling robust haze removal.",
			"Proposed a computationally efficient method suitable for real-time applications like autonomous driving and security monitoring."
		],

		publishedDate: "Dec 2023",
		bibtex: `@inproceedings{garg2023enhancing,
                title={Enhancing Visibility: Multiresolution Dark Channel Prior for Dehazing and Fog Removal in Images},
                author={Garg, Pramika and Jha, Avish and Jindal, Sumit Kumar},
                booktitle={2023 7th International Conference on Computation System and Information Technology for Sustainable Solutions (CSITSS)},
                pages={1--6},
                year={2023},
                organization={IEEE}
                }`
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
		link: "/view/sudoku-backtracking-analysis/",
		status: "published",
		isFirstAuthor: false,
		abstract: "Sudoku is a 9 x 9 grid-based puzzle. It is a game where each row, column, and 3 x 3 box must have one instance of a number from 1 to 9. In present paper, we shall evaluate three different algorithmic approaches both in serial and parallel configurations that can be utilised to solve a puzzle of Sudoku to assess their comparative performance metrics for differential randomly generated Sudoku datasets. We shall utilise Breadth-first search, Depth-first search, Depth-first search with Breadth-first search parallelisation for sub-tress, for evaluating a large number of randomly generated Sudoku puzzles with a varying number of clues to find the best algorithm based on time and space complexity as well as clue complexity. With this, we shall analyse and develop a best practice algorithm that can be ideally used to solve a large number of puzzles in any given situation in the most time-efficient manner. Our analysis has found that there was a significant improvement in utilising the parallel algorithm over both the Breadth-first and Depth-first search approaches from 28% to over 56%. Even moving from Breadth-first to Depth-first search, we have gauged quite a moderate improvement in performance from 15 to 21%.",
		keyFindings: [
			"Parallelized search algorithms outperformed serial approaches by 28% to 56% in solving complex Sudoku puzzles.",
			"Depth-First Search (DFS) demonstrated a 15-21% performance improvement over Breadth-First Search (BFS) in serial configurations.",
			"Developed a hybrid DFS-BFS parallelization strategy for sub-tree processing to optimize time and space complexity.",
			"Analyzed performance across varying puzzle complexities, establishing best practices for backtracking-based search algorithms."
		],

		publishedDate: "Jan 2022",
        bibtex: `@incollection{garg2022randomised,
                title={Randomised analysis of backtracking-based search algorithms in elucidating sudoku puzzles using a dual serial/parallel approach},
                author={Garg, Pramika and Jha, Avish and Shukla, Kumar A},
                booktitle={Inventive Computation and Information Technologies: Proceedings of ICICIT 2021},
                pages={281--295},
                year={2022},
                publisher={Springer}
                }`
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
		link: "/view/automated-driving-pathway-detection/",
		status: "published",
		isFirstAuthor: false,
		abstract: "Image data is one of the most popular real world input data that can be used for variety of applications ranging from robotics and computer vision to security systems. In combination with other methods such as neural network, Artificial neural network and image processing techniques, manipulation of image data can lead to applications such as detection of objects, tracking, identification and vision based robotics and so on. Advanced Driver Assistance System (ADAS) also use image for camera based driver assistance systems.The report covers a hardware model system that tests the software work of detection of traffic signs and path for it own ADAS systems. Different problems were tackled, including the choice of OS, and additional hardware components needed to tackle. The choice of programming languages, equipment, OS and methods were based on simplicity and practicality. Artificial neural network in combination with Open CV libraries were used for stop sign, traffic light and path road detection. The hardware model consisted of RC Car attached to raspberry pi board with a mounted pi camera for video streaming and an arduino controller attached to a radio transmitter for controlling through Open CV running in windows PC.",
		keyFindings: [
			"Built a functional prototype autonomous vehicle using Raspberry Pi, Arduino, and a custom RC car chassis.",
			"Implemented real-time computer vision pipelines using OpenCV for path following, stop sign detection, and traffic light recognition.",
			"Integrated Artificial Neural Networks (ANN) to improve detection accuracy in varying environmental conditions.",
			"Validated a low-cost, practical hardware-software architecture for educational and experimental ADAS systems."
		],

		publishedDate: "Feb 2020",
		bibtex: `@inproceedings{priyadarshini2020automated,
                title={Automated Detection Of Driving Pathway Using Image Processing},
                author={Priyadarshini, Poonam and Jha, Avish and Raj, Mayank},
                booktitle={2020 International Conference on Emerging Trends in Information Technology and Engineering (ic-ETITE)},
                pages={1--7},
                year={2020},
                organization={IEEE}
                }`
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
