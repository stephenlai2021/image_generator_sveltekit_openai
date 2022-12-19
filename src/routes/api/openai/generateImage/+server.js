import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = async ({ request }) => {
  const { prompt, size } = await request.json();
  console.log("prompt: ", prompt);
  console.log("size: ", size);

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize
    });

    const imageUrl = response.data.data[0].url;

    return new Response(
      JSON.stringify({
        success: true,
        data: imageUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.response) {
      console.log('error code: ', error.response.status);
      console.log('error data', error.response.data);
    } else {
      console.log('error message: ', error.message);
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: "The image could not be generated",
      }),
      { status: 200 }
    );
  }
};
