import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/register.css'

export default function Register() {
  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Bem-vindo ao Marp</h1>
                <p>O mais novo sistema de gerenciamento de alarmes residenciais, e a solução definitiva para a segurança 
                da sua casa.</p>
                <h3>Possui um cadastro?</h3>
                <Link to={"/"} className='btn btn-primary'>Entrar</Link>
            </div>
            <div className='col-6'>
                <h1>Crie sua conta</h1>
                <p>Preencha seus dados</p>
                <form>
                    <div className='form-group'>
                        <label for="inputName">Nome</label>
                        <input type='text' className='form-control' placeholder='Digite seu nome' id='inputName'></input>
                    </div>
                    <div className='form-group'>
                        <label for="inputEmail">Email</label>
                        <input type='email' className='form-control' placeholder='Digite seu email' id='inputEmail'></input>
                    </div>
                    <div className='form-group'>
                        <label for="inputPassword">Senha</label>
                        <input type='password' className='form-control' placeholder='Digite sua senha' id='inputPassword'></input>
                    </div>
                    <div className='form-group'>
                        <label for="inputConfirmPassword">Confirmar Senha</label>
                        <input type='password' className='form-control' placeholder='Confirme sua senha' id='inputConfirmPassword'></input>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
