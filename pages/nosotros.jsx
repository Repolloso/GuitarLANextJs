import Image from "next/image"
import Layout from "../components/layout"
import styles from '../styles/nosotros.module.css'

const Nosotros = ({indicadorCarrito}) => {
  return (
    <Layout
      title={'Nosotros'}
      description={'Sobre nosotros, GuitarLA, tienda de música'}
      indicadorCarrito={indicadorCarrito}
    >
      <main className="contenedor">
        <h1 className="heading">Nosotros</h1>

        <div className={styles.contenido}>
          <Image src="/img/nosotros.jpg" width={1000} height={800} alt="imagen sobre nosotros" />
          <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla iaculis fringilla quam, id tempor diam viverra vitae. Nam lacinia magna viverra turpis hendrerit, ac varius quam tempor. Etiam facilisis justo eu erat pulvinar placerat. Praesent tristique laoreet metus, ut mattis erat blandit eu. Nam sagittis placerat tellus quis aliquam. Cras id ornare nibh, nec mollis tortor.</p>

              <p>Nulla facilisi. Mauris sed odio enim. Nulla tincidunt fermentum enim, vel venenatis mi suscipit vel. Duis eget scelerisque augue, id tempor leo. Etiam fermentum tellus nec sapien rutrum, at tristique metus rutrum. In eu ipsum commodo, elementum est vel, congue ligula. Sed fermentum sapien quis pretium eleifend.</p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Nosotros