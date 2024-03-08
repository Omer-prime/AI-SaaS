"use client"
import axios from "axios"
import * as z from "zod"
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Code,  } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { formschema } from './constants';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import Useravatar from "@/components/user-avatar";
import Botavatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import Codepage from "@/components/Code";
import { useProModal } from "@/hooks/use-pro-modal";

const conversation = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<CreateChatCompletionRequestMessage[]>([]);

const form = useForm<z.infer<typeof formschema>>({
  resolver: zodResolver(formschema),
  defaultValues:{
    prompt:""
  }
});
 const isLoading =  form.formState.isSubmitting;
 const onSubit =async (values:z.infer<typeof formschema>) => {
  try {
    const userMessage: CreateChatCompletionRequestMessage={
      role:"user",
      content: values.prompt,
    }
    const newMessages = [...messages,
    userMessage];
    const response = await axios.post("/api/code", {
      messages: newMessages,
    });

    setMessages((current) =>[...current, userMessage, response.data]);
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
       title="Code Generation"
       description="Our most advanced code generation  model.."
       icon={Code}
       iconColor="text-green-700"
       bgColor="bg-green-700/10"
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
            {messages.length === 0 && !isLoading &&(
              <Codepage  label="No code generated yet!"/>
            )}
           <div className="flex flex-col-reverse gap-y-4">
                  {messages.map((message)=>(
                    <div key={message.content}
                    className={cn("p-8 w-full flex items-start  gap-x-8 rounded-lg" , 
                        message.role === "user " ? "bg-white border border-black/10" : "bg-muted")}
                    >
                      {message.role === "user" ? <Useravatar/> : <Botavatar/>}
                      <ReactMarkdown 
                      components={{
                      pre:( { node, ...props}) =>(
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                <pre {...props}/>
                        </div>
                      ),
                    code:({node , ...props})=>
                  (
                      <code  className="bg-black/10 rounded-lg p-1"{...props} />
                    )
                      }}
                      className="text-sm  overflow-hidden  leading-7"
                      >
                        {message.content || ""}
                      </ReactMarkdown>
                    </div>
                  ))}
           </div>
          </div>
       </div>
    </div>

  )
}

export default conversation;