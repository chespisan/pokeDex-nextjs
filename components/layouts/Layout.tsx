import Head from "next/head"
import { FC } from "react"

import { ILayout } from "../interfaces/layout"
import { Navbar } from '../ui/navbar'

import styles from './Layout.module.css';

const originPath = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<ILayout> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App' }</title>
        <meta name="author" content="Sergio Sanchez" />
        <meta name="description" content="Informacion sobre el pokemon XXXXXX" />
        <meta name="keywords" content="XXXX, pokemon, pokedex" />

        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
        <meta property="og:image" content={`${originPath}/img/banner.png`} />
      </Head>

      <Navbar />

      <main className={styles['main']}>
        { children  }
      </main>
    </>
  )
}
