import { BASE_API, DOMAIN } from "./config";

export const addPost = async (jwtToken, bodyObject) =>{
    console.log("registerApi")
    const requestOption ={
         method: 'POST', // HTTP method
         headers: {
         'Content-Type': 'application/json' 
         ,'Authorization': jwtToken
         // Specify JSON format
               },
         body: JSON.stringify(bodyObject)
    };


// Sending a POST request
try{
    const response = await fetch(`${BASE_API}/posts`,requestOption);
      if(response.ok){
        return [response,'']
      }
      if(response.status===422){
          return['',`User already exists`]   
      }
      const errorMessage = await response.text();
  return['',`server side error`]    
} catch(error){
    return['',`Server down: ${error}`]
}

}