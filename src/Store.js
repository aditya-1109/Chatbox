import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";

const initialState= {user:[]};

const contactSlice= createSlice({
    name:"contact",
    initialState:initialState,
    reducers:{
        setInitial:(state, action)=>{
            if(state.user.length===0){
            state.user=action.payload;
            state.user.map((us)=>{
                us.chat=[];
                us.photo="";
                setDoc(doc(db, "content", `${us.id}`),us);
            })
            }
        },
        AddContact:(state, action)=>{
            state.user.push(action.payload);
            setDoc(doc(db, "content", `${action.payload.id}`),action.payload);
        }
    }
});

const contactReducer= contactSlice.reducer;
export const contactAction= contactSlice.actions;
export const contactSelector= (state)=>state.contactReducer;

export const store=configureStore({
    reducer:{contactReducer}
});

export const getInitialState=createAsyncThunk("contact/getInitialState",async(arg,thunkAPI)=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((Res)=>Res.json())
    .then((json)=>thunkAPI.dispatch(contactAction.setInitial(json)))});
