<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
	import type { ValidationRule } from './interfaces';

  let {
    label = '',
    value = $bindable(),
    name = '',
    required = false,
    disabled = false,
    class: className = '',
    placeholder = '',
    showValidation = true,
    min = null,
    max = null,
    onChange = () => {},
    onKeyUp = () => {},
    validationRules = []
  } : {
    label?: string;
    value: number;
    name: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    on_change?: any;
    placeholder?: string;
    showValidation?: boolean;
    min?: number | null;
    max?: number | null;
    onChange?: () => void,
    onKeyUp?: () => void,
    validationRules?: Array<ValidationRule>
  } = $props();
</script>
  

  <BaseInput
  {name}
  {label}
  bind:value
  {disabled}
  {required}
  {validationRules}
  {showValidation}
>
  {#snippet input({ handleBlur }: { handleBlur: () => void })}
    <input
      type="number"
      {name}
      id={name}
      bind:value={value}
      class={className + ' smart-form-input'}
      {placeholder}
      {disabled}
      {required}
      {min}
      {max}
      onchange={onChange}
      onkeyup={onKeyUp}
      onblur={handleBlur}
    />
  {/snippet}
</BaseInput>
  