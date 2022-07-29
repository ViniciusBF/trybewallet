import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, array } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">{ ` ${email}` }</span>
          </p>
          <p>
            { 'Despesa Total: R$ ' }
            <span data-testid="total-field">
              {
                expenses[0]
                  ? expenses.reduce((acc, curr) => (
                    (Number(curr.value) * curr.exchangeRates[curr.currency].ask + acc)
                  ), 0).toFixed(2)
                  : 0
              }
            </span>
            <span data-testid="header-currency-field">{ ' BRL' }</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  expenses: array,
}.isRequired;

export default connect(mapStateToProps)(Header);
