import NextLink from 'next/link'
import { Image, Link, Spacer, Text, useTheme } from '@nextui-org/react'

import styles from './Navbar.module.css'

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <div
      className={styles['container-navbar']}
      style={{ backgroundColor: theme?.colors.gray100.value }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="Icono de la App"
        height={70}
        width={70}
      />

      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon
          </Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      
      <NextLink href='/favorites' passHref>
        <Link>
          <Text color="white" h3>
            Favoritos
          </Text>
        </Link>
      </NextLink>
      


    </div>
  )
}
