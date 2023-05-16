import { useState, useEffect } from "react"
import { ItemList } from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { useDarkModeContext } from "../../context/DarkModeContext"
import { getProducts } from "../../firebase/firebase.js"
export const ItemListContainer = () => {

  const [productos, setProductos] = useState([])
const {category} = useParams()
const{darkMode}=useDarkModeContext()

  useEffect(() => {

    if(category){
      getProducts()
      .then(productos => {
        const productosFiltrados = productos.filter(prod => prod.stock > 0).filter(prod=>prod.categoria ===(category))
        setProductos(productosFiltrados)

      })
    }else{
 getProducts()
      .then(productos => {
        const productosFiltrados = productos.filter(prod => prod.stock > 0)
        setProductos(productosFiltrados)
      })
    }
     }, [category])//Para ejecutar cada ves que se llegue a modificar una categoria.

  return (
    <div className="row">
      <h1>Listado de Productos</h1>
      {<ItemList productos={productos} plantilla={"Item"} />}
    </div>
  )
}

