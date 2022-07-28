import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      valid: false,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validar);
  }

  validar = () => {
    const { email, password } = this.state;
    const NUMBER_VALID = 5;
    const valid1 = password.length > NUMBER_VALID;
    const valid2 = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    this.setState({ valid: [valid1, valid2].every((e) => e) });
  }

  hadleClick = async () => {
    const { saveEmail, history } = this.props;
    const { email } = this.state;
    await saveEmail({ email });
    history.push('/carteira');
  }

  render() {
    const { email, password, valid } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            value={ password }
            name="password"
            onChange={ this.handleChange }
            id="password"
          />
        </label>
        <button
          type="button"
          disabled={ !valid }
          onClick={ this.hadleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (state) => dispatch(userAction(state)),
});

Login.propTypes = {
  saveEmail: func,
  history: shape({
    push: func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
