import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Card({ center }) {
    const[status, setStatus] = useState(center.status);
    const[events, setEvents] = useState([]);

    useEffect(() => {
        setStatus(center.status);
        getEvents();
    }, [center.status])

    const removeCentral = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/center/${center.id}`)
            if (response.status === 204) {
                alert("Center successfully removed!")
                window.location.reload()
            }
            else {
                alert(`Status error: ${response.status}`);
            }
        } catch (error) {
            console.log("Error removing center: ", error);
            alert("An error occurred!")
        }
    }

    const changeCenterStatus = async () => {
        try {
            let newStatus = status === "DESARMED" ? "ARMED" : "DESARMED"; //ternary condition
            //if center status === "DESARMED", the new status will be "ARMED" -> onClick!

            const response = await axios.put(`http://localhost:8080/api/v1/center/${center.id}` , {
                id: center.id,
                name: center.name,
                password: center.password,
                status: newStatus,
                log: center.log
            })
            
            if(response.status === 200) {
                setStatus(newStatus);
                getEvents()
            }
        } catch(error) {
            alert("Undefined error!")
            console.log("ERROR: ", error)
        }
    }

    const getEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/center/${center.id}/events`)

            if(response.status === 200) {
                setEvents(response.data)
            }
        } catch(error) {
            console.log("ERROR getting events: ", error)
        }
    }

  return (
    <>
        <div class="bg-black border border-white border-opacity-10 p-6 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to={`/center/${center.id}`}>
                        <h2 class="text-lg font-semibold cursor-pointer">{center.name}</h2>
                    </Link>
                    <Trash onClick={removeCentral} className="ml-4 cursor-pointer" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer ">
                    <input type="checkbox" className="sr-only peer" checked={status === "ARMED"} readOnly />
                    <div
                        class="w-11 h-6 bg-zinc-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-zinc-800 dark:peer-focus:ring-zinc-800 
                        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                        after:left-[2px] after:bg-white after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-white peer-checked:after:bg-zinc-800"
                        onClick={() => changeCenterStatus()}>
                    </div>
                </label>
            </div>
            
            <div class="flex flex-col mt-4">
                {events?.slice(-3).map((event) => (
                    <div key={event.id} class="px-3 py-2 flex justify-between items-center mb-2 rounded bg-zinc-900">
                        {event.name === "Desarmada" ?
                        <>
                            <p className="text-red-500">{event.name}</p> 
                            <p class="text-zinc-400 text-sm ml-auto">{event.date}</p>
                        </>
                         : 
                        <>
                            <p className="text-green-500">{event.name}</p> 
                            <p class="text-zinc-400 text-sm ml-auto">{event.date}</p>
                        </>}
                    </div>
                ))}
            </div>
        </div>  
    </>
    )
}
