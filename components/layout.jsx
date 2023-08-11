import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function layout({children, title = '', description = '', indicadorCarrito = 0}) {
    return (
        <>
            {/* Todo lo que pongas aca se va a repetir en todas las vistas que sean encerradas por el componente layout */}
            <Head>
                <title>{`GuitarLA - ${title}`}</title>
                <meta name="description" content={description} />
            </Head>

            <Header indicadorCarrito={indicadorCarrito} />
                {children}
            <Footer/>
        </>
    )
}
