export interface FormStep {
	number?: number;
	label: string;
	isSubstep: boolean;
	fields: JSX.Element;
}
