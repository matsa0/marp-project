import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const registerInfos = {
    name: name,
    email: email,
    password: password,
  };

  const postRegisterInfos = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user",
        registerInfos
      );
      if (response === 201) {
        console.log("POST SUCCESSFUL");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("POST ERROR: ", error);
    }
  };

  const isValidRegister = (users) => {
    let isValid = true;

    for (let user of users) {
      if (email === user.email) {
        console.log("Email already registered. Try again!");
        alert("Email already registered. Try again!");
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/api/v1/user");

      if (response.status === 200) {
        const users = response.data;

        if (isValidRegister(users) === true) {
          postRegisterInfos();
          alert("ACCOUNT CREATED!");
          navigate("/homepage");
        }
      }
    } catch (error) {
      console.log("GET ERROR: ", error);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-black">
      <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg border border-gray-500">
        <div class="w-1/2 p-8 bg-[#080808] text-white rounded-l-lg flex flex-col justify-center">
          <h2 class="mb-4 text-2xl font-bold">Bem Vindo ao Marp</h2>
          <p class="mb-8">
            O mais novo sistema de gerenciamento de alarmes residenciais, e a
            solução definitiva para a segurança da sua casa.
          </p>
          <p class="mb-4">Possui um cadastro?</p>
          <Link to={"/"}>
            <button class="px-4 py-2 border border-gray-500 rounded-lg hover:text-gray-300">
              Entrar
            </button>
          </Link>
        </div>
        <div class="w-1/2 p-8 bg-black">
          <h2 class="mb-4 text-2xl font-bold text-white">Crie sua conta</h2>
          <p class="mb-8 text-white">Preencha seus dados</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-white" for="name">
                Nome
              </label>
              <input
                class="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="text"
                id="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => {
                  onNameChange(e);
                }}
                required
              />
            </div>
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-white"
                for="email"
              >
                Email
              </label>
              <input
                class="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  onEmailChange(e);
                }}
              />
            </div>
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-white"
                for="password"
              >
                Senha
              </label>
              <input
                class="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => onPasswordChange(e)}
              />
            </div>
            <button class="w-full px-4 py-2 border border-gray-500 text-white bg-black rounded-lg hover:text-gray-300">
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
