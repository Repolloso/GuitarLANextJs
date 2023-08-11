// import { useRouter } from "next/router"
import styles from '@/styles/guitarras.module.css'
import Image from 'next/image'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'

// Para hacer rutas dinamicas debemos crear un archivo con el nombre de la ruta dinamica, en este caso, [url].jsx
// Agregar carrito viene del app (context)
export default function Producto({guitarra, agregarCarrito, indicadorCarrito}) {

    // const router = useRouter()
    //como nombres el archivo de la ruta dinamica [url].jsx, el nombre del parametro dinamico es url, si ponemos [id].jsx, el nombre del parametro dinamico es id
    const [cantidad, setCantidad] = useState(0)
    const {nombre, imagen, url, precio, descripcion} = guitarra[0].attributes

    const handleSubmit = e => {
        e.preventDefault()

        if(cantidad < 1) {
            alert('Debe seleccionar una cantidad válida')
            return
        }

        // Construir un objeto para guardar en localStorage
        const guitarraSeleccionada = {
            id: guitarra[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }
        
        // Pasando la informacion al context
        agregarCarrito(guitarraSeleccionada)
    }

    return (
        <Layout
            title={'Guitarra ' + nombre}
            indicadorCarrito={indicadorCarrito}
        >
            <div className={styles.guitarra}>
                {/* para pasar imagenes debemos configurar el dominio desde el next.config.js */}
                <Image src={imagen.data.attributes.url} width={1000} height={800} alt={`Imagen Guitarra - ${nombre}`} loading='lazy'/>

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                    {/* Aca vamos a pasar a la ruta guitarras/url --> url es el parametro que es dinamico en la url */}
                    <form className={styles.formulario} onSubmit={handleSubmit}>
                        <label htmlFor="cantidad">Cantidad:</label>
                        {/* si le ponemos un + delante del e decimos que es un number y no un string */}
                        <select id="cantidad" onChange={e => setCantidad(+e.target.value)}>
                            <option value="0">-- Seleccione --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <input type="submit" value="Agregar al carrito" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

// cuando tenemos routing dinamico y usamos getStaticProps, debemos usar getStaticPaths para generar las rutas dinamicas, si no, no funcionara. No hay necesidad de usar el metodo getStaticPaths si estamos en una ruta no dinamica
// getStaticPaths se usa para generar las rutas dinamicas, y getStaticProps se usa para obtener los datos de la ruta dinamica
export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/guitarras`)
    const {data:guitarras} = await res.json()

    // iteramos sobre el array de guitarras y retornamos un objeto con el parametro dinamico que queremos generar, esto se hace para que si hay 1000 guitarras, no se generen 1000 rutas dinamicas, sino que se generen solo las que necesitamos
    const paths = guitarras.map(guitarra => {
        return {
            // el nombre del parametro dinamico debe ser el mismo que el nombre del archivo de la ruta dinamica, en este caso, [url].jsx, params es lo que le mandamos como parametro a getStaticProps
            params: {url: guitarra.attributes.url}
        }
    })

    return {
        paths,
        // fallbacks false significa que si la ruta no existe, nos va a dar un 404, si ponemos fallbacks true, significa que si la ruta no existe, nos va a dar un 404 (automaticamente), si ponemos true debemos nosotros debemos decidir que mostrar dentro del componente Producto en este caso.
        fallback: false
    }

}

// si ponemos query como parametro de getServerSideProps, podemos acceder a los parametros dinamicos de la url, ahora, si creamos un getStaticPaths, no podemos usar query, sino que debemos usar params para acceder a los parametros dinamicos de la url. Next automaticamente detecta que estamos usando getStaticPaths y nos obliga a usar params en vez de query.
export async function getStaticProps({params: {url}}) {
    // si pasamos como parametro {datos} en getServerSideProps, podemos acceder a los parametros dinamicos de la url con datos.nombreDelParametroDinamico

    const res = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    const {data:guitarra} = await res.json() 
    console.log(guitarra)

    return {
        props: {
            guitarra
        }
    }
}
