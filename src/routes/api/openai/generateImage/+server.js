import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import { supabase } from "$lib/supabase/config";
import { PUBLIC_OPENAI_API_KEY } from "$env/static/public";

const configuration = new Configuration({
  apiKey: PUBLIC_OPENAI_API_KEY,
  organization: "org-CNyAxWDWmtUylw5fFDP3pLmc",
});
const openai = new OpenAIApi(configuration);

export const GET = async () => {
  let { data, error } = await supabase
    .from("images_generator")
    .select("*")
    .order('created_at', { ascending: false })

  if (error) {
    console.log("error: ", error);
  }
  
  return new Response(
    JSON.stringify({
      data,
    }),
    { status: 200 }
  );
};

export const POST = async ({ request }) => {
  const { prompt } = await request.json();
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    // Get image url from OpenAI
    const imageUrl = response.data.data[0].url;
    console.log('image url | server: ', imageUrl)

    // Convert image url to blob & buffer
    const imgResult = await fetch(imageUrl);
    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    let tempFile = `${Date.now()}.png`
    // Save image buffer to disk
    // writeFileSync(`images/${tempFile}`, buffer);

    // Save image blob to Supabase Storage (OK)
    await supabase.storage
      .from("openai-images")
      // .upload(`${Date.now()}.png`, blob);
      .upload(tempFile, blob);

    // Save image url and prompt to Supabase Database
    const { error } = await supabase
      .from("images_generator")
      .insert([
        {
          prompt,
          image_url: `https://itzgmdgndusfvggjclwk.supabase.co/storage/v1/object/public/openai-images/${tempFile}`,
        },
      ]);

    if (error) {
      console.log("error: ", error);
    }

    // return image url to frontend(store)
    return new Response(
      JSON.stringify({
        success: true,
        data: imageUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.response) {
      console.log("error code: ", error.response.status);
      console.log("error data", error.response.data);
    } else {
      console.log("error message: ", error.message);
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
