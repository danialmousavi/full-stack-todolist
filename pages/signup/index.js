import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Index() {
      
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const route=useRouter()
    const registerUser=async(e)=>{
      e.preventDefault();
      const user={firstname,lastname,username,email,password};
      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      })
      if(res.status==201){
        Swal.fire({
          title:"Greate",
          text:"you registerd succssfully",
          icon:"success"
        }).then(()=>{
          setFirstname("")
          setLastname("")
          setEmail("")
          setUsername("")
          setPassword("")
          route.replace("/dashboard")
        })
      }else if(res.status==422){
         Swal.fire({
          title:"OOPS",
          text:"username or password already exist!",
          icon:"warning"
        })
      }else{
        Swal.fire({
          title:"OOPS",
          text:"There is a propblem please try later",
          icon:"error"
        })
      }
    }
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off" required  onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" required onChange={(e)=>setLastname(e.target.value)} value={lastname} />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" required onChange={(e)=>setUsername(e.target.value)} value={username} />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email" autoComplete="off" required onChange={(e)=>setEmail(e.target.value)} value={email} />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off" required onChange={(e)=>setPassword(e.target.value)} value={password} />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" onClick={registerUser} />
      </form>
    </div>
  );
}

export default Index;
