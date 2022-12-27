import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { writeFileSync } from "fs";
import supabase from "$lib/supabase/config";
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-CNyAxWDWmtUylw5fFDP3pLmc",
});
const openai = new OpenAIApi(configuration);

export const GET = async () => {
  let { data, error } = await supabase
    .from("openai_db")
    .select("*")
    .neq("image_url", "NULL");

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

    const imageUrl = response.data.data[0].url;

    // Convert Image URL to Blob Buffer
    const imgResult = await fetch(imageUrl);
    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Save Image Buffer to Disk
    writeFileSync(`images/${Date.now()}.png`, buffer);

    // Save Image Blob to Supabase Storage
    await supabase.storage
      .from("openai-images")
      .upload(`${Date.now()}.png`, blob);

    // Save Image URL and Prompt to Supabase
    const { error } = await supabase
      .from("openai_db")
      .insert([{ prompt, image_url: imageUrl, answer: "" }]);

    if (error) {
      console.log("error: ", error);
    }

    // Return Image URL to Store
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
