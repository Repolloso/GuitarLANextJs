import Layout from '@/components/layout'
import Guitarra from '@/components/guitarra'
import Post from '@/components/post'
import styles from '@/styles/grid.module.css'
import Curso from '@/components/curso'

export default function Home({guitarras, posts, curso, indicadorCarrito}) {
  
  return (
    <>
      <Layout 
        title={'Inicio'}
        description={'Blog de música, venta de guitarras y más'}
        indicadorCarrito={indicadorCarrito}
      >
        <main className="contenedor">
          <h1 className="heading">Nuestra Colección</h1>

          <div className={styles.grid}>
              {guitarras?.map(guitarra => (
                  <Guitarra
                      key={guitarra.id}
                      guitarra={guitarra}
                  />
              ))}
            </div>
        </main>

        <Curso curso={curso} />

        <section className='contenedor'>
          <h2 className="heading">Blog</h2>

          <div className={styles.grid}>
              {
                  posts?.map(post => (
                      <Post
                          key={post.id}
                          post={post.attributes}
                      />
                  ))
              }
          </div>
        </section>
      </Layout>
    </>
  )
}

// cuando el routing no es dinamico y usamos getStaticProps no es necesario usar getStaticPaths
export async function getStaticProps() {
  const urlGuitarras = `${process.env.API_URL}/guitarras?populate=imagen`
  const urlPosts = `${process.env.API_URL}/posts?populate=imagen`
  const urlCurso = `${process.env.API_URL}/curso?populate=imagen`

  // cuando tenes 2 o mas fetch, podes usar Promise.all para que se ejecuten en paralelo y no uno despues del otro, no es recomendable usar await para mas de 1 fetch, en ese caso usar Promise.all

  const [guitarrasRes, postsRes, cursoRes] = await Promise.all([
    fetch(urlGuitarras, {next: { revalidate: 8000 }}),
    fetch(urlPosts, {next: { revalidate: 8000 }}),
    fetch(urlCurso, {next: { revalidate: 8000 }}),
  ])

  const [{data:guitarras}, {data:posts}, {data:curso}] = await Promise.all([
    guitarrasRes.json(),
    postsRes.json(),
    cursoRes.json()
  ])

  return {
    props: {
      guitarras,
      posts,
      curso
    }
  }
}
