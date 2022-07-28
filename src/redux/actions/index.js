const WALLET_ACTION = 'WALLET_ACTION';
const USER_ACTION = 'USER_ACTION';

const walletAction = (payload) => ({ type: WALLET_ACTION, payload });
const userAction = (payload) => ({ type: USER_ACTION, payload });

export { walletAction, userAction, WALLET_ACTION, USER_ACTION };
