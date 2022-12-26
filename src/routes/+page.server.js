export const load = async ({ fetch }) => {
  const res = await fetch('/api/openai/generateImage')
  const json = await res.json()
  return { openai: json.data  }
};

