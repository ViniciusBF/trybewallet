import { WALLET_ACTION, SAVE_EXPENSES, DELETE_EXPENSES } from '../actions';

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
      ...state,
      ...action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
