import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import   OpenAIApi from "openai"
import Configuration from "openai"
import { ClientOptions } from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/completions.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
 
 const  clientOptions: ClientOptions = ({
 apiKey: process.env.API_key,
});

const openai = new OpenAI(clientOptions);

const instructionMessage: ChatCompletionMessage={
    role:"system",
    content:"You are code generator. You must answer only markdown code snippets. Use code comments for explanations."
}

 export async function POST(req:Request) {
  try {
    const { userId } = auth();
    const body =  await req.json();
    const{messages} =  body;

    if(!userId){
       return new NextResponse("Unauthorized", { status:401});
      }
    if(!clientOptions.apiKey){
      return new NextResponse("OpenAI API key not configured", {
        status:500
      });
    }
      if(!messages){
        return new NextResponse("Messages are required", {status:400});
      }
      const freeTrial = await checkApiLimit();
      if(!freeTrial){
        return new NextResponse("free trail has expired.",{status:403})
      }
      const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[instructionMessage, ...messages]
      })
      await increaseApiLimit ();
      return NextResponse.json(response.choices[0].message)
  } 
   catch (error) {
    console.log("CODE_ERROR", error)
    return new NextResponse("Internal error")
  }
  
 }
 