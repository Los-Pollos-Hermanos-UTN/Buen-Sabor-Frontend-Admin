export interface FormStep {
	number: number;
	icon?: number;
	label: string;
	isSubstep: boolean;
	substeps?: number;
	fields: JSX.Element;
}
