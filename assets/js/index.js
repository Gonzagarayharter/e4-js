//Capturamos los elementos del HTML para manipularlos
const form = document.getElementById("form");
const pokemonInput = document.querySelector(".search-input");

//Contenedor donde vamos a renderizar info
const cardContainer = document.querySelector(".card-container");

//Modificar el mensaje al usuario
const searchMsg = document.querySelector(".search-msg");

// FUNCIONES AUXILIARES

const isEmptyInput = () => {
  return pokemonInput.value.trim() === "";
};

const isInvalidPokemon = (pokemonData) => {
  return !pokemonData.id;
};

const renderPokemonCard = (pokemonData) => {
  cardContainer.innerHTML = createPokemonTemplate(pokemonData);
};

const changeSearchMsg = (pokemonData) => {
  const pokemonName = pokemonData.name;
  searchMsg.innerHTML = `
    Aquí tienes el resultado de tu número ${pokemonInput.value} que es el pokémon ${pokemonName}
    `;
};

//Funcion para generar el HTML de los tipos de pokemons
const createTypeCards = (types) => {
    return types.map((tipo) => {
        return `
        <span class="${tipo.type.name}">${tipo.type.name}</span>
        `
    })
    .join("");
};

//Funcion para hacer el llamado a la API y retornar la data necesaria
const getPokemonData = (pokemonData) => {
  return {
    pokemonName: pokemonData.name.toUpperCase(),
    image: pokemonData.sprites.other.home.front_default,
    typesInfo: pokemonData.types,
    experience: pokemonData.base_experience,
    pokemonHeight: pokemonData.height / 10,
    pokemonWeight: pokemonData.weight / 10,
  };
};

const createPokemonTemplate = (pokemonData) => {
  const {
    pokemonName,
    image,
    typesInfo,
    experience,
    pokemonHeight,
    pokemonWeight,
  } = getPokemonData(pokemonData);

  return `
  <div class="pokemon-card animate">
            <div class="pokemon-img">
              <img
                src="${image}"
                alt="${pokemonName}"
              />
            </div>
            <div class="pokemon-info">
              <div class="pokemon-title">
                <h1>${pokemonName}</h1>
              </div>
              <span>Exp: ${experience}</span>
              <div class="pokemon-type">${createTypeCards(typesInfo)}</div>
              <div class="pokemon-stats">
                <p>Altura: ${pokemonHeight}M</p>
                <p>Peso: ${pokemonWeight}Kg</p>
              </div>
            </div>
          </div>
    `;
};

// FUNCION ASINCRONA PARA MANIPULAR EL FORM
const searchPokemon = async (e) => {
  e.preventDefault();

  //Si el input esta vacio, mostramos un alert y cortamos la ejecucion
  if (isEmptyInput()) {
    alert("Por favor, ingrese un número");
    return;
  }

  //Si el input no esta vacio, buscamos el pokemon
  const fetchedPokemon = await requestPokeAPI(pokemonInput.value);
//   console.log(fetchedPokemon);

  //Si el número de pokemon no es valida, lanzamos un alert, limpiamos el form y cortamos la ejecucion
  if (isInvalidPokemon(fetchedPokemon)) {
    alert("No existe ningún pokémon con el número ingresado");
    form.reset();
    return;
  }

  //Si el pokemon existe, renderizamos la card del pokemon y reseteamos el form
  renderPokemonCard(fetchedPokemon);

  //Cambiamos el mensaje
  changeSearchMsg(fetchedPokemon);
  form.reset();
};

//Funcion inicializadora de la app
const init = () => {
  form.addEventListener("submit", searchPokemon);
};

init();
