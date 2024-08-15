import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
      <div class="flex items-center justify-center min-h-screen bg-zinc-200">
        <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <div class="w-1/2 p-8 bg-red-600 text-white rounded-l-lg flex flex-col justify-center">
            <h2 class="mb-4 text-2xl font-bold">Bem Vindo ao Marp</h2>
            <p class="mb-8">
              O mais novo sistema de gerenciamento de alarmes residenciais, e a
              solução definitiva para a segurança da sua casa.
            </p>
            <p class="mb-4">Possui um cadastro?</p>
            <Link to={'/'}>
              <button class="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-red-600">
                Entrar
              </button>
            </Link>
          </div>
          <div class="w-1/2 p-8">
            <h2 class="mb-4 text-2xl font-bold text-red-600">Crie sua conta</h2>
            <p class="mb-8 text-zinc-600">Preencha seus dados</p>
            <form>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-zinc-700"
                  for="name"
                >
                  Nome
                </label>
                <input
                  class="w-full px-3 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  type="text"
                  id="name"
                  placeholder="Nome"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-zinc-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  type="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-zinc-700"
                  for="password"
                >
                  Senha
                </label>
                <input
                  class="w-full px-3 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  type="password"
                  id="password"
                  placeholder="Senha"
                />
              </div>
              <button class="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                Criar conta
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}
