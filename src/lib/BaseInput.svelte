<script lang="ts">
	import { onMount, type Snippet } from "svelte";
  import type { ValidationRule, FieldState } from "./stores/interfaces";
	import { getFormContext } from "./stores/formContext.svelte";
  import type { FormState } from "./stores/formContext.svelte";
  
  let {
    label = '',
    value = $bindable(),
    name,
    required = false,
    disabled = false,
    class: className = '',
    onChange = () => {},
    onBlur = () => {},
    validationRules = [],
    children
  } : {
    label?: string;
    value: any;
    name: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    onChange?: () => void;
    onBlur?: () => void;
    validationRules: ValidationRule[];
    children: Snippet;
  } = $props();

  const formState: FormState = getFormContext();

  // Set up field state
  let fieldState = $state<FieldState>({
    dirty: false,
    valid: true,
    blurred: false,
    initial_value: null,
    errors: {},
    
    add_error: (error: string, message: string) => {
      fieldState.valid = false;
      fieldState.errors[error] = message;
    },
    
    remove_error: (error: string) => {
      delete fieldState.errors[error];
      if (Object.keys(fieldState.errors).length === 0) {
        fieldState.valid = true;
      }
    },
    
    blur: () => {
      fieldState.blurred = true;
    }
  });

  // add to formState onMount
  onMount(() => {
    if (formState) {
      formState.addField(name, fieldState);
      return () => {
        formState.removeField(name);
      }
    }
  })

  // Track if field is dirty
  $effect(() => {
    fieldState.dirty = value !== fieldState.initial_value;
  })
</script>

<div class={className + ' form-field'}>
  {#if label}
    <label for={name} class="form-label">
      {label}{#if required}<span class="required-mark">*</span>{/if}
    </label>
  {/if}

  {@render children()}

  <!-- Todo FieldErrors-->
</div>