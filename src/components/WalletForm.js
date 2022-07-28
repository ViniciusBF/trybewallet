import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { fetchValues } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchfunc } = this.props;
    fetchfunc();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input data-testid="value-input" id="valor" type="text" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select id="currency-input" data-testid="currency-input">
            {
              currencies.map((e, i) => (
                <option key={ i } value={ e }>{ e }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select id="method-input" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select id="tag-input" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input data-testid="description-input" id="description" type="text" />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchfunc: () => dispatch(fetchValues()),
});

WalletForm.propTypes = {
  fetchfunc: func,
  currencies: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
