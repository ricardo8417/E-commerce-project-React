//Consulto un Produccto de mi Database
import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
//Importo la consulta del producto de mi base de datos en firebase
import { getProduct } from "../../firebase/firebase.js"

export const ItemDetailContainer = () => {

    const [item, setItem] = useState([])

    const { id } = useParams()
    useEffect(() => {
        getProduct(id).then(prod => setItem(prod))
    }, [])

    return (
        <div className="card mb-3 container itemDetail">
            <ItemDetail item={item} />
        </div>
    )
}