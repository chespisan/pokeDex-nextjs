import { ParsedUrlQuery } from "querystring"
import { pokeApi } from "../services";
import { Pokemon } from "../services/interfaces/pokemonFull";

type typeParams = 'id' | 'name'

export const getPokemonInfo = async (nameOrId: string) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`)

   return {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }
}