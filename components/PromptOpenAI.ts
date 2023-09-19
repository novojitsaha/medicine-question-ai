import { ExcelContent } from "@/schemas/ExcelContent";
import OpenAI from "openai";
import { AiResponse } from "@/schemas/AiResponse";

export default async function promptOpenAI(contents: ExcelContent[]) {
  // prompt to openAI
  if (contents.length > 0) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY as string,
    });
    // let jsonRes = null;
    let responses: AiResponse[] = [];

    const systemMessage = `You are a doctor who writes medical exam questions. 
        The user will provide one question with 6 options. You have to produce another question with similar characteristics.
        The question should have 6 options out of which one should be the correct one. 
        Give me the output in a JSON format. The JSON object should have a question property of type string, 
        options property of type string array, and lastly a correctOption of type number which points to the current answer's index.
        Make sure that the response works on JSON.parse() function in javascript. 
        `;

    await Promise.all(contents.map(async function (content) {
      const allOptions = content.options
        .map((op, ind) => "option " + (ind + 1) + " is " + op + ".\n")
        .join(" ");
      const userMessage = `question: ${content.question} Available Options: ${allOptions}`;

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          { role: "user", content: userMessage },
        ],
        model: "gpt-3.5-turbo",
      });
      const response = chatCompletion.choices[0].message.content;
      if (response) {
          console.log(response);
          const aiResponse: AiResponse = JSON.parse(response);
          console.log("type of aiResponse: ", typeof aiResponse);
        responses.push(aiResponse);
      }
    }));
    //const firstContent = content[0];

    // console.log(userMessage)

    //console.log(response);
    //jsonRes = JSON.parse(aiResponse)

    console.log("HEY HEY DSONE WITH OPEN AI MANNNN!!!!!!!!!!!")
    return responses;
  }
}
