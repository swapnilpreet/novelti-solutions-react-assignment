import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetAllUsers = createAsyncThunk('GetAllUsers',async()=>{
    try{  
        const response = await axios.get('/api/user/getallusers');
        return response.data;
     }catch(error){
       return error.message;
     }    
})
const Usersslice = createSlice({
    name:"users",
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(GetAllUsers.pending,(state,action)=>{
            state.isLoading=true;
         });
       builder.addCase(GetAllUsers.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.data=action.payload;
       });
       builder.addCase(GetAllUsers.rejected,(state,action)=>{
        state.isError=true;
     });
    }
})

export default Usersslice.reducer