import { useState, createContext, useContext } from "react";

const CartContext = createContext() //Creo el Context

export const useCartContext = () => useContext(CartContext) // Creo una

export const CartProvider=(props)=>{
    const [cart, setCart]=useState([])
    //Agregar producto -quitar producto -vaciar carrito
    //Obtener Cantidad (subtotales) - Obtener Total Price - buscar Producto
    const isInCart = (id)=>{ //para consultar si un producto existe o no en un carrito
        //find => obj - some =>booleano
        return cart.some(prod =>prod.id ===id)//Me hace un retorno V o F
    }
    const addItem = (item, quantity)=>{
        if(isInCart(item.id)){//se consulta si el producto existe o no en el carrito
const indice = cart.findIndex((prod) => prod.id === item.id);
const aux =[...cart] //copia del carrito y seteo la cantidad en el carrito del array
aux[indice].quantity=quantity
setCart(aux)
        }else{
            //Creo un nuevo objeto con los datos ingresados
            const newItem = {
              ...item, // operador express
              quantity: quantity, //Si se agrega directamente el parametro se queda con el mismo nombre
            };
                /*
                //Se genera un aux que es igual al carrito para poder hacer el push
                 const aux = cart //Forma compleja
                aux.push(newItem)
                setCart(aux)
                */
               setCart([...cart, newItem])// genero la copia del carrito, Forma Simple y es la mejor forma para aplicarlo.
               }
    }
const removeItem=(id)=>{
/* const aux =[...cart]
const indice =aux.findIndex(prod=> prod.id ===id)
setCart(aux.splice(indice,1)) */

//trae todos los productos que no tengan el id ingresado
    setCart(cart.filter(prod=>prod.id !== id))

}

const emptyCart=()=>{
    setCart([])
}
const getItemQuantity = ()=>{
  //Devuelvo la cantidad de productos en mi carrito
  return cart.reduce((acc, prod) => acc += prod.quantity, 0);
}
const totalPrice =()=>{
return cart.reduce((acc,prod)=>acc += (prod.quantity * prod.precio),0)
}

return(
    <CartContext.Provider value={{cart,addItem, removeItem,emptyCart,totalPrice,getItemQuantity}}>
{props.children}

</CartContext.Provider>
    )

}