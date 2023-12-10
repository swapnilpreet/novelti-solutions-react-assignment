import axios from 'axios'
import { axiosInstance } from './axiosInstance';

export const GetCountry = async ()=>{
    try{
       const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
       return response.data.data;
    }catch(error){
      return error.message;
    }
}


export const GetState = async (payload)=>{
  try{
     const response = await axiosInstance.get(`https://www.universal-tutorial.com/api/states/${payload}`);
     return response;
  }catch(error){
    return error.message;
  }
}