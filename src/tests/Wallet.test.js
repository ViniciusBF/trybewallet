import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando componente App', () => {
  test('Se os campos de input estão presentes na tela', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const inValue = screen.getByLabelText('Valor:');
    const inMoeda = screen.getByLabelText('Moeda:');
    const inMetodo = screen.getByLabelText('Método de pagamento:');
    const inCategoria = screen.getByLabelText('Categoria:');
    const inDescricao = screen.getByLabelText('Descrição:');
    const btn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(inValue).toBeInTheDocument();
    expect(inMoeda).toBeInTheDocument();
    expect(inMetodo).toBeInTheDocument();
    expect(inCategoria).toBeInTheDocument();
    expect(inDescricao).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inValue, '11');
    expect(inValue).toHaveValue('11');
    userEvent.type(inDescricao, 'Bolo');
    expect(inDescricao).toHaveValue('Bolo');
  })

  test('Se os campos de input estão presentes na tela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    const inValue = screen.getByLabelText('Valor:');
    const inMoeda = screen.getByLabelText('Moeda:');
    const inMetodo = screen.getByLabelText('Método de pagamento:');
    const inCategoria = screen.getByLabelText('Categoria:');
    const inDescricao = screen.getByLabelText('Descrição:');
    const btn = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(inValue, '11');
    userEvent.type(inDescricao, 'Bolo');
    userEvent.click(btn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const value = screen.getByTestId('total-field');
    expect(value.innerHTML).toBe('52.28');
  })
})