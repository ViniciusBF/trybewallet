import React, { Component } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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

Table.propTypes = {
  expenses: array,
}.isRequired;

export default connect(mapStateToProps)(Table);
