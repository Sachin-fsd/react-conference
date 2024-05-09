import { useState } from "react"
import {useNavigate} from "react-router-dom"
// import Header from "./Header"


function Register(){

    let navigate = useNavigate()

    function submit(){

       let obj = {name,email,password}
       console.log(obj)

       fetch("https://localhost:8080/register",{
        headers:{
            "Content-type":"application.json",
            "Accept":"application/json"
        },
        body:JSON.stringify(obj),
        method:"POST"
       }).then(res=>res.json()).then(data=>{
        if(data.ok){
            navigate("/")
        }else{
            alert("Registration failed")
        }
       })
    }

    let [name,setName] = useState()
    let [email,setEmail] = useState()
    let [password,setPassword] = useState()

    return(
        <div>
        {/* <Header/> */}
            <h1>Register Page</h1>
            <input placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
            <input placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Enter Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={submit}>Register</button>
        </div>
    )
}

export default Register