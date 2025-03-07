import { getContext, setContext } from "svelte";
import type { FieldState } from "./interfaces";

const FORM_CONTEXT_KEY = Symbol('form-state');

export type FormState = ReturnType<typeof createFormState>;

export function createFormState() {
  const formState = $state({
    valid: false,
    submitted: false,
    fields: {} as Record<string, FieldState>,
    errors: {} as Record<string, Record<string, string>>,
    customRules: [] as Array<() => void>,

    addField(name: string, fieldState: FieldState) {
      this.fields[name] = fieldState;
      return fieldState;
    },

    removeField(name: string) {
      if (this.fields[name]) {
        delete this.fields[name];
        this.removeFieldErrors(name);
      }
    },
    
    addError(field: string, error: string, message: string) {
      if (!this.errors[field]) {
        this.errors[field] = {};
      }
      this.errors[field][error] = message;
      this.valid = false;
    },

    removeError(field: string, error: string) {
      if (this.errors[field][error]) {
        delete this.errors[field][error];
      }

      this.calculateValidity()
    },

    removeFieldErrors(field: string) {
      if (this.errors[field]) {
        delete this.errors[field];
      }

      this.calculateValidity()
    },

    clearErrors() {
      this.errors = {};
    },

    calculateValidity() {
      this.valid = Object.keys(this.errors).length === 0;

      for (const field of Object.values(this.fields)) {
        if (!field.valid) {
          this.valid = false;
          break;
        }
      }
    },

    validate() {
      // Set to Valid initially - Innocent until proven guilty
      this.valid = true;

      // Loop over all of the fields
      for (const [fieldName, field] of Object.entries(this.fields)) {
        if (!field.valid) {
          this.valid = false;
          
          // If field has errors and form doesnt know the errors, give them to the form
          if (Object.keys(field.errors).length > 0 && !this.errors[fieldName]) {
            this.errors[fieldName] = {...field.errors};
          }
        }
      }

      // Run custom validation rules here
      this.customRules.forEach((rule) => rule());

      return this.valid;
    }
  })

  return formState;
}


// Using the svelte context engine we can access the FormState from anywhere in the application without
// having to pass it up and down props
// Read more:
// - https://joyofcode.xyz/master-the-svelte-context-api#passing-reactive-state-to-context
// - https://svelte.dev/tutorial/svelte/context-api

export function setFormContext(formState: FormState) {
  return setContext(FORM_CONTEXT_KEY, formState);
}

export function getFormContext() {
  return getContext<FormState>(FORM_CONTEXT_KEY);
}
