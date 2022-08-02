const WALLET_ACTION = 'WALLET_ACTION';
const USER_ACTION = 'USER_ACTION';
const SAVE_EXPENSES = 'SAVE_EXPENSES';
const DELETE_EXPENSES = 'DELETE_EXPENSES';

const walletAction = (payload) => ({ type: WALLET_ACTION, payload });
const userAction = (payload) => ({ type: USER_ACTION, payload });
const saveExpensesAction = (payload) => ({ type: SAVE_EXPENSES, payload });
const deleteExpensesAction = (payload) => ({ type: DELETE_EXPENSES, payload });

const fetchValues = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const newData = Object.entries(data).filter((e) => e[0] !== 'USDT');
  const currencies = newData.map((e) => e[0]);
  dispatch(walletAction({ currencies }));
};

export {
  walletAction,
  userAction,
  saveExpensesAction,
  fetchValues,
  deleteExpensesAction,
  WALLET_ACTION,
  USER_ACTION,
  SAVE_EXPENSES,
  DELETE_EXPENSES,
};
