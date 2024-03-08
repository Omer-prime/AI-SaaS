"use client"
import axios from "axios"
import * as z from "zod"
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import {  Download, ImageIcon,  } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { amountOptions, formschema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";


const Imagepage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  
const form = useForm<z.infer<typeof formschema>>({
  resolver: zodResolver(formschema),
  defaultValues:{
    prompt:"",
    amount:"1",
    resolution:"512x512"
  }
});
 const isLoading =  form.formState.isSubmitting;
 const onSubit =async (values:z.infer<typeof formschema>) => {
  try {
    setImages([]);
    const image= await axios.post("/api/image",values );
    const urls = image.data.map((image: {url:string })=> image.url)
  
    setImages(urls);    

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
       title="Image Generation"
       description="Our most advanced image generation  model.."
       icon={ImageIcon}
       iconColor="text-red-500"
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
                      placeholder="Generate your code Here..."
                      {...field}
                      />
                    </FormControl>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="amount"
              render={({field}) =>(
                <FormItem className="col-span-12 lg:col-span-10">
                    <Select 
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}   
                    >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value}   />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {amountOptions.map((option)=>(
                              <SelectItem 
                              key={option.value}
                              value={option.value}
                              >
                                    {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                    </Select>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="resolution"
              render={({field}) =>(
                <FormItem className="col-span-12 lg:col-span-10">
                    <Select 
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}   
                    >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value}   />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resolutionOptions.map((option)=>(
                              <SelectItem 
                              key={option.value}
                              value={option.value}
                              >
                                    {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                    </Select>
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
              <div className="p-20">
                  <Loader/>
              </div>
            )} 
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  
                 gap-4 mt-8">
             {images.map((src)=>(
              <Card
              key={src}
              className="rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                    <Image
                    alt="Image"
                    fill
                    src={src}/>
                </div>
                 <CardFooter>
                 <Button
                 onClick={()=> window.open(src)}
                 variant="secondary"
                 className="w-full"
                 >
                    <Download className="h-4 w-4 mr-2"/>
                    Download
                 </Button>
                 </CardFooter>
              </Card>
             ))}
            </div>
          </div>
       </div>
    </div>

  )
}

export default Imagepage;