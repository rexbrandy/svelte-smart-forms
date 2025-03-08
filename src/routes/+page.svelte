<script lang="ts">
  import { createFormState } from "$lib/formContext.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import NumberInput from "$lib/NumberInput.svelte";
  import Form from "$lib/Form.svelte";

  const formState = createFormState();

  const form: {
    text?: string;
    int: number;
  } = $state({
    text: '',
    int: 0
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
    />

    <NumberInput
      name='int'
      label='Int'
      bind:value={form.int}
      required={true}
    />

    <!-- hr />
    <p>Error Message component</p>
    <FieldErrors></FieldErrors>

    <hr /-->

    <button>Submit</button>
  </Form>
</div>

<pre>{JSON.stringify(formState, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>
