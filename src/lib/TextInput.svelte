<script lang="ts">
  import BaseInput from "./BaseInput.svelte";
  import type { ValidationRule } from "./stores/interfaces";

  let {
    name,
    label = '',
    value = $bindable(),
    required = false,
    disabled = false,
    placeholder = '',
    showValidation = true,
    class: className = '',//'text-input',
    onChange = () => {},
    onKeyUp = () => {},
    validationRules = []
  } : {
    name: string;
    label?: string;
    value: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    showValidation?: boolean;
    class?: string,
    onChange?: () => void;
    onKeyUp?: () => void;
    validationRules?: Array<ValidationRule>;
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
    type="text"
    {name}
    id={name}
    bind:value={value}
    class={className + ' text-input'}
    {placeholder}
    {disabled}
    {required}
    onchange={onChange}
    onkeyup={onKeyUp}
    onblur={handleBlur}
  />
  {/snippet}
</BaseInput>