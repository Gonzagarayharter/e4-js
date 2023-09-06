//Llamada a la PokeAPI
const requestPokeAPI = async (pokemon) => {
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await resp.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};