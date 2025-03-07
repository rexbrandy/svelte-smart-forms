<script lang="ts">
  import { createFormState } from "$lib/stores/formContext.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import Form from "$lib/Form.svelte";

  const formState = createFormState();

  const form: {
    text?: string;
  } = $state({
    text: '',
  });

  let submit = () => {
    console.log('submitted');
  };
</script>

<div style="width: 500px">
  <Form {formState} onSubmit={submit}>
    <TextInput
      name={'text'}
      label={'Text'}
      bind:value={form.text}
      required={true}
    ></TextInput>

    <!-- hr />
    <p>Error Message component</p>
    <FieldErrors></FieldErrors>

    <hr /-->

    <button>Submit</button>
  </Form>
</div>

<pre>{JSON.stringify(formState, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>
