<script>
  import { isPromptSubmit } from "$lib/stores/imageStore"
</script>

<div class={$isPromptSubmit ? 'spinner show' : 'spinner'}></div>