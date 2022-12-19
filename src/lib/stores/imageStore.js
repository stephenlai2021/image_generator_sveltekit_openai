import { writable } from "svelte/store";

export const imageUrl = writable(null);
export const isPromptSubmit = writable(false)

export const fetchImage = async (prompt, size) => {
  isPromptSubmit.set(true)

  const res = await fetch('/api/openai/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size
      })
    })

    const json = await res.json()
    console.log('image url: ', json.data)
    imageUrl.set(json.data)
    isPromptSubmit.set(false)
};