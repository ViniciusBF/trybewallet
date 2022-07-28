const WALLET_ACTION = 'WALLET_ACTION';
const USER_ACTION = 'USER_ACTION';

const walletAction = (payload) => ({ type: WALLET_ACTION, payload });
const userAction = (payload) => ({ type: USER_ACTION, payload });

const fetchValues = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const newData = Object.entries(data).filter((e) => e[0] !== 'USDT');
  const currencies = newData.map((e) => e[0]);
  dispatch(walletAction({ currencies }));
};

export { walletAction, userAction, fetchValues, WALLET_ACTION, USER_ACTION };
