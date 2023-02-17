<script>
  import { imageGallery } from '$lib/stores/imageStore'
  import { onMount } from 'svelte'
  import SubmitForm from '$lib/components/SubmitForm.svelte'
  import Spinner from '$lib/components/Spinner.svelte'

  export let data
  const { openai } = data
  $imageGallery = openai
  console.log('openai: ', openai)  
</script>

<div>
  <SubmitForm />
  <Spinner />
</div>