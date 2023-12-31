import { USER_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_ACTION:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default user;
