import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";

import { useNavigate  } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login} from "./../../stores/user/user"
import { useDispatch } from "react-redux";
const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    //const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async() => {
        console.log(email, password)
        setLoading(false);
        try {
            const response = await fetch('http://localhost:8080/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            });
        
            if (!response.ok) {
              // Handle non-successful response
              throw new Error('Login failed');
            }
        
        
            // Assuming the server returns a JSON response with a token upon successful login
            const data = await response.json();
            const id = data.id; // Adjust this based on your server response
            console.log(data.id)
            // Optionally, you can store the token in localStorage or a global state management system
            sessionStorage.setItem('token', data.id);
            sessionStorage.setItem('isLoggedIn', true);

            dispatch(login({id}))
            // Return any additional data you might need
            navigate("/");
            //return data;
          
          } catch (error) {
            // Handle fetch error
            console.error('Error logging in:', error);
            throw error;
          }
    
    }
    return (
        <div className="h-screen bg-black flex  items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                    <h5 className="text-3xl">Login</h5>
                    <div>
                        <label 
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-200">Email</label>
                        <input 
                        // {...register('email')}
                        value={email}
                        onChange={(event) =>setEmail(event.target.value) }
                        id="email"
                        type="email"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="password"
                        className="block text-lg font-medium text-gray-200">Password</label>
                        <input 
                        // {...register('password')}
                       
                        id="password"
                        type="password"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        value={password}
                        onChange={(event) =>setPassword(event.target.value)}
                        />
                    </div>
                    <br></br>
                    <Button size="large" onClick={() => onSubmit()}>{loading ? "loading" : 'Login'}</Button>
                <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Login;