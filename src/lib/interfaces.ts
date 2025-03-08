
export interface FieldState {
	dirty: boolean;
	valid: boolean;
	blurred: boolean;
	initial_value: any;
	errors: Record<string, string>;
	
	blur: () => void;
	add_error: (error: string, message: string) => void;
	remove_error: (error: string) => void;
}

export interface ValidationRule {
	validate: (value: any) => boolean;
	message: string;
}