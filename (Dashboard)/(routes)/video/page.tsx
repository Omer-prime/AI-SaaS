"use client"
import axios from "axios"
import * as z from "zod"
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import {  Music, VideoIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { formschema } from './constants';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";
import Video from "@/components/Video";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

const form = useForm<z.infer<typeof formschema>>({
  resolver: zodResolver(formschema),
  defaultValues:{
    prompt:""
  }
});
 const isLoading =  form.formState.isSubmitting;
 const onSubit =async (values:z.infer<typeof formschema>) => {
  try {
   
    const response = await axios.post("/api/video", values);

   setVideo(response.data[0]);
    form.reset();
  } catch (error) {
    if(error?.response?.status === 403){
      proModal.onOpen();
    }
  } finally{
  router.refresh();
  }
  console.log(values);
 }

  return (
    <div>
       <Heading 
       title="Video Generation"
       description="Turn your text into video."
       icon={VideoIcon}
       iconColor="text-orange-600"
       bgColor="bg-red-500/10"
       />
       <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
             <form
              onSubmit={form.handleSubmit(onSubit)}  
              className="rounded-lg border w-full p-4 px-3 md:px-6 
              focus-within:shadow-sm grid grid-cols-12 gap-2"           
             >
              <FormField
              name="prompt"
              render={({field}) =>(
                <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter your prompt to get video ..."
                      {...field}
                      />
                    </FormControl>
                </FormItem>
              )}
              />

                  <Button className="col-span-12 lg:col-span-2 w-full"
                  disabled={isLoading}>
                      Generate
                  </Button>
             </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading &&(
              <div className="p-8 rounded-lg w-full fex items-center justify-center bg-muted">
                  <Loader/>
                  </div>
              )}
               {!video  && !isLoading &&(
              <Video label="No video generated yet!"/>
               )}
                 {video && (
                <video className="w-full aspect-video mt-8 rounded-lg border bg-black " controls  >
                      <source src={video} />
                </video>
               )}
          
          </div>
       </div>
    </div>

  )
}

export default VideoPage;