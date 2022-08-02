import React, { Component } from 'react';
import { func, array, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import { fetchValues, saveExpensesAction, editExpensesAction } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      verify: true,
    };
  }

  componentDidMount() {
    const { fetchfunc } = this.props;
    fetchfunc();
  }

  static getDerivedStateFromProps(props, state) {
    const { expenses, idEdit, edit } = props;
    if (edit && state.verify) {
      const { value, description, currency, method, tag } = expenses
        .find(({ id }) => id === idEdit);
      return {
        value,
        description,
        currency,
        method,
        tag,
        verify: false,
      };
    }
    return null;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { saveExpenses, edit } = this.props;
    if (edit) {
      this.handleEdit();
      return;
    }
    const { id, value, description, currency, method, tag } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    saveExpenses({ id, value, description, currency, method, tag, exchangeRates: data });
    this.setState((prev) => ({ value: '', description: '', id: prev.id + 1 }));
  }

  handleEdit = () => {
    const { expenses, idEdit, editExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const state = { value, description, currency, method, tag };
    const obj = expenses.find(({ id }) => id === idEdit);
    const newObj = { ...obj, ...state };
    const result = expenses.map((e) => (e.id === newObj.id ? newObj : e));
    editExpenses(result);
    this.setState({ verify: true, value: '', description: '' });
  }

  renderForm = ({ value, description, currency, method, tag, currencies, edit }) => (
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
        {
          edit
            ? 'Editar despesa'
            : 'Adicionar despesa'
        }
      </button>
    </form>
  )

  render() {
    const { currencies, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return this.renderForm({
      value,
      description,
      currency,
      method,
      tag,
      currencies,
      edit,
    });
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  edit: state.wallet.editor,
  idEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchfunc: () => dispatch(fetchValues()),
  saveExpenses: (state) => dispatch(saveExpensesAction(state)),
  editExpenses: (state) => dispatch(editExpensesAction(state)),
});

WalletForm.propTypes = {
  fetchfunc: func,
  saveExpenses: func,
  editExpenses: func,
  currencies: array,
  edit: bool,
  idEdit: number,
  expenses: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
