import './App.css';
 import 'react-toastify/dist/ReactToastify.css';
//Router
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

//Footer
import Footer from './Footer/Footer';

//context
import { DarkModeProvider } from '../context/DarkModeContext.js';


//Componentes
import {Menu} from './Navbar/NavBar'
import { ItemListContainer } from './ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './ItemDetailContainer/ItemDetailContainer';
import { Checkout } from './Checkout/Checkout';
import {Cart} from './Cart/Cart';

//Importar  react Toastify
import { ToastContainer} from 'react-toastify';
 
export const App= () => {
  
  
  return (
    <>

{/*  BrowserRouter: va a definir la configuración de mis rutas*/ }
    <BrowserRouter> 
    <DarkModeProvider>
    <Menu />
    <ToastContainer />
<Routes>
  <Route path='/' element={<ItemListContainer />} />
  <Route path='/category/:category' element={<ItemListContainer />} />     
  <Route path='/product/:id' element={<ItemDetailContainer />} />   
  <Route path='/checkout' element={<Checkout />} />
   <Route path='/cart' element={<Cart />} />
  <Route path='*' element={<h1>404 Not Found</h1>} />
  
</Routes>
</DarkModeProvider>
<Footer />
</BrowserRouter>
    </>
  );
}

export default App;
