import { useRef } from "react"
import { useCartContext } from "../../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { createOrdenCompra, getProduct,updateProduct  } from "../../firebase/firebase.js"

import { toast} from 'react-toastify';
export const Checkout = () => {

const email1 = useRef()
    const email2 = useRef()
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
const{cart,totalPrice,emptyCart}=useCartContext()

let navigate = useNavigate() //Devuelve la localización actual
    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
      if (cliente.email !== cliente.emailRepetido){
            toast.warning(`Sus emails no coinciden, intente de nuevo`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            }else{

        const aux = [...cart]
        //Recorro el Carrito y descuento el stock
     aux.forEach(prodCart=>{
getProduct(prodCart.id).then(prodDB=>{
    //Condicional para validar si  el stock de mi producto dentro de la DB es mayor o igual a la cantidad que el cliente quiere comprar de mis productos, descuento el stock.
    if(prodDB.stock >= prodCart.quantity){
       prodDB.stock -= prodCart.quantity
        updateProduct(prodDB.id, prodDB) //Se envia a la DB el producto descontando su stock
    }else{
        toast("El stock no es mayor o igual a la cantidad que se quiere comprar", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                    });
                         }
                   })
                 })

     const aux2 = aux.map(prod => ({id:prod.id, quantity:prod.quantity, precio:prod.precio}))

createOrdenCompra(cliente, totalPrice(), aux2, new Date().toLocaleString('es-MX', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })).then(ordenCompra =>{

toast.success(`🛒 Muchas gracias por realizar su compra en nuestra tienda, su ID de compra es ${ordenCompra.id} por un total de $${totalPrice()}, en breve nos contactaremos para el envio`, {
  theme: "colored",
 position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

emptyCart()
e.target.reset() //Reset form
navigate("/") //Definimos la ruta hacia donde querramos dorogor
})
.catch(error=>{
 console.error(error)   
})
}   
    }
    return (
        <>
        {
        cart.length ===0 ?
        <> 
        <h2>Para la Finalización de la compra debe tener productos en el carrito</h2>
        <Link className="nav-link" to={"/"}><button className="btn btn-primary">Continuar comprando</button></Link>
        </>
:
 <div className="container divForm" >
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                    <input type="text" className="form-control" name="nombre" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" ref={email1} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Repetir Email</label>
                    <input type="email" className="form-control" name="emailRepetido" ref={email2} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" name="dni" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Numero telefonico</label>
                    <input type="number" className="form-control" name="celular" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" name="direccion" required/>
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>
        </div>
    }
        </>
       
    )
}