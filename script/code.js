let PokemonName = document.querySelector('#pokemonNome');
let PokemonId = document.querySelector('#pokemonId');
let PokemonImage = document.querySelector('#pokemonImage');
let input = document.querySelector('#busca');
let form = document.querySelector('.formulario');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //buscando os dados da API

    if (APIResponse.status != 200) {
        PokemonName.innerHTML = 'Not Found :('
        PokemonId.innerHTML = ''
        PokemonImage.src = ''
    }
    const data = await APIResponse.json();//transformando os dados buscados em um Json
    return data;
}

const renderPokemon = async (pokemon) => {
    PokemonName.innerHTML = 'Loading...'
    PokemonId.innerHTML = ''
    PokemonImage.src = ''

    const data = await fetchPokemon(pokemon)
    if (data) {
        PokemonName.innerHTML = data.name
        PokemonId.innerHTML = data.id
        PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = ''
})

renderPokemon('1')


