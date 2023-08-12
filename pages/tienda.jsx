import Layout from "@/components/layout"
import Guitarra from "@/components/guitarra"
import styles from '@/styles/grid.module.css'

// Cuando usar StaticProps y cuando usar ServerSideProps?

// Si necesitas datos en el momento de la compilación (build time) y no necesitas que se actualicen en cada petición, usa StaticProps --> se usa cuando la informacion no cambia en cada request, se usa para paginas informativas, documentacion, etc.
// Si necesitas datos en el momento de la petición (request time) usa ServerSideProps --> cuando la pagina se actualiza cada poco tiempo o de forma continua.

const Tienda = ({guitarras, indicadorCarrito}) => {

    return (
        <Layout
            title={'Tienda'}
            description={'Tienda virrtual de guitarras, bajos, baterías, GuitarLA'}
            indicadorCarrito={indicadorCarrito}
        >

            <main className="contenedor">
                <h1 className="heading">Tienda </h1>

                <div className={styles.grid}>
                    {guitarras?.map(guitarra => (
                        <Guitarra
                            key={guitarra.id}
                            guitarra={guitarra}
                        />
                    ))}
                </div>
            </main>
            
        </Layout>
    )
}

export default Tienda

// la peticiones se deben hacer si o si en pages, no en componentes
// getStaticProps se ejecuta en el servidor de node.js, esto lo que hace es cargar desde el servidor la informacion que se va a mostrar en la pagina, es decir, se ejecuta en el servidor de node.js y no en el navegador, por ende, cuando hagas un npm run build y un npm run start, la informacion ya va a estar cargada en el servidor y no va a tener que hacer la peticion al servidor de strapi, esto es muy util cuando la informacion no cambia en cada request, por ejemplo, en una pagina de documentacion, en una pagina de blog, etc.
// si cambiaste de informacion en strapi, debes hacer un npm run build y un npm run start para que la informacion se actualice en el servidor de node.js
// primero se ejecuta el servidor de node.js y luego se ejecuta el navegador
// export async function getStaticProps() {
//     const res = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
//     const {data:guitarras} = await res.json()

//     //siempre debe haber return en getStaticProps  
//     return {
//         props: {
//             guitarras
//         }
//     }
// }

// La ventaja de usar getServerSideProps es que la informacion se va a cargar en el servidor de node.js en cada request, es decir, si la informacion cambia en strapi, no es necesario hacer un npm run build y un npm run start para que la informacion se actualice en el servidor de node.js, esto es muy util cuando la informacion cambia en cada request, por ejemplo, en una pagina de tienda, en una pagina de noticias, etc. La desventaja de esto es que siempre vas a estar consultando a la api y base de datos cada vez que se haga un request, lo que puede ser un poco lento. Si solo voy a mostrar informacion que no cambia en cada request, es mejor usar getStaticProps.
export async function getServerSideProps() {
    const res = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`, {next: { revalidate: 15000 }})
    const {data:guitarras} = await res.json()

    return {
        props: {
            guitarras
        }
    }
}