const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const atk = document.getElementById('attack');
const def = document.getElementById('defense');
const spAtk = document.getElementById('special-attack');
const spDef = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


// API GET Request
const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();

    // Set Pokémon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id='sprite' src='${data.sprites.front_default}'' alt='${data.name} front default sprite'>
    `;

    // For Setting Pokémon Stats
    hp.textContent = data.stats[0].base_stat;
    atk.textContent = data.stats[1].base_stat;
    def.textContent = data.stats[2].base_stat;
    spAtk.textContent = data.stats[3].base_stat;
    spDef.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // For Setting Pokémon Types
    types.innerHTML = data.types
      .map(obj => `<span class='type ${obj.type.name}'>${obj.type.name}</span>`)
      .join('');
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};


// Reset Stats Display Function
const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  // Stats Reset
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  atk.textContent = '';
  def.textContent = '';
  spAtk.textContent = '';
  spDef.textContent = '';
  speed.textContent = '';
};


// Submit Search From Event Listener
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
});


// Light/Dark Mode Toggle
const toggleMode = () => {
  var body = document.body;
  body.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

// Check for saved user preference, if any, on initial load
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌜';
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌞';
    }

// Add event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            // input.classList.remove('light-mode');
            // input.classList.add('dark-mode');
            themeToggle.textContent = '🌜';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            // input.classList.remove('dark-mode');
            // input.classList.add('light-mode');
            themeToggle.textContent = '🌞';
            localStorage.setItem('theme', 'light');
        }
    });
});


// Set the initial mode based on user preference:
window.onload = function() {
  var body = document.body;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
  } else {
    body.classList.add('light-mode');
  }
}
// End Light/Dark Mode Toggle
