import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpensesAction, walletAction } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpenses, toEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses[0] && (
              expenses.map((e) => {
                const nAsk = Number(e.exchangeRates[e.currency].ask);
                const nValue = Number(e.value);
                const n = nValue * nAsk;
                return (
                  <tr key={ e.id }>
                    <td>{ e.description }</td>
                    <td>{ e.tag }</td>
                    <td>{ e.method }</td>
                    <td>{ nValue.toFixed(2) }</td>
                    <td>{ e.exchangeRates[e.currency].name }</td>
                    <td>{ nAsk.toFixed(2) }</td>
                    <td>{ n.toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => toEdit({ editor: true, idToEdit: e.id }) }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => deleteExpenses(e.id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            )
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (state) => dispatch(deleteExpensesAction(state)),
  toEdit: (state) => dispatch(walletAction(state)),
});

Table.propTypes = {
  expenses: array,
  deleteExpenses: func,
  toEdit: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
