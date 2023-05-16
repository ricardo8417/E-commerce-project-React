import { useState, createContext, useContext } from "react";

const DarkModeContext = createContext() //se Crea el Contexto
export const useDarkModeContext=()=> useContext(DarkModeContext) // Se crea una función para consulta del contexto
export const DarkModeProvider =(props) =>{ //Forma para proveedor el contexto en mi aplicación puede recibir propiedades si es necesario

    const [darkMode, setDarkMode]=useState(false) // Se define el valor inicial del darkMode
    //Funciones para modificar el State
    const toggleDarkMode=() =>{
        setDarkMode(!darkMode) //si estaba en verdadero lo pase a falso y viciversa

        //Agregación de clase de css por temas de bootstrap
        if(!darkMode){ //!darkMode por consulta en la modificación
            document.body.classList.add("darkMode")
         }else{
            document.body.classList.remove("darkMode")
         }


    }
return (
  <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
    {props.children}
  </DarkModeContext.Provider>
);
}