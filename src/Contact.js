import { useDispatch, useSelector } from "react-redux";
import { contactAction, contactSelector } from "./Store";
import { useRef } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase";



function Contact(){
    const dispatch= useDispatch();
    const nameRef= useRef();
    const contactRef= useRef();
    const id= 10;
    const AddContact=async(e)=>{
        e.preventDefault();
        const name=nameRef.current.value;
        const contact= contactRef.current.value;
        const user=await getDocs(collection(db, "content"));
        const id=user.size+1;
        dispatch(contactAction.AddContact({name,id, phone: contact, chat:[], photo:""}));
        nameRef.current.value="";
        contactRef.current.value="";
    }

    return(
        
        <>
        <div className="Add">
        <form onSubmit={AddContact}>
            <label>Enter your Name</label>
            <input ref={nameRef} name="name" type="text" />
            <label>Enter your Contact</label>
            <input ref={contactRef} name="contact" type="number" />
            <input type="submit" />
        </form>
        </div>
        </>
    )
};
export default Contact;