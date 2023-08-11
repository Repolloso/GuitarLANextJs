import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// styles hace referencia a todo el modulo en general y header hace referencia a la clase en especifico
import styles from '../styles/header.module.css'

export default function Header({indicadorCarrito}) {

    // hook de next para saber en que pagina estamos y otras cosas mas
    const router = useRouter()
    console.log(router.pathname === '/carrito')
    
    return (
        // llamamos a la clase header dentro del modulo styles
        <header className={styles.header}>
            <div className={`contenedor ${styles.barra}`}>
               {/* para poner imagenes debemos poner .src cuando llamamos a una foto */}
                <Link href={'/'}>
                    <Image src="/img/logo.svg" width={300} height={40} alt='imagen logotipo' />
                </Link>

                <nav className={styles.navegacion}>
                    <Link className={ router.pathname === '/' ? styles.active : ''} href="/">
                        Inicio
                    </Link>

                    <Link className={ router.pathname === '/nosotros' ? styles.active : ''} href="/nosotros">
                        Nosotros
                    </Link>

                    <Link className={ router.pathname === '/tienda' ? styles.active : ''} href="/tienda">
                        Tienda
                    </Link>
                    
                    <Link className={ router.pathname === '/blog' ? styles.active : ''} href="/blog">
                        Blog
                    </Link>
                    <Link className={ router.pathname === '/carrito' ? styles.active : ''} href="/carrito">
                        <div className={styles.indicador}>
                        <style jsx>
                            {`
                                #indicadorGlobo {
                                    background-color: ${router.pathname === '/carrito' ? 'black' : '#e99402'};
                                }
                            `}
                        </style>
                            <span className={styles.indicadorGlobo} id='indicadorGlobo'>
                                {indicadorCarrito}
                            </span>
                            <Image src="/img/carrito.png" width={30} height={25} alt='imagen carrito' />
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}