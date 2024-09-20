import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { app } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from "autoprefixer";

const Register = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")  //ME
    const [password, setPassword] = useState("")
    const [otpField, setOTPField] = useState(false)
    const [name, setName] = useState("")
    const [otpRecieved, setOtpRecieved] = useState(false)
    const [otp, setOtp]= useState("")

    const generateOtp = async () => {
        const response = await fetch(`http://localhost:8080/api/generate-otp?email=${email}`,{
        method: 'GET',
        // body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data)

    if(!response.ok){
    alert('Registration failed');
    } else{
        setOtpRecieved(true)
    }
}
    

    const onSubmit = async () => {
        console.log(name, email, password, otp)
        setLoading(false);
        try{
            const response = await fetch('http://localhost:8080/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, name: name, password: password, otp: otp })

            });
            
           
            
          //  .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    toast.success('Account created successfully!🎉', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                        });
                    navigate('/');
                } else {
                    console.log(response.json());
                }
            } catch(error) {
                console.log('error registering', error);
                throw error;

              }
    }       
    return (
        <div className="h-screen bg-black flex  items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                    <h5 className="text-3xl">Register</h5>
                    <div>
                        <label 
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-200">Name</label>
                        <input 
                        value={name}
                        onChange={(event) =>setName(event.target.value)}
                        disabled={otpRecieved}
                        id="name"
                        type="text" //disabled= {otpRecieved}
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-200">Email</label>
                        <input 
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                        disabled={otpRecieved}
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
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                        type="password"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        />
                    </div>
                    {otpRecieved && <div>
                    <label 
                        htmlFor="otp"
                        className="block text-lg font-medium text-gray-200">OTP</label>
                        <input 
                        value={otp}
                        onChange={(event)=>setOtp(event.target.value)}

                        id="otp"
                        type="number"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        />
                        
                    </div>}<br></br>{otpRecieved ? <Button size = "large" onClick={() => onSubmit()}>{ "Register"}</Button> 
                    :<Button size = "large" onClick={() => generateOtp()}>{ "Generate OTP"}</Button>}
                    
                    
                    
                    {/* {otpField ? 
                    <Button size="large">{loading ? "loading" : 'Register'}</Button>
                    } */}
               
                <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Register;