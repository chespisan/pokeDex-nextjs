import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Layout } from '../../components/layouts'
import { pokeApi } from '../../services'
import { Pokemon } from '../../services/interfaces/pokemonFull'
import { existPokemonInFavorites, getPokemonInfo, toggleFavorites } from '../../utils'

import confetti from 'canvas-confetti'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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

//  cuando generamos page staticas con query dinammicos => [id].tsx
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemonList = [...Array(151)].map((_, index) => `${index + 1}`)

  return {
    paths: pokemonList.map((id) => ({
      params: { id },
    })),
    // paths: [
    //   {
    //     params: {id: '1'}
    //   },
    //   {
    //     params: {id: '2'}
    //   },
    //   {
    //     params: {id: '3'}
    //   }
    // ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }
  
  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  }
}

export default PokemonPage
