import { useCartContext } from "../../context/CartContext"
import {Link} from 'react-router-dom'
import { ItemList } from "../ItemList/ItemList"
export const Cart =()=>{
   const{cart,totalPrice,emptyCart}=useCartContext()
    return(
        <>
            {
                cart.length ===0 ?
                <div className="cart-vacio">
                <h1>Carrito Vacio</h1>
                <button className="btn btn-dark"> <Link to={"/"} className="nav-link">Continuar Comprando </Link></button>
                </div>
                :
                <div className="container cartContainer">
            {<ItemList productos={cart} plantilla={"ItemCart"} />}
<div className="cartButtons">
                            <p>Monto Total de la compra: ${totalPrice()}</p>
                            <button className="btn btn-danger" onClick={() => emptyCart()}>Vaciar Carrito</button>
                            <Link className="nav-link" to={"/"}><button className="btn btn-dark">Continuar Comprando</button></Link>
                            <Link className="nav-link" to={"/checkout"}><button className="btn btn-dark">Finalizar Compra</button></Link>
                        </div>
                </div>
            }


        </>
    )
}