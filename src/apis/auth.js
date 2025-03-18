import { DOMAIN } from "./config";

export const registerApi = async (bodyObject) =>{
    console.log("registerApi")
    const requestOption ={
         method: 'POST', // HTTP method
         headers: {
         'Content-Type': 'application/json' // Specify JSON format
               },
         body: JSON.stringify(bodyObject)
    };


// Sending a POST request
try{
    const response = await fetch(`${DOMAIN}/users`,requestOption);
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

export const loginApi = async (bodyObject) =>{
    const requestOption ={
         method: 'POST', // HTTP method
         headers: {
         'Content-Type': 'application/json' // Specify JSON format
               },
         body: JSON.stringify(bodyObject)
    };


// Sending a POST request
try{
    const response = await fetch(`${DOMAIN}/users/sign_in`,requestOption);
      if(response.ok){
        return [response,'']
      }

      if(response.status===401){
      return['',`invalid email or password`]   
      }
      const errorMessage = await response.text();
 
} catch(error){
    return['',`Server down: ${error}`]
}

}

export const logoutApi = async (jwtToken) => {
  const requestOption = {
    method: 'DELETE', // HTTP method
    headers: {
      'Content-Type': 'application/json', // Specify JSON format
      'Authorization': jwtToken
    },
  };

  // Sending a DELETE request
  try {
    const response = await fetch(`${DOMAIN}/users/sign_out`, requestOption);

    if (response.ok) {
      return [response, ''];
    }

    if (response.status === 401) {
      return ['', `Invalid email or password`];
    }

    const errorMessage = await response.text();
    return ['', errorMessage]; // Added this return statement
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};