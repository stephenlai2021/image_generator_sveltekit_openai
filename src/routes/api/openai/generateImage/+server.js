import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const GET = async () => {
  let { data, error } = await supabase.from("openai_db").select("*").neq('image_url', 'NULL')

  if (error) {
    console.log('error: ', error)
  }

  return new Response(
    JSON.stringify({
      data
    }),
    { status: 200 }
  );
}

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;

    const { error } = await supabase
      .from("openai_db")
      .insert([{ prompt, image_url: imageUrl, answer: '' }]);

    if (error) {
      console.log('error: ', error)
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: imageUrl
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
