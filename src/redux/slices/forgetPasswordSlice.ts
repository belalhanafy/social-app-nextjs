import { resetPassData } from "@/interfaces/forgetPassInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let headers = {
    token : localStorage.getItem('token')
}
export let resetPass = createAsyncThunk('resetPassSlice/resetPass',async (values:resetPassData)=>{
    try {
            let {data} = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,values,{headers});
            console.log(data);
            return data
        } catch (error:any) {
            throw error.response.data.error;
        }
    })
let initialState : {isLoading:boolean,error:string,isSuccess:boolean} = {isLoading:false,error:'',isSuccess:false}
let resetPassSlice = createSlice({
    name: "resetPassSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(resetPass.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(resetPass.rejected,(state:any,action)=>{
            console.log(state);
            state.error=action.error.message,
            state.isLoading=false,
            state.isSuccess=false
        })
        builder.addCase(resetPass.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true
        })
    }
})

export let resetPassReducer = resetPassSlice.reducer;