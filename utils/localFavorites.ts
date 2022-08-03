/* eslint-disable import/no-anonymous-default-export */

export const toggleFavorites = (id: number) => {
  let listFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
  
  if(listFavorites.includes(id)) {
    listFavorites = listFavorites.filter(pokeId => pokeId !== id)
    localStorage.setItem('favorites', JSON.stringify(listFavorites))
    return
  }

  listFavorites.push(id)
  localStorage.setItem('favorites', JSON.stringify(listFavorites))
}

export const existPokemonInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false

  const listFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
  return listFavorites.includes(id)
}

export const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}
