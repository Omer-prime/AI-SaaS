import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { ClientOptions } from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
 
 const  clientOptions: ClientOptions = ({
 apiKey: process.env.API_key,
});

const openai = new OpenAI(clientOptions);

 export async function POST(req:Request) {
  try {
    const { userId } = auth();
    const body =  await req.json();
    const{prompt, amount = 1, resolution = "512x512"} = body;  

    if(!userId){
       return new NextResponse("Unauthorized", { status:401});
      }
    if(!clientOptions.apiKey){
      return new NextResponse("OpenAI API key not configured", {
        status:500              
      });
    }
      if(!prompt){
        return new NextResponse("Prompt required", {status:400});
      }
      if(!amount){
        return new NextResponse("Amount is required", {status:400});
      }
      if(!resolution){
        return new NextResponse("resolution is required", {status:400});
      }
      const freeTrial = await checkApiLimit();
      if(!freeTrial){
        return new NextResponse("free trail has expired.",{status:403})
      }
      const image = await openai.images.generate({
      
        prompt,
        n: parseInt(amount,10),
        size: resolution,
      });
      await increaseApiLimit();
      return NextResponse.json(image.data);
  } 
   catch (error) {
    console.log("Image_ERROR", error)
    return new NextResponse("Internal error")
  }
  
 }
 