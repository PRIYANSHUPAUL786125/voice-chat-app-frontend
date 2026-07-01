import  {  createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { url } from "../constants/url";
const SocketContext=createContext(null);
export const SocketProvider=({children})=>{
    const socket=useMemo(()=>io(url),[]);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export const useSocket=()=>{
    const val=useContext(SocketContext)
    if(!val){
        throw new Error("use context not working for socket")
    }
    return val;
}