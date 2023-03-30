import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Deve testar se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const encountered = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(encountered).toBeInTheDocument();
  });
  it('Deve testar se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(nextPokemonButton);

    const pokemonCharmander = screen.getByText('Charmander');
    expect(pokemonCharmander).toBeInTheDocument();

    let index = 0;
    do {
      userEvent.click(nextPokemonButton);
      index += 1;
    } while (index !== 7);

    const pokemonUltimo = screen.getByTestId(/pokemon-name/i);
    expect(pokemonUltimo).toHaveTextContent('Dragonair');

    userEvent.click(nextPokemonButton);

    const pokemonPrimeiro = screen.getByTestId(/pokemon-name/i);
    expect(pokemonPrimeiro).toHaveTextContent('Pikachu');

    expect(nextPokemonButton.innerHTML).toBe('Próximo Pokémon');
  });

  it('Deve testar se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const buttonTypes = screen.getAllByTestId(/pokemon-type-button/i);
    expect(buttonTypes).toHaveLength(7);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonTypes[1]);

    const pokemonPrimeiro = screen.getByTestId(/pokemon-name/i);
    expect(pokemonPrimeiro).toHaveTextContent('Charmander');
    expect(buttonAll).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(nextButton);

    const proximoPokemon = screen.getByTestId(/pokemon-name/i);
    expect(proximoPokemon).toHaveTextContent('Rapidash');
    expect(buttonAll).toBeInTheDocument();
  });

  it('Deve testar se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(nextButton);

    const nextPokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(nextPokemon).toHaveLength(1);
  });

  it('Deve testar se se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonReset = screen.getByRole('button', { name: /All/i });
    expect(buttonReset).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    let index = 0;
    do {
      userEvent.click(nextButton);
      index += 1;
      const pokemon = screen.getByTestId(/pokemon-name/i);
      expect(pokemon).toBeInTheDocument();
    } while (index !== 8);

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(buttonDragon);

    const dragonType = screen.getByTestId('pokemon-type');
    expect(dragonType).toHaveTextContent('Dragon');

    userEvent.click(buttonReset);

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');
  });
});
