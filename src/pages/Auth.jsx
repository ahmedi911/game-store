import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { validateEmail,validatePassword } from '../utlities/valdiation';
import { registerApi,loginApi } from '../apis/auth';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


export const PageType = Object.freeze({
    LOGIN: 0,
    REGISTER: 1
});
const initialErrorsState ={
  email:  "",
  password: "",
  api: ""
}

function Auth({ pageType }) {

  
  
    const nav =useNavigate();
    const [email,SetEmail]=useState("")
    const [password ,setPassword]=useState("")
    const [errors ,setErorrs]=useState(initialErrorsState)
    const [cookies, setCookie] = useCookies(['jwt']);
 
    
    useEffect(()=>{
         if(cookies.jwt){
      nav('/')}
    },[])
    const handleEmailChange = (e) => {
        SetEmail(e.target.value)
    }
     const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
  e.preventDefault();

  let newErrors = {}; // Fixed typo

  if (!validateEmail(email)) {
    newErrors = {
      ...newErrors,
      email: "Invalid email",
    };
  }
  if (!validatePassword(password)) {
    newErrors = {
      ...newErrors,
      password: "Password should be at least 8 characters",
    };
  }

 // Fixed typo

  const hasErrors = Object.values(newErrors).some((error) => error !== "");

  if (hasErrors) {
    return;
  }

  if (pageType === PageType.LOGIN) {
    const [response, error] = await loginApi({
      user: {
        email: email,
        password: password,
      },
    });
    handleResponse([response, error]); // Fixed variable name
  } else {
    const [response, error] = await registerApi({
      user: {
        email: email,
        password: password,
      },
    });
    handleResponse([response, error]);
  }
};


    const handleResponse =async ([response,error])=>{
       if(error){
          setErorrs({
            ...errors,
            api:error
          }
        
          )
        }
        else{
          const jwt = response.headers.get('Authorization')
          // const result = await response.json();
          // const message = result.message
          // const user = result.message
          setCookie('jwt',jwt);
          console.log(cookies.jwt);
          nav('/')


        }
      
    }



    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {pageType === PageType.LOGIN ? 'Login' : 'Register'}
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              
            />
           {errors.email && <p className='mt-3 ml-1 text-sm text-red-500'>{errors.email}</p> } 
          </div>


           <div>
             <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              
            />
           {errors.password && <p className='mt-3 ml-1 text-sm text-red-500'>{errors.password}</p> } 
          </div>

         

          <button type="submit" className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
            {pageType === PageType.LOGIN ? 'Login' : 'Register'}
          </button>
          {errors.api && <p className='mt-3 ml-1 text-sm text-red-500'>{errors.api}</p> } 
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {pageType === PageType.LOGIN ? "Don't have an account?" : "Already have an account?"} 
          <a href={pageType === PageType.LOGIN ? "/register" : "/login"} className="ml-1 font-medium text-blue-500 hover:underline">
            {pageType === PageType.LOGIN ? 'Register' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}

Auth.propTypes = {
  pageType: PropTypes.number.isRequired
};

export default Auth;
