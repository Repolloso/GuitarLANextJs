import { Html, Head, Main, NextScript } from 'next/document'

//_document.js es un componente de Next.js que se utiliza para modificar el documento HTML que se genera en cada página. Por defecto, Next.js agrega un documento HTML. Este es el nivel mas alto de la jerarquía de componentes de React (Next). _app.js es el padre de los componentes y paginas 

export default function Document() {
    return (
        <Html lang='es'>
            <Head>
                <link href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}