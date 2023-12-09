#!/usr/bin/env node

//
// Simple example for AIsBreaker with JavaScript and NodeJS: simple chat.
//
// Run it with:
//   node aisbreaker-simple-chat.js
//

import { api } from "aisbreaker-api-js";


console.log("aisbreaker-example-simple-chat");
console.log("------------------------------");

// service initialization
const aisbreakerServerURL = "https://api.demo.aisbreaker.org/";
const servicePros = {
    //serviceId: "chat:dummy",
    serviceId: "chat:openai.com",
}
const auth = {
    secret: process.env.OPENAI_API_KEY || "",
}
//init();
const aisService = api.AIsBreaker.getInstance().
    getAIsService(aisbreakerServerURL, servicePros, auth);



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
const question2 = "Please translate to German";
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
})
console.log(`***** Answer2 *****\n${response2.outputs[0].text.content}\n`);
