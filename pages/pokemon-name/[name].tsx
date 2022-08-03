import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useState, useEffect } from 'react'
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../services/interfaces/pokemonFull'
import { existPokemonInFavorites, getPokemonInfo, toggleFavorites } from '../../utils'
import { pokeApi } from '../../services'
import { PokemonListResponse } from '../../services/interfaces/pokemonList'


interface Props {
  pokemon: Pokemon
}


const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsFavorites] = useState(false)

  const handleToogleFavorites = () => {
    toggleFavorites(pokemon.id)
    setIsFavorites(!isInFavorites)

    if(!isInFavorites) {
      confetti({
        angle: -100,
        origin: {
          x: 1,
          y: 0
        },
        particleCount: 100,
        spread: 160,
        zIndex: 999
      })
    }
  }

  useEffect(() => {
    setIsFavorites(existPokemonInFavorites(pokemon.id))
  }, [pokemon.id]) 

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  'no-image.png'
                }
                alt={pokemon.name}
                height={200}
                width="100%"
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={handleToogleFavorites}
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// aqui generaremos los paths dinamicos, si es que lo necesitamos, para nuestras rutas dinamicas
export const getStaticPaths: GetStaticPaths = async ({ defaultLocale, locales }) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`)
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: "blocking" // false => cuando queremos que salga 404 si es una page q esta fuera de rango 
  }
}

// aqui podemos hacer request en tiempo de buildeo para que ya tengamos la data y la manejemos statica,
// la data que retornemos en este metodo le llegara por props a nuestro componente
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    }
  }
}

export default PokemonNamePage