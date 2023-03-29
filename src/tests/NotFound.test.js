import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found', level: 2 },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    renderWithRouter(<NotFound />);

    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
