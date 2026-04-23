import e from "cors";
import { useState } from "react";

function Login(){

    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        console.log({email,password})
    }

    return(
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h1>
                    Login
                </h1>
                <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
                </input>

                <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}>
                </input>

            <button type="submitn">
                Entrar
            </button>

            </form>    
        </div>
    )




}

export default Login