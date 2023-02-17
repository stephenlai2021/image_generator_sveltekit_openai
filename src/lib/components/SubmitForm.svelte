<script>
  import { imageUrl, createImage, imageGallery } from "$lib/stores/imageStore";
  import IconClear from "$lib/components/IconClear.svelte";

  let prompt = "";
  let showIconClear = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt) {
      alert("please describe an image 😘");
      return;
    }

    createImage(prompt);
  };

  const handleInput = () => {
    prompt = "";
    showIconClear = false;
  };

  $: if (prompt) {
    showIconClear = true;
  }
</script>

<main>
  <section class="showcase">
    <form on:submit|preventDefault={handleSubmit}>
      <h1 class="title">Image Generator</h1>
      <div class="form-control">
        <input
          type="text"
          placeholder="Please describe the image ..."
          class="form-input"
          bind:value={prompt}
        />
        {#if showIconClear}
          <div on:keydown on:click={handleInput}>
            <IconClear />
          </div>
        {/if}
      </div>
      <button type="submit" class="btn"> Generate </button>
    </form>
  </section>

  <section class="image">
    <div class="image-container">
        {#each $imageGallery as item}
          <div class="card">
            <img src={item.image_url} alt="" class="image_url" />
            <p class="prompt">{item.prompt}</p>
          </div>
        {/each}
    </div>
  </section>
</main>

<style>
  .showcase {
    padding-bottom: 50px;
  }
</style>