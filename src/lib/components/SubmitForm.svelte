<script>
  import { imageUrl, fetchImage } from '$lib/stores/imageStore'
  import IconClear from "$lib/components/IconClear.svelte";

  let prompt = ''
  let size = 'medium'
  let showIconClear = false
  let options = [
    { id: 1, size: "small" },
    { id: 2, size: "medium" },
    { id: 3, size: "large" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt) {
      alert("please describe an image 😘");
      return;
    }

    fetchImage(prompt, size);
    console.log("image url: ", imageUrl);
  };

  const handleInput = () => {
    prompt = ''
    showIconClear = false
  }

  $: if (prompt) {
    showIconClear = true
  }
</script>

<main>
  <section class="showcase">
    <form on:submit|preventDefault={handleSubmit}>
      <h1 class="title">Image Generator</h1>
      <div class="form-control">
        <input
          type="text"
          placeholder="Enter Text"
          class="form-input"
          bind:value={prompt}
        />
        {#if showIconClear}
          <div on:keydown on:click={handleInput}>
            <IconClear />
          </div>
        {/if}            
      </div>
      <div class="form-control">
        <select name="size">
          <option>-- Please select image size --</option>
            {#each options as o}
              <option value={o.size}>
                {o.size}
              </option>
            {/each}
        </select>
      </div>
      <button type="submit" class="btn">
        Generate
      </button>
      <p class="description">This App is powered by <span>Sveltekit1.0</span> + <span>Open AI</span></p>
    </form>
  </section>

  <section class="image">
    <div class="image-container">
      {#if $imageUrl}
        <img src={$imageUrl} alt="" id="image" />
      {/if}
    </div>
  </section>
</main>