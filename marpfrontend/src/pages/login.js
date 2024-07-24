import React from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='login'>
        <div className='container'>
            <div className='row'>
                
                <form>
                    <div className='form-group'>
                        <label for="inputEmail">Email</label>
                        <input type='email' className='form-control' placeholder='Digite seu email' id='inputEmail'></input>
                    </div>
                    <div className='form-group'>
                        <label for="inputPassword">Senha</label>
                        <input type='password' className='form-control' placeholder='Digite sua senha' id='inputPassword'></input>
                    </div>
                    <Link type="submit" className="btn btn-primary">Entrar</Link>
                </form>
                <div className='register-btn'>
                    <p>Não possui cadastro? <Link to={"/register"}>Cadastre agora!</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}
