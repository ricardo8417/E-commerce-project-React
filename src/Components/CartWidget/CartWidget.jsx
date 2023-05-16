import { useCartContext } from '../../context/CartContext'
import cart from './assets/carrito.svg'
import {Link} from 'react-router-dom'
export const CartWidget= () => {
  const{getItemQuantity}=useCartContext()
  return (
    <>
    {/* <button className="btn  cartWidget"> */}
    <Link to={"/cart"} className="nav-link">
      <img src= {cart} alt="cart-widget" />
     {getItemQuantity() >0 &&<span className='cantCart'>{getItemQuantity()}</span>}
         </Link>
         {/* </button> */}
          </>
          
  )
}
