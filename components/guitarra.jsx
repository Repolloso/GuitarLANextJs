import Image from "next/image"
import styles from '@/styles/guitarras.module.css'
import Link from "next/link"

export default function Guitarra({guitarra}) {

    const {nombre, imagen, url, precio, descripcion} = guitarra.attributes

    return (
        <div className={styles.guitarra}>
            {/* para pasar imagenes debemos configurar el dominio desde el next.config.js */}
            <Image src={imagen.data.attributes.formats.medium.url} width={1000} height={800} alt={`Imagen Guitarra - ${nombre}`} />

            <div className={styles.contenido}>
                <h3>{nombre}</h3>
                <p className={styles.descripcion}>{descripcion}</p>
                <p className={styles.precio}>${precio}</p>
                {/* Aca vamos a pasar a la ruta guitarras/url --> url es el parametro que es dinamico en la url */}
                <Link className={styles.enlace} href={`/guitarras/${url}`}>
                    Ver producto
                </Link>
            </div>
        </div>
    )
}
