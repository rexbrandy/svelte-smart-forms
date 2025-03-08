import type { ValidationRule } from "./interfaces";

export function email(): ValidationRule {
	return {
		validate: (value: string) => {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		},
		message: "Enter a valid email address"
	}
}

export function passwordConfirm(otherPassword: string): ValidationRule {
	return {
		validate: (value: string) => { return value === otherPassword},
		message: "Passwords don't match"
	}
}

export function passwordComplexity(customRule?: RegExp, customMessage?: string): ValidationRule {
	/*
		^(?=.*[a-z]): Ensures at least one lowercase letter.
		(?=.*[A-Z]): Ensures at least one uppercase letter.
		(?=.*\d): Ensures at least one digit.
		(?=.*[@$!%*?&]): Ensures at least one special character.
		[A-Za-z\d@$!%*?&]{8,}$: Ensures the password is at least 8 characters long.
	*/
	let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
	let defaultMessage = "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special charcter and be 8 characters long";

	const regexToUse = customRule || passwordRegex;
	return {
		validate: (value: string) => { return regexToUse.test(value)},
		message: customMessage || defaultMessage
	}
}
