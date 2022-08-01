import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando componente App', () => {
  test('Se os campos de input estão presentes na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  })

  test('Se a pagina é redirecionada', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'testando@testando.com');
    userEvent.type(inputPassword, '123465');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  })

  test('Se a pagina não é redirecionada', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'testando@testando');
    userEvent.type(inputPassword, '123');
    expect(btn).toBeDisabled();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
})