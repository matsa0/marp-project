import React from "react";
import { ShieldCheck } from "lucide-react";

const ModalAddSensor = ({ isVisible, onClose, onSubmit, onNameChange, name }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center modal-fade-in" id="wrapper" onClick={handleClose}>
      <div className="w-[450px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={() => onClose()}>
          X
        </button>  
        <>
          <div className="bg-black dark:bg-card rounded-lg shadow-lg p-12 border border-gray-500 border-opacity-20">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full">
                <ShieldCheck />
              </div>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="inputName"
                  className="mt-1 block w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-500"
                  placeholder="Digite o nome do sensor"
                  onChange={(e) => onNameChange(e)}
                  value={name}
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
        </>
      </div>
    </div>
  );
};

export default ModalAddSensor;
