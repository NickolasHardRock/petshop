import e from "cors";
import { useState,useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


function Login(){


    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)

        try{
            await login(email,password)
            navigate('/dashboard')
        }catch{
            setError('Email ou senha invalidos')
        }finally{
            setLoading(false)
        }

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


            {error && <p className="error-message">{error}</p>}
            <button type="submitn" disabled={loading}>
                Entrar
            </button>

            </form>    
        </div>
    )




}

export default Login