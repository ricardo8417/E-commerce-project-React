
import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, doc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "bd-ecommerce-5f99e.firebaseapp.com",
  projectId: "bd-ecommerce-5f99e",
  storageBucket: "bd-ecommerce-5f99e.appspot.com",
  messagingSenderId: "445708860148",
  appId: "1:445708860148:web:f00dbab90e39be09207ca1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Consultamos a la Base de Datos
const DB = getFirestore()

//Creamos el Crud: Create, Read, Update y Delete

//Crud de Productos

export const createDbProducts = async ()=>{
const promise = await fetch('./Data/productos.json')
const productos =await promise.json()

productos.forEach(async(prod) => {
await addDoc(collection(DB, "productos"), { //si existe la colección agrega los nuevos productos, en dado caso de que no exista crea la colecction
  
  // Se crean los atributos de mi BD
  nombre: prod.nombre,
  marca: prod.marca,
  modelo: prod.modelo,
  categoria: prod.categoria,
  stock: prod.stock,
  precio: prod.precio,
  img:prod.img
}); 

    
});
}

//Funciones para consultar todos los productos de mi Base de Datos
export const getProducts = async() =>{
    const prods = await getDocs(collection(DB,"productos"))
    //Transformamos los datos a un array de objetos simples.
    const items = prods.docs.map(prod =>{
        return{...prod.data(), id: prod.id}
    })
    return items
}

//Función para consultar un solo producto pro medio del id
export const getProduct = async (id) =>{
const prod = await getDoc(doc(DB,"productos", id))
const item ={...prod.data(), id: prod.id}
return item
}

//Función para actualizar el producto por medio del id
export const updateProduct =async (id,info) =>{
const estado = await updateDoc(doc(DB, "productos",id), info)
console.log(estado)
}

//Función para eliminar producto

export const deleteProduct = async(id)=>{
    const estado = await deleteDoc(doc(DB,"productos", id))
    return estado
}




// CREATE Y READ Función para crear la Orden de Compra

export const createOrdenCompra = async(cliente, precioTotal, carrito, fecha) =>{
    const ordenCompra = await addDoc(collection(DB,"ordendeCompra"),{
     cliente:cliente,
     items: carrito,
     precioTotal: precioTotal,
     fecha: fecha
    })
    return ordenCompra
}

//Función para consultar una orden de compra
export const getOrdenCompra = async(id)=>{
    const ordenCompra = await getDoc(doc(DB, "ordenCompra",id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
return item
}

//Función eliminar orden de compra
export const deleteOrdenCompra = async (id) => {
  const estado = await deleteDoc(doc(DB, "ordenCompra", id));
  return estado;
};