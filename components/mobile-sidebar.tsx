"use client"
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'


interface MobilesidebarProps{
    apiLimitCount:number;
}

const Mobilesidebar = ({
    apiLimitCount
}: MobilesidebarProps) => {
    const [ isMounted, setisMounted ] = useState(false);
useEffect(()=>{
    setisMounted(true);
}, []
);
if(!isMounted){
    return null;
}

  return (

    <Sheet>
        <SheetTrigger>
    <Button   variant="ghost" size="icon"  className="md:hidden">
    <Menu/>
</Button>
</SheetTrigger>
<SheetContent side="left" className="p-0">

    <Sidebar apiLimitCount={apiLimitCount}/>
</SheetContent>
</Sheet>
  )
}

export default Mobilesidebar;