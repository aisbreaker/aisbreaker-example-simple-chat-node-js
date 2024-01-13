#!/usr/bin/env node

//
// Simple example for AIsBreaker with JavaScript and NodeJS: simple chat.
//
// Run it with:
//   npm install && npm run start
//

import { api } from "aisbreaker-api-js";

console.log("aisbreaker-example-simple-chat");
console.log("------------------------------");


// service configuration: select the service/serviceId you want to use
const serviceProps = {
    serviceId: "chat:dummy",

    //serviceId: "chat:openai.com",

    //serviceId: "chat:gemini.vertexai.google.com",
    //project:   "<YOUR-GOOGLE-CLOUD-PROJECT>",         # optional for gemini.vertexai.google.com
    //location:  "<YOUR-GOOGLE-CLOUD-LOCATION>",        # optional for gemini.vertexai.google.com, e.g. "us-central1"

    //serviceId: "chat:huggingface.co/<HF-ACCOUNT>/<HF-MODEL>",
    // e.g.:
    // serviceId: "chat:huggingface.co/microsoft/DialoGPT-large",

    //serviceId: "aisbreaker:mirror",
    //forward2ServiceProps: {
    //  "serviceId": "chat:echo"
    //},
};

// service initialization
const aisbreakerServerURL = "https://api.demo.aisbreaker.org/";
const auth = {
    // optionally, set your OpenAI API key:
    //secret: "sk-...",

    // optionally, set your Google Cloud (Vertext AI) API key:
    //secret: "googlecloud-account-json-base64_..",

    // optionally, set your Huggingface API key:
    //secret: "hf_...",

    // optionally, set your AIsBreaker API key:
    //secret: "aisbreaker_...",
}
const aisService = api.AIsBreaker.getInstance().
    getAIsService(aisbreakerServerURL, serviceProps, auth);


// 1st question/prompt
const question1 = "What is NodeJS?";
console.log(`***** Question1 *****\n${question1}\n`);

// 1st answer
const response1 = await aisService.process({
    inputs: [ {
        text: {
            role: "user",
            content: question1,
        },
    } ],
});
console.log(`***** Answer1 *****\n${response1.outputs[0].text.content}\n`);


// 2nd question/prompt
const question2 = "shorter please";
console.log(`***** Question2 *****\n${question2}\n`);

// 2nd answer
const response2 = await aisService.process({
    inputs: [ {
        text: {
            role: "user",
            content: question2,
        },
    } ],
    conversationState: response1.conversationState,
});
console.log(`***** Answer2 *****\n${response2.outputs[0].text.content}\n`);
