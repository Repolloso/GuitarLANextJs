import '@/styles/globals.css'
import { useState, useEffect } from 'react'

//_app.js es un componente de Next.js que se utiliza para inicializar páginas. Puede utilizar este archivo para pasar props a la página, por ejemplo, para inicializar el estado de Redux o para agregar estilos globales.

export default function App({ Component, pageProps }) {

  // typeof window !== 'undefined' lo utilizamos para que no se rompa la app en el servidor ya que localStorage no existe en el servidor solo en el navegador y este condicional lo que hace es que si no existe window no se ejecuta el codigo (window hace referencia al navegador)

  //JSON.parse pasa de string a objeto y JSON.stringify pasa de objeto a string
  const [carrito, setCarrito] = useState( typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : []);
  const [indicadorCarrito, setIndicadorCarrito] = useState( typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('indicadorCarrito')) ?? 0 : 0 );
  const [paginaLista, setPaginaLista] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify( carrito ));
    localStorage.setItem('indicadorCarrito', JSON.stringify( carrito.length ));
  }, [carrito])

  // lo que hace este useEffect es que cuando se renderiza la pagina por primera vez se ejecuta el useEffect y se setea la variable paginaLista a true y cuando se setea a true se renderiza el componente Component, si no hacemos esto se renderiza el componente Component con un array que solo existe en el navegador y no en el servidor y esto hace que se rompa la app
  useEffect(() => {
    setPaginaLista(true);
  }, [])

  const agregarCarrito = guitarra => {
    // Comprobar si la guitarra ya esta en el carrito...
    if(carrito.some( guitarraState =>  guitarraState.id === guitarra.id )) {
        // Iterar para actualizar la cantidad
        const carritoActualizado = carrito.map( guitarraState => {
            if( guitarraState.id === guitarra.id ) {
                guitarraState.cantidad = guitarra.cantidad;
            } 
            return guitarraState;
        });
        // Se asigna al array
        setCarrito([...carritoActualizado]);
        localStorage.setItem('carrito', JSON.stringify( carrito ));
    } else {
        // En caso de que el articulo no exista, es nuevo y se agrega
        setCarrito([...carrito, guitarra]);
        localStorage.setItem('carrito', JSON.stringify( carrito ));
    }

    // Actualizar el indicador del carrito
    setIndicadorCarrito(carrito.length + 1);
    localStorage.setItem('indicadorCarrito', JSON.stringify( carrito.length + 1 ));
  }

  const eliminarProducto = id => {
      const carritoActualizado = carrito.filter( producto => producto.id != id)
      setCarrito(carritoActualizado)
      window.localStorage.setItem('carrito', JSON.stringify( carrito ));
      // Actualizar el indicador del carrito
      setIndicadorCarrito(carritoActualizado.length);
      window.localStorage.setItem('indicadorCarrito', JSON.stringify( carritoActualizado.length ));
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map( guitarraState => {
      if(guitarraState.id === guitarra.id ) {
        guitarraState.cantidad = parseInt( guitarra.cantidad )
      } 
      return guitarraState
    })
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify( carrito ));
  }

  //TODO LO QUE MANDE MEDIANTE APP_ (CONTEXT) NO LO RECIBEN DIRECTAMENTE LOS COMPONENTS, SE LO DEBO PASAR POR PROPS A LAS PAGES

  return paginaLista ? <Component 
          {...pageProps} 
          carrito={carrito}
          agregarCarrito={agregarCarrito}
          eliminarProducto={eliminarProducto}
          actualizarCantidad={actualizarCantidad}
          indicadorCarrito={indicadorCarrito}
  /> : null
}
