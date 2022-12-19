# OpenAI Image Generator

Sveltekit 1.0 has finally released and launched, and it is the best moment to buid apps with this most advanced, smarties, powerful fullstack framework. 

I am very glad that we can use OpenAI services to generator AI images, this is really interesting and amazing, especially for people who are not familiar with arts and we can still get the pictures we want by describing specific needs to OpenAI server. 😘

I ported this app from Node/Express project to Sveltekit made by Brad Traversy, because with Sveltekit we don't need to create a separate backend, we dont' need to build a backend from scratch, we can avoid all those steps to power a backend because Sveltekit takes care of all the heavy lifting for us which is the best part 🤩

The backend dwells in 'src/routes/api/openai/generateImage/+server.js', this file contains a post request that sends the required data from client to OpenAI server and gets the image url which then displayed in the page.

You cannot enter inappropriate prompts because it violates OpenAI policy, so just save your breath and enter something meaningful.

## how to setup this project

- simply download this repo to your desktop, unzip it
- open your favorite editor and type `npm i` to installl the necessary dependencies
- once it is done type `npm run dev` to start the server
- create an `.env` file in root directory, this is where your OpenAI API Key is
```
OPENAI_API_KEY=xxxxxxx
```
- of course you need to create an account in OpenAI website, you can find video instruction in Brad's tutorial[https://www.youtube.com/watch?v=fU4o_BKaUZE&t=1471s]



## Reference
- Build An AI Image Generator With OpenAI & Node.js [https://www.youtube.com/watch?v=fU4o_BKaUZE&t=1471s]
- Huntabyte [https://www.youtube.com/@Huntabyte]