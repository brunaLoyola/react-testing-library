import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />', () => {
  it('Deve testar se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutText).toBeInTheDocument();
  });
  it('Deve testar se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const paragrafo01 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const paragrafo02 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(paragrafo01).toBeInTheDocument();
    expect(paragrafo02).toBeInTheDocument();
  });
  it('Deve testar se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
