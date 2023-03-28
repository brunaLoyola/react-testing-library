import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('Deve testar se o primeiro link possui o texto Home e se quando ocorrer um click no link Home, a aplicação é redirecionada para a página inicial, na URL / ', () => {
    const { history } = renderWithRouter(<App />);

    const HomeLink = screen.getByRole('link', { name: 'Home' });
    expect(HomeLink).toBeInTheDocument();

    userEvent.click(HomeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Deve testar se o segundo link possui o texto About e se quando ocorrer um click no link About, a aplicação é redirecionada para a página de About, na URL /about ', () => {
    const { history } = renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', { name: 'About' });
    expect(AboutLink).toBeInTheDocument();

    userEvent.click(AboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Deve testar se o terceiro link possui o texto Favorite Pokémon e se quando ocorrer um click no link Favorite Pokémon, a aplicação é redirecionada para a página inicial, na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const FavoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(FavoritesLink).toBeInTheDocument();

    userEvent.click(FavoritesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Deve testar um caminho não existente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });
});
