import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";
import "./index.css"

function Right(){
    const {id}=useParams();
    const chatRef= useRef();
    const [chat, setChat]= useState([]);

    useEffect(()=>{
        const getUser=async()=>{
            const user=await getDoc(doc(db,"content",`${id}`));
            setChat( user.data().chat);
        }
        getUser();
    },[setChat, id])

    const addChat=async(e)=>{
        e.preventDefault();
        setChat((prev)=>[
            ...prev, chatRef.current.value
        ]);
        await updateDoc(doc(db,"content", `${id}`),{chat:[...chat]});
        chatRef.current.value="";
    }
    return(
        <>
        <div className="Right">
            <div className="Chat_container">
        <ul className="Chat_list">
            {chat.map((ch)=>(
                <li className="Chat"><div className="chats"> {ch} </div></li>
            ))}
        </ul>
        </div>
        <form className="Chat_form" onSubmit={addChat}>
            <input className="chat_input" placeholder="Type the message..." ref={chatRef} type="text" />
            <input className="Send" type="submit" value={"send"} />
        </form>
        </div>
        </>
    )
};

export default Right;