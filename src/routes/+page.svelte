<script>
  import { imageGallery } from '$lib/stores/imageStore'
  import SubmitForm from '$lib/components/SubmitForm.svelte'
  import Spinner from '$lib/components/Spinner.svelte'

  export let data
  const { openai } = data
  // console.log('openai: ', openai)

  let temp = []
  openai.forEach(item => {
    temp = [{ image_url: item.image_url, prompt: item.prompt }, ...temp]
    $imageGallery = temp
  })
  // console.log('image gallery | page', $imageGallery)
</script>

<div>
  <SubmitForm />
  <Spinner />
</div>