/* eslint-disable react/jsx-no-undef */
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { SmallPokemon } from "../../services/interfaces/pokemonList";

interface props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<props> = ({ pokemon }) => {
  const router = useRouter()

  const handleGoToPokemon = () => {
    router.push(`/pokemon-name/${pokemon.name}`)
  }

  const { id, img, name } = pokemon;
  return (
    <Grid xs={6} md={2} xl={1}>
      <Card isHoverable isPressable onClick={handleGoToPokemon}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
