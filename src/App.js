import React, { Component } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import Pokemon from './components/Pokemon'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [],
      singlePokemon: {},
      pokemonId: 1,
      listLimit: 50,
    }

    this.getPokemonList = this.getPokemonList.bind(this)
    this.getSinglePokemon = this.getSinglePokemon.bind(this)
    this.handlePokemonIdChange = this.handlePokemonIdChange.bind(this)
    this.handlePokemonListLimitChange = this.handlePokemonListLimitChange.bind(
      this
    )
  }

  componentDidMount() {
    this.getPokemonList()
  }

  getPokemonList(e) {
    e && e.preventDefault()
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.listLimit}`).then(res => { //this indicates we're making a 'Get' request to the server side; THEN, when it's done, do this; then takes a cb function
      //console.log(res.data.results) first thing you want to do when calling a response is console log it so you can see the data that is returned and properly dig into it
      this.setState ({
        pokemonList: res.data.results
    }) })
  }

  getSinglePokemon(e) {
    e && e.preventDefault()
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonId}`)
    .then((res) => { //when a request is denied on the server side, the 'then' doesn't happen & we 'catch' it
      // console.log(res.data)
      this.setState ({
        singlePokemon: res.data
      })
    })
    .catch((err) => {
      alert('Pokemon does not exist')
    })
  }

  handlePokemonIdChange(e) {
    this.setState({
      pokemonId: e.target.value,
    })
  }

  handlePokemonListLimitChange(e) {
    this.setState({
      listLimit: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.getSinglePokemon}>
            <h2>Find a specific Pokemon</h2>
            <input
              onChange={this.handlePokemonIdChange}
              placeholder="Pokemon name or number"
            />
            <button>Search</button>
          </form>
          <form onSubmit={this.getPokemonList}>
            <h2>Get the list</h2>
            <input
              placeholder="How many pokemon"
              type="number"
              min="1"
              max="100"
              onChange={this.handlePokemonListLimitChange}
            />
            <button>Search</button>
          </form>
        </header>

        <div className="content">
          <Pokemon pokemon={this.state.singlePokemon} />
          <PokemonList pokemonList={this.state.pokemonList} />
        </div>
      </div>
    )
  }
}
export default App
