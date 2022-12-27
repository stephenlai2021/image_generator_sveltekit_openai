import { writable } from "svelte/store";

export const imageGallery = writable([]);
export const imageUrl = writable(null);
export const isPromptSubmit = writable(false);

export const createImage = async (prompt) => {
  isPromptSubmit.set(true);

  const res = await fetch("/api/openai/generateImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const json = await res.json();
  imageUrl.set(json.data)
  console.log('image url: ', json.data)
  
  imageGallery.update((cur) => [{ image_url: json.data, prompt }, ...cur]);
  isPromptSubmit.set(false);
};
