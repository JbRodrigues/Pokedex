let PokemonName = document.querySelector('#pokemonNome');
let PokemonId = document.querySelector('#pokemonId');
let PokemonImage = document.querySelector('#pokemonImage');
let input = document.querySelector('#busca');
let form = document.querySelector('.formulario');
let btnPrev = document.querySelector('#btn-prev')
let btnNext = document.querySelector('#btn-next')

let Type = document.querySelector('.pokemon-types')



let btn = 0;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //buscando os dados da API

    if (APIResponse.status != 200) {
        PokemonName.innerHTML = 'Not Found :('
        PokemonId.innerHTML = ''
        PokemonImage.src = ''
    }
    const data = await APIResponse.json();//transformando os dados buscados em Json
    return data;
}

const renderPokemon = async (pokemon) => {
    PokemonName.innerHTML = 'Loading...'
    PokemonId.innerHTML = ''
    PokemonImage.src = ''
    const data = await fetchPokemon(pokemon)
    btn = data.id
    if (data) {
        PokemonName.innerHTML = data.name
        PokemonId.innerHTML = '#' + data.id
        PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        let tipos = data.types

        tipos.forEach(element => {
            var pokemonType = element.type.name
            if (tipos.length > 1) {
                Type.innerHTML += `<div class="type">${pokemonType}</div>`
                var backgroundType = document.querySelector('.type')
            } else {
                Type.innerHTML = `<div class="type">${pokemonType}</div>`
                var backgroundType = document.querySelector('.type')
            }
        });

    }
}

/*Type = `<div class="type">${pokemonType}</div>`
tipoPokemon.innerHTML = pokemonType*/

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = ''

})

renderPokemon('1')

btnPrev.addEventListener('click', (event) => {
    if (btn > 1) {
        btn = btn - 1;
        renderPokemon(btn)
        Type.innerHTML = ``
    }
})


btnNext.addEventListener('click', (event) => {
    btn = btn + 1;
    renderPokemon(btn)
    Type.innerHTML = ``
})