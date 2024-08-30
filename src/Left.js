import { useDispatch, useSelector } from "react-redux";
import { contactSelector } from "./Store";
import { getInitialState } from "./Store";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "./firebase";
import { useRef } from "react";
import "./index.css";

function Left(){

    const dispatch= useDispatch();
    const searchRef= useRef();
    const [user, setUser]=useState([]);
    const [searchC, setSearch]= useState([]);
    const [data, setData]=useState(true);

    const get=async()=>{
        
       const snapShot =await getDocs(collection(db, "content"));
       if(snapShot.size==0){
        dispatch(getInitialState());
        setData(false);
       }
    };

    useEffect(() => {
        async function fetchData(){
            let snapShot="";
            if(searchRef.current.value===""){
                 snapShot =await getDocs(collection(db, "content"));
            }else{
                snapShot=await getDocs(query(collection(db, "content"), where ("name", "==", `${searchC}`)));
            }
            if(!snapShot.size==0){
                setData(false);
               }else{}
        const blogs = snapShot.docs.map((doc) => {
        return{
            id: doc.id,
        ...doc.data()
        }
        }

    )
        setUser(blogs);
        }
        fetchData();


        },[searchC, data]);

        const search=()=>{
            setSearch(searchRef.current.value);
        }

    return(
        <>
        {data?<button onClick={get}>Get Data</button>:""}
        <div className="Left">
        <NavLink className="Add_button" to={"/contact"}>+</NavLink>
        <input className="input_contact" ref={searchRef} type="text"  placeholder="Search..." />
        <button className="Search" onClick={search}>Search</button>
        <ul className="Contact_list">
        {user.map((us)=>(
           <li className="list_item" key={us.id}><NavLink style={{textDecoration:"none"}} to={`/Right/${us.id}`}><img className="profile_pic" src="https://picsum.photos/200/300" alt="DP"/>
            <p className="name"> {us.name} </p></NavLink></li>
        ))}
        </ul>
        </div>
        <Outlet />
        </>
    )
};

export default Left;