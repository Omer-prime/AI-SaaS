
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"

 const  replicate = new Replicate ({
auth : process.env.Replitcate_Api!,
});



 export async function POST(req:Request) {
  try {
    const { userId } = auth();
    const body =  await req.json();
    const{prompt} =  body;

    if(!userId){
       return new NextResponse("Unauthorized", { status:401});
      }
   
      if(!prompt){
        return new NextResponse("Prompt is required", {status:400});
      }
      const freeTrial = await checkApiLimit();
      if(!freeTrial){
        return new NextResponse("free trail has expired.",{status:403})
      }
      const response = await replicate.run(
        "allenhung1025/looptest:0de4a5f14b9120ce02c590eb9cf6c94841569fafbc4be7ab37436ce738bcf49f",
        {
          input: {
            seed: -1
          },
       
        }
      );
      await increaseApiLimit();
      return NextResponse.json(response)
  } 
   catch (error) {
    console.log("Music_ERROR", error)
    return new NextResponse("Internal error")
  }
  
 }
 