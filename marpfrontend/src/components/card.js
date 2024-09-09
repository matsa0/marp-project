import React from 'react'
import { Trash } from 'lucide-react';

export default function Card({ center }) {
  return (
    <>
        <div class="bg-black border border-white border-opacity-10 p-6 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <h2 class="text-lg font-semibold">{center.name}</h2>
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
    </>
    )
}
