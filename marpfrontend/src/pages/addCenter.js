import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddCenter() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const status = "DESARMED"

  const onNameChange = (e) => {
    setName(e.target.value);
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

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
        const response = await axios.post("http://localhost:8080/api/v1/center", centerInfos)
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
              type="inputPassword"
              id="password"
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
