// import axios from 'axios';

// export const uploadFile=async(data)=>{
// try{
// const response=await axios.post('http://localhost:8080/upload',data);
// console.log("api ress",response.data);
// return response.data;
// }
// catch(error){
//     console.log("Error while calling the api",error.message);
// }
// }

// export const uploadFileop=async(data)=>{
//     try{
//     const response=await axios.post('http://localhost:8080/uploadOp',data);
//     return response.data;
//     }
//     catch(error){
//         console.log("Error while calling the api",error.message);
//     }
//     }
 

/////////bha
import axios from 'axios';

export const uploadFile = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/upload', data);
    console.log("api ress", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling the API", error.message);
    throw error; // Re-throwing the error to handle it in the calling function
  }
}

export const uploadFileop = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/uploadOp', data);
    return response.data;
  } catch (error) {
    console.log("Error while calling the API", error.message);
    throw error; // Re-throwing the error to handle it in the calling function
  }
}