import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Deve testar se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavorite);
    const notFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(notFavorite).toBeInTheDocument();
  });
  it('Deve testar seTeste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'All' });
    userEvent.click(button);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritesLink);
    const favorite = screen.getByText(/Pikachu/i);
    expect(favorite).toBeInTheDocument();
  });
});
