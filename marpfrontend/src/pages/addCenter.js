import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck } from 'lucide-react';
import axios from "axios";

export default function AddCenter() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const status = "DESARMED"
  const[user, setUser] = useState(null)

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

  return (
    <div class="flex items-center justify-center min-h-screen bg-black">
      <div class="bg-black dark:bg-card rounded-lg shadow-lg p-16 w-full max-w-lg border border-gray-500">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-white flex items-center justify-center rounded-full">
            <ShieldCheck />
          </div>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-white">
              Nome
            </label>
            <input
              type="text"
              id="inputName"
              class="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Digite o nome da central"
              onChange={(e) => onNameChange(e)}
              value={name}
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-white">
              Senha
            </label>
            <input
              type="password"
              id="inputPassword"
              class="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Digite a senha da central"
              onChange={(e) => onPasswordChange(e)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-white text-black p-2 rounded-md hover:bg-gray-200"
          >
            Adicionar
          </button>
        </form>
        <label class="text-sm font-medium text-white">
          <Link to={"/homepage"}>Voltar.</Link>
        </label>
      </div>
    </div>
  );
}
