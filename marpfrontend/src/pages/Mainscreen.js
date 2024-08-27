import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Calendar, LogOut, LayoutGrid, Trash } from 'lucide-react';
import { useState } from "react";
import '../App.css';
import axios from 'axios';

export default function Mainscreen() {

    const[user, setUser] = useState(null);

    useEffect(() => {
        const userLogged = localStorage.getItem("userLogged")

        if(userLogged) {
            const userLoggedObj = JSON.parse(userLogged)
            setUser(userLoggedObj)
       
            loadCenters(userLoggedObj.id)
        }
    }, []) //dependecy list

    const loadCenters = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/${id}`)

            if(response.status === 200) {
                let user = response.data
                console.log("Response Data: ", user)
                setUser(user)
            }
            else {
                console.log("Status error: ", response.status)
            }
        }
        catch(error) {
            console.log("Get Centers Error: ", error)
        }
    }

    return (
        <div class="bg-black text-white">
            <div class="flex min-h-screen">

                <aside class="w-96 bg-neutral-950 p-12 flex flex-col gap-8">

                    <div class="flex items-center gap-3">
                        <img
                            aria-hidden="true"
                            alt="user-icon"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik04LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+"
                            class="w-8 h-8 p-1 rounded-full bg-white box-content"
                        />
                        <h1 class="text-3xl font-bold">
                            MARP
                        </h1>
                    </div>

                    <hr class="opacity-10" />

                    <nav>
                        <div class="flex mb-8 gap-3 items-center text-white">
                            <ShieldCheck />
                            <span className="text-xl font-medium">
                                Centrais
                            </span>
                        </div>
                        <ul class="flex flex-col gap-2 px-5 max-h-48 overflow-y-auto custom-scrollbar">
                            {user?.centers?.map((center) => (
                                <li key={center.id}>
                                    <a 
                                    href="#" 
                                    class="block text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded"
                                    >   
                                        {center.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <hr class="opacity-10" />

                    <nav>
                        <div class="flex mb-8 gap-3 items-center text-white">
                            <Calendar />
                            <span className="text-xl font-medium">
                                Logs
                            </span>
                        </div>
                        <ul class="flex flex-col gap-2 px-5 max-h-48 overflow-y-auto custom-scrollbar">
                            <li>
                                <a href="#" class="block text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded">Diário</a>
                            </li>
                            <li>
                                <a href="#" class="block text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded">Semanal</a>
                            </li>
                            <li>
                                <a href="#" class="block text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded">Mensal</a>
                            </li>
                        </ul>
                    </nav>

                    <a href="#" class="mt-auto flex gap-3 items-center text-zinc-400 hover:text-white">
                        <LogOut />
                        <span className="text-lg font-medium">Log out</span>
                    </a>
                </aside>


                <main class="flex-1 p-8">
                    <header class="flex justify-between items-center mb-8">
                        <h1 class="text-3xl font-medium ">Centrais</h1>
                        <Link to={"/addCenter"}>
                            <button class="bg-white text-black px-6 py-4 rounded-lg flex items-center gap-3 mt-3">
                                <LayoutGrid />
                                <span className="text-lg font-medium">Nova Central</span>
                            </button>
                        </Link>
                    </header>

                    <div class="mb-8">
                        <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Todos</button>
                        <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Ativos</button>
                        <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Desativos</button>
                    </div>


                    <div class="grid grid-cols-3 gap-6">
                        <div class="bg-black border border-white border-opacity-10 p-6 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <h2 class="text-lg font-semibold">Garragem</h2>
                                    <Trash className="ml-4" />
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer ">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div
                                        class="w-11 h-6 bg-zinc-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-zinc-800 dark:peer-focus:ring-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-zinc-800">
                                    </div>
                                </label>
                            </div>

                            <div class="flex flex-col mt-4">
                                <div class="px-3 py-2 flex justify-between items-center mb-2 rounded bg-zinc-900">
                                    <p class="text-white">Acionado</p>
                                    <p class="text-zinc-400 text-sm ml-auto">21:00 • 21 de Janeiro, 2021</p>
                                </div>
                                <div class="px-3 py-2 flex justify-between items-center mb-2 rounded">
                                    <p class="text-green-500">Ativado</p>
                                    <p class="text-zinc-400 text-sm ml-auto">21:00 • 21 de Janeiro, 2021</p>
                                </div>
                                <div class="px-3 py-2 flex justify-between items-center mb-2 rounded bg-zinc-900">
                                    <p class="text-red-500">Desligado</p>
                                    <p class="text-zinc-400 text-sm ml-auto">21:00 • 21 de Janeiro, 2021</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
