import { FC } from 'react'
import { useRouter } from 'next/router'
import { Grid, Card } from '@nextui-org/react'

interface IPokemonId {
  id: number
}

export const FavoriteCardPokemon: FC<IPokemonId> = ({ id }) => {
  const router = useRouter()

  const handleFavoriteClicked = (): void => {
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} onClick={handleFavoriteClicked}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          height={140}
          width={'100%'}
        />
      </Card>
    </Grid>
  )
}

