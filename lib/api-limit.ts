import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { string } from "zod";

export const increaseApiLimit =async () => {
    const {userId} = auth;
    if (!userId){
        return;
    }
    const  userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });

        if(userApiLimit){
            await prismadb.userApiLimit.update({
                where:{userId:userId},
                data:{count:userApiLimit.count + 1},
            });
        } else{
            await prismadb.userApiLimit.create({
                data:{userId:userId, count:1}
            });

        }
};

export const checkApiLimit =async () => {
    const {userId} = auth();
    if(!userId){
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    });
    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
        return true;
    } else false;
};

export const getApilimitCount = async ()=>{
    const {userId } = auth();

    if(!userId){
        return 0
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });

    if(!userApiLimit){
        return 0
    }
    return userApiLimit.count;
}
