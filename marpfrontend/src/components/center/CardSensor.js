import React, { useEffect } from 'react'
import { Trash } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

export default function CardSensor({ sensor }) {
    const[status, setStatus] = useState(sensor.status);
    const[events, setEvents] = useState([]); 

    useEffect(() => {
        setStatus(sensor.status)
        getEvents()
    }, [sensor.status])
    
    const removeSensor = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/sensor/${sensor.id}`)
            if (response.status === 204) {
                alert("Sensor successfully removed!")
                window.location.reload()
            }
            else {
                alert(`Status error: ${response.status}`);
            }
        } catch (error) {
            console.log("Error removing sensor: ", error);
            alert("An error occurred!")
        }
    }

    const changeSensorStatus = async () => {
        try {
            let newStatus = status === "OFF" ? "ON" : "OFF"

            const response = await axios.put(`http://localhost:8080/api/v1/sensor/${sensor.id}` , {
                id: sensor.id,
                name: sensor.name,
                status: newStatus,
            })

            if(response.status === 200) {
                setStatus(newStatus);
                getEvents()
            }
            console.log("Status de sensor atualizado, status: ", status)
        }   
        catch(error) {
            alert("Undefined error!")
            console.log("ERROR CHANGING SENSOR STATUS: ", error)
        }
    }

    const getEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/sensor/${sensor.id}/events`)

            if(response.status === 200) {
                setEvents(response.data)
            }
        } catch(error) {
            alert("Undefined error!")
            console.log("ERROR GETTING SENSOR EVENTS: ", error)
        }
    } 

  return (
    <>
        <div class="bg-black border border-white border-opacity-10 p-6 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <h2 class="text-lg font-semibold">{sensor.name}</h2>
                    <Trash onClick={removeSensor} className="ml-4 cursor-pointer" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer ">
                    <input type="checkbox" className="sr-only peer" checked={status === "ON"} readOnly />
                    <div
                        class="w-11 h-6 bg-zinc-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-zinc-800 dark:peer-focus:ring-zinc-800 
                        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                        after:left-[2px] after:bg-white after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-white peer-checked:after:bg-zinc-800"
                        onClick={() => {changeSensorStatus()}}>
                    </div>
                </label>
            </div>
            
            <div class="flex flex-col mt-4">
                {events?.slice(-3).map((event) => (
                    <div key={event.id} class="px-3 py-2 flex justify-between items-center mb-2 rounded bg-zinc-900">
                    {event.name === "Ativado" ?
                    <>
                        <p class="text-green-500">{event.name}</p>
                        <p class="text-zinc-400 text-sm ml-auto">{event.date}</p>              
                    </>
                    :
                    <>
                        <p class="text-red-500">{event.name}</p>
                        <p class="text-zinc-400 text-sm ml-auto">{event.date}</p>
                    </>
                    }
                    </div>
                ))}
            </div>
        </div>  
    </>
    )
}
