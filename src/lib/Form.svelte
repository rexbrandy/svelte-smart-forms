<script lang="ts">
	import type { Snippet } from "svelte";
  import { setFormContext } from "./formContext.svelte";
	import type { FormState } from "./formContext.svelte";

  let { 
    formState,
    onSubmit = () => {},
    id = null,
    action = null,
    children
  } : {
    formState: FormState;
    onSubmit: () => void;
    id?: string | null;
    action?: string | null;
    children: Snippet;
  } = $props();

  setFormContext(formState);

  $effect(() => {
    formState.validate();

    // This create a dependency on the formstate fields
    Object.keys(formState.fields);
  })

  function handleSubmit(event: Event) {
    event.preventDefault();

    formState.submitted = true;

    if (!onSubmit) {
      return;
    }

    if (!formState.valid) {
      return;
    }

    onSubmit();
  }
</script>

<form {action} {id} onsubmit={handleSubmit}>
  {@render children()}
</form>