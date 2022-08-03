import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Layout } from '../../components/layouts'
import { FavoritePokemon, NoFavorites } from '../../components/pokemon'
import { pokemons } from '../../utils'

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(pokemons())
  }, [])

  return (
    <Layout title="Favoritos">
      {favoritePokemons.length ? (
        <FavoritePokemon pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </Layout>
  )
}

export default FavoritesPage
