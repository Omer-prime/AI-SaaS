
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
        "cjwbw/kandinskyvideo:849b70f3e300a650aa8b78d0f8f24d104824b832ea7f61c79bd2c7e78a4ad545",
        {
          input: {
            fps: 10,
            width: 640,
            height: 384,
            prompt,
            guidance_scale: 5,
            interpolation_level: "low",
            num_inference_steps: 50,
            interpolation_guidance_scale: 0.25
          }
        }
      );
      await increaseApiLimit();
      return NextResponse.json(response)
  } 
   catch (error) {
    console.log("VIDEO_ERROR", error)
    return new NextResponse("Internal error")
  }
  
 }
 