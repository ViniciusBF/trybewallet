import { WALLET_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
