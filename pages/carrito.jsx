import { useState, useEffect } from "react"
import Image from "next/image"
import Layout from "@/components/layout"
import styles from '@/styles/carrito.module.css'

export default function Carrito({carrito, actualizarCantidad, eliminarProducto, indicadorCarrito}) {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const calcularTotal = carrito.reduce((total, guitarra) => total + (guitarra.precio * guitarra.cantidad), 0)
        setTotal(calcularTotal)
    }, [carrito])

    return (
        <Layout
            title={'Carrito de compras'}
            indicadorCarrito={indicadorCarrito}
        >
            <main className="contenedor">
                <h1 className="heading">Carrito</h1>

                <div className={styles.contenido}>
                    <div className={styles.carrito}>
                        <h2>Articulos</h2>

                        {
                            carrito.length > 0 ? (
                                carrito.map((guitarra, i) => (
                                    <div key={i} className={styles.producto}>
                                        <div>
                                            <Image src={guitarra.imagen} alt={`Imagen Guitarra - ${guitarra.nombre}`} width={250} height={480} />
                                        </div>
                                        <div>
                                            <p className={styles.nombre}>{guitarra.nombre}</p>
                                            <div className={styles.cantidad}>
                                                <p>Cantidad:</p>
                                                <select 
                                                    className={styles.select} 
                                                    onChange={e => actualizarCantidad({id: guitarra.id, cantidad: e.target.value})}
                                                    value={guitarra.cantidad}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <p className={styles.precio}>Precio: $<span>{guitarra.precio}</span></p>
                                            <p className={styles.subtotal}>Subtotal: $<span>{ guitarra.cantidad * guitarra.precio}</span></p>
                                        </div>
                                        <button
                                            className={styles.eliminar}
                                            type="button"
                                            onClick={() => eliminarProducto(guitarra.id)}
                                        >x</button>
                                    </div>
                                ))
                            ) : (
                                <p>No hay articulos en el carrito</p>
                            )
                        }
                    </div>
                    <aside className={styles.resumen}>
                        <h3>Resumen del pedido</h3>
                        <p>Total a pagar: ${total} </p>
                    </aside>
                </div>
            </main>
        </Layout>
    )
}
