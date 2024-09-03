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
        for(let user of users) {
            if(email === user.email && password === user.password) {
                return user;
            }
            if(email === user.email && password !== user.password) {
                console.log("Incorrect Password! Try again.")
                alert("Incorrect Password! Try again.")
                return null;
            }
        }
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get("http://localhost:8080/api/v1/user")

            if(response.status === 200) {
                const users = response.data
                const userLogged = isValidLogin(users)

                if(userLogged) {
                    console.log("Succesful Login!")
                    alert("Successful Login!")

                    localStorage.setItem("userLogged", JSON.stringify(userLogged)) //stores the object userLogged converted into string in localStorage

                    navigate("/homepage")
                }
            }
        }
        catch(error) {
            console.log("Unknown error: ", error)
        }
    }

    return (
    <div class="flex items-center justify-center min-h-screen bg-black">
        
        <div class="bg-black dark:bg-card rounded-lg shadow-lg p-16 w-full max-w-lg border border-gray-500 border-opacity-30">
        <div class="flex items-center justify-center mb-4">
        <div class="w-12 h-12 bg-white flex items-center justify-center rounded-full">
            <img
            aria-hidden="true"
            alt="user-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik04LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+"
            class="w-9 h-9"
            />
            </div>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
            <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-white">
                Email
            </label>
            <input
                type="email"
                id="email"
                class="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
                placeholder="Digite seu email"
                onChange={(e) => onEmailChange(e)}
                value={email}
                required
            />
            </div>
            <div class="mb-4">
            <label
                for="password"
                class="block text-sm font-medium text-white"
            >
                Senha
            </label>
            <input
                type="password"
                id="password"
                class="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
                placeholder="Digite sua senha"
                onChange={(e) => onPasswordChange(e)}
                value={password}
                required
            />
            </div>
            <div class="flex items-center mb-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-sm font-medium text-white">
                Manter-me Logado
            </label>
            </div>
            <button
            type="submit"
            class="w-full bg-white text-black p-2 rounded-md hover:bg-gray-200"
            >
            Entrar
            </button>
        </form>
        <label for="remember" class="text-sm font-medium text-white">
            <Link to={'/homepage'}>Entrar.</Link> 
            <Link to={'/register'}>Cadastre-se.</Link>
        </label>
        </div>
    </div>
    );
}