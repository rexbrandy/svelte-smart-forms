<script lang="ts">
  import { getFormContext, type FormState } from "./formContext.svelte";

  let {
    field,
    formState: propsFormState
  } : {
    field: string;
    formState?: FormState;
  } = $props();

  // Allow formState override
  const contextFormState = getFormContext();
  const formState = propsFormState || contextFormState;

  const errors = $derived(formState.errors[field]);
  const fieldState = $derived(formState.fields[field]);
  const submitted = $derived(formState.submitted);

  let showErrors = $derived(submitted || (fieldState.blurred && !fieldState.valid));
</script>

{#if showErrors}
<div class="field-errors">
  {#each Object.values(errors) as error}
    <div class="error-message">{error}</div>
  {/each}
</div>
{/if}
