import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Index() {
  const [identifier,setIdentifier]=useState("");
  const [password,setPassword]=useState("");
  const route=useRouter()
  const handleLogin=async (e)=>{
      e.preventDefault();
    const userData={
      identifier,
      password
    }
    const res=await fetch("/api/auth/signin",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(userData)
    })
    if(res.status==200){
      Swal.fire({
        title:"Greate",
        text:"you have login successfully",
        icon:"success"
      }).then(()=>{
        setIdentifier("");
        setPassword("");
        route.replace("/dashboard")
      })
    }else if(res.status==402){
      Swal.fire({
        title:"oops",
        text:"wrong information",
        icon:"warning"
      })
    }else{
            Swal.fire({
        title:"oops",
        text:"somethnig went wrong please try later",
        icon:"error"
      })
    }
  }
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.status === 200) {
          route.replace("/"); // کاربر لاگین → بره صفحه اصلی
        } else {
          route.push("/signin"); // کاربر لاگین نیست → بره signin
        }
      } catch (error) {
        route.push("/signin"); // خطای سرور هم باشه → signin
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off" required value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" onClick={handleLogin}/>
      </form>
    </div>
  );
}

export default Index;
