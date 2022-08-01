import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchValues, saveExpensesAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchfunc } = this.props;
    fetchfunc();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { saveExpenses } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    saveExpenses({ id, value, description, currency, method, tag, exchangeRates: data });
    this.setState((prev) => ({ value: '', description: '', id: prev.id + 1 }));
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            data-testid="value-input"
            id="valor"
            type="text"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            id="currency-input"
            data-testid="currency-input"
          >
            {
              currencies.map((e, i) => (
                <option key={ i } value={ e }>{ e }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            onChange={ this.handleChange }
            value={ method }
            name="method"
            id="method-input"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            id="tag-input"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            onChange={ this.handleChange }
            value={ description }
            data-testid="description-input"
            id="description"
            type="text"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchfunc: () => dispatch(fetchValues()),
  saveExpenses: (state) => dispatch(saveExpensesAction(state)),
});

WalletForm.propTypes = {
  fetchfunc: func,
  saveExpenses: func,
  currencies: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
