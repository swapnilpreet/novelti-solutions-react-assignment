import axios from 'axios';


export const RegisterUser = async ({payload})=>{
    try{  
       const response = await axios.post('/api/user/register',payload);
       return response.data;
    }catch(error){
      return error.message;
    }    
}


export const GetUsersByID = async (userId)=>{
  try{  
     const response = await axios.get(`/api/user/getuserById/${userId}`);
     return response.data;
  }catch(error){
    return error.message;
  }    
}

export const EditUser = async (payload)=>{
  try{  
     const response = await axios.put("/api/user/edit/user",payload);
     return response.data;
  }catch(error){
    return error.message;
  }    
}

export const DeleteUser = async (id)=>{
  try{  
     const response = await axios.delete(`/api/user/delete/user/${id}`);
     return response;
  }catch(error){
    return error.message;
  }    
}