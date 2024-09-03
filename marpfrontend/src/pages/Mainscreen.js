import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Calendar, LogOut, LayoutGrid } from 'lucide-react';
import { useState } from "react";
import Modal from "../components/Modal";
import '../App.css';
import axios from 'axios';


export default function Mainscreen() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const status = "DESARMED"

    useEffect(() => {
        const userLogged = localStorage.getItem("userLogged")

        if (userLogged) {
            const userLoggedObj = JSON.parse(userLogged)
            setUser(userLoggedObj)

            loadCenters(userLoggedObj.id)
        }
    }, []) //dependecy list

    const handleLogOut = () => {
        localStorage.removeItem("userLogged")
        navigate("/")
    }

    const loadCenters = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/${id}`)

            if (response.status === 200) {
                let user = response.data
                console.log("Response Data: ", user)
                setUser(user)
            }
            else {
                console.log("Status error: ", response.status)
            }
        }
        catch (error) {
            console.log("Get Centers Error: ", error)
        }
    }
  
    const onNameChange = (e) => {
      setName(e.target.value);
    }
    const onPasswordChange = (e) => {
      setPassword(e.target.value);
    }
  
    useEffect(() => {
      const userLogged = localStorage.getItem("userLogged")
  
      if(userLogged) {
        const userLoggedObj = JSON.parse(userLogged)
        setUser(userLoggedObj)
      }
    })
  
    const centerInfos = {
      name: name,
      password: password,
      status: status
    };
  
    const clearInputs = () => {
      setName("")
      setPassword("")
    }
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(`http://localhost:8080/api/v1/center/${user.id}/centers`, centerInfos)
          if (response.status === 201) {
              alert("Central Created!")
              console.log("POST SUCCESSFUL")
              clearInputs()
          } else {
              alert("Status Error: ", response.status)
              console.log(response.status)
          }
      } catch (error) {
          console.log("POST ERROR: ", error)
      }
    };
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
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

                        {/*handleLogOut its only executed when user clicks on the button(no parenthenses)*/}
                        <a onClick={handleLogOut} href="#" class="mt-auto flex gap-3 items-center text-zinc-400 hover:text-white">
                            <LogOut />
                            <span className="text-lg font-medium">Log out</span>
                        </a>
                    </aside>


                    <main class="flex-1 p-8">
                        <header class="flex justify-between items-center mb-8">
                            <h1 class="text-3xl font-medium ">Centrais</h1>
                            <button class="bg-white text-black px-6 py-4 rounded-lg flex items-center gap-3 mt-3" onClick={() =>
                                setShowModal(true)}>
                                <LayoutGrid />
                                <span className="text-lg font-medium">Nova Central</span>
                            </button>
                        </header>

                        <div class="mb-8">
                            <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Todos</button>
                            <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Ativos</button>
                            <button class=" text-zinc-400 px-4 py-2 rounded hover:bg-neutral-950 hover:text-white">Desativos</button>
                        </div>

                        <div class="grid grid-cols-3 gap-6">
                            {user?.centers.map((center) => (
                                <>
                                    <Card key={center.id} center={center}></Card>
                                </>
                            ))}   
                        </div>
                    </main>
                </div>
            </div> 

            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>   
                <div className="bg-black dark:bg-card rounded-lg shadow-lg p-12 border border-gray-500 border-opacity-20">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full">
                        <ShieldCheck />
                        </div>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="inputName"
                                className="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Digite o nome da central"
                                onChange={(e) => onNameChange(e)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="inputPassword"
                                className="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Digite a senha da central"
                                onChange={(e) => onPasswordChange(e)}
                                value={password}
                                required
                            />
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-white text-black p-2 rounded-md hover:bg-gray-200"
                        >
                        Adicionar
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}
