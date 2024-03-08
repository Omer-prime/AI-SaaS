"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from './ui/badge'
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from 'lucide-react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'



const tools= [
    {
      label:"Conversation",
      icon: MessageSquare ,
      color:"text-violet-500",
      bgColor:"bg-violoet-500/10",

    },
    {
      label:"Image Generation",
      icon: ImageIcon,
      color: "text-red-500",
      bgColor:"bg-red-500/10",
    
    },
    {
      label:"Video Generation",
      icon: VideoIcon,
      color: "text-orange-600",
      bgColor:"bg-red-500/10",
    },
    {
      label:"Music Generation",
      icon: Music,
      color: "text-emerald-600",
      bgColor:"bg-emerald-500/10",
    },
    {
      label:"Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor:"bg-green-700/10",
   
    },
  ]
  



const ProModal = () => {
    const proModal = useProModal();
  return (
        <Dialog open={proModal.isOpen}  onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                       <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Gen X
                        <Badge  variant="premium"  className="uppercase text-sm py-1 cursor-pointer ">
                            pro
                        </Badge>
                        </div> 
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-0 text-zinc-900 font-medium">
                        {tools.map((tool)=>(
                            <Card 
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                    <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    size="lg"
                    variant="premium"
                    className="w-full"
                    
                    >
                        Upgrade
                        <Zap className=" w-4 h-4 ml-2 fill-white "/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


  )
}

export default ProModal;