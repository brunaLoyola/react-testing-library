import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Deve testar se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const ImgPokemon = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(ImgPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Deve testar se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
  });

  it('Deve testar se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon, também se a URL exibida no navegador muda', () => {
    const navigation = renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const { history: { location } } = navigation;
    expect(location.pathname).toBe('/pokemon/25');
  });

  it('Deve testar se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const isFavoritePokemon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(isFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
    expect(isFavoritePokemon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
