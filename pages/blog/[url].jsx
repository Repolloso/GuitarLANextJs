import Layout from "@/components/layout"
import Image from "next/image"
import styles from '@/styles/blog.module.css'
import { formatearFecha } from "@/utils/helpers"

export default function Post({post, indicadorCarrito}) {

    const {titulo, contenido, imagen, url, publishedAt} = post[0].attributes

    return (
        <Layout
            title={titulo}
            indicadorCarrito={indicadorCarrito}
        >
            <article className={`${styles.post} ${styles['mt-3']}`}>
                <Image src={imagen.data.attributes.url} width={1000} height={400} alt={`Imagen Post - ${titulo}`} loading='lazy'/>

                <div className={`${styles.contenido}`}>
                    <h3>{titulo}</h3>
                    <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
                    <p className={styles.texto}>{contenido}</p>
                </div>
            </article>
        </Layout>
    )
}

export async function getServerSideProps({query: {url}}) {
    const res = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`)
    const {data:post} = await res.json()

    return {
        props: {
            post
        }
    }
}