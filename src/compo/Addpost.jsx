import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { addPost } from "../apis/post";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const initialErrorsState = {
  title: "",
  desc: "",
  date: "",
  api: "",
};

function AddPost() {
  const nav =useNavigate();
  const [cookies, setCookie] = useCookies(['jwt']);
  const [errors, setErrors] = useState(initialErrorsState);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState({
    startDate: null
  });


useEffect(()=>{
if(!cookies.jwt){
  nav('/')
}
},[])




  const handleSubmit =  (e) => {
    e.preventDefault();

    let newErrors = {};

    if (title.length === 0) {
      newErrors = { ...newErrors, title: "title shouldn't be empty" };
    }
    if (desc.length === 0) {
      newErrors = { ...newErrors, desc: "description shouldn't be empty" };
    }
    if (!value.startDate) {
      newErrors = { ...newErrors, date: "date shouldn't be empty" };
    }

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      setErrors(newErrors); // Fix: Set errors before returning
      return;
    }

    // Clear errors if no issues
    setErrors(initialErrorsState);


    addPostApi()
    
  };

  const addPostApi = async () =>{
     const [response, error] = await addPost(cookies.jwt,{
          post: {
            title: title,
            desc: desc,
            date_post: value.startDate
          },
        });
        handleResponse([response, error]);
  }

const handleResponse =async ([response,error])=>{
       if(error){
          setErorrs({
            ...errors,
            api:error
          }
        
          )
        }
        else{
          console.log("response",response)
          nav('/')
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Post</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        {errors.title && <p className="mt-3 ml-1 text-sm text-red-500">{errors.title}</p>}

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="5"
          placeholder="Enter your text here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        {errors.desc && <p className="mt-3 ml-1 text-sm text-red-500">{errors.desc}</p>}

        <Datepicker
  value={value}
  onChange={setValue}
  asSingle={true}
  numberOfMonths={1} // Ensures only one month is shown
  inputClassName="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
/>


        {errors.date && <p className="mt-3 ml-1 text-sm text-red-500">{errors.date}</p>}

        <br />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
