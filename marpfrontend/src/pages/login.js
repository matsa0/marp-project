import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function Login() {

    let navigate = useNavigate()

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const isValidLogin = (users) => {
        let valid = false

        for(let user of users) {
            if(email === user.email && password === user.password) {
                valid = true
                break;
            }
            if(email === user.email && password !== user.password) {
                console.log("Incorrect Password! Try again.")
                alert("Incorrect Password! Try again.")
                break;
            }

        }
        return valid
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get("http://localhost:8080/api/v1/user")

            if(response.status === 200) {
                const users = response.data
                const isValid = isValidLogin(users)

                if(isValid === true) {
                    console.log("Succesful Login!")
                    alert("Successful Login!")
                    navigate("/homepage")
                }
                else {
                    alert("User doesnt exist! Create a account.")
                    console.log(isValid)
                }
            }
        }
        catch(error) {
            console.log("Unknown error: ", error)
        }
    }

    return (
    <div class="flex items-center justify-center min-h-screen bg-background">
        <div class="bg-white dark:bg-card rounded-lg shadow-lg p-6 w-96">
        <div class="flex items-center justify-center mb-4">
            <img
            aria-hidden="true"
            alt="user-icon"
            src="https://openui.fly.dev/openui/24x24.svg?text=👤"
            class="w-12 h-12 rounded-full bg-red-500"
            />
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
            <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-zinc-700">
                Email
            </label>
            <input
                type="email"
                id="email"
                class="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
                placeholder="Digite seu email"
                onChange={(e) => onEmailChange(e)}
                value={email}
                required
            />
            </div>
            <div class="mb-4">
            <label
                for="password"
                class="block text-sm font-medium text-zinc-700"
            >
                Senha
            </label>
            <input
                type="password"
                id="password"
                class="mt-1 block w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-red-300"
                placeholder="Digite sua senha"
                onChange={(e) => onPasswordChange(e)}
                value={password}
                required
            />
            </div>
            <div class="flex items-center mb-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-sm text-zinc-700">
                Manter-me Logado
            </label>
            </div>
            <button
            type="submit"
            class="w-full bg-red-500 text-white p-2 rounded-md shadow-inner hover:bg-red-600"
            >
            Entrar
            </button>
        </form>
        <label for="remember" class="text-sm text-zinc-700">
            Não possui cadastro? <Link to={'/register'}>Cadastre-se.</Link>
        </label>
        </div>
    </div>
    );
}
