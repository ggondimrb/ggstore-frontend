import { all } from 'redux-saga/effects';

import cart from './cart/sagas';
import auth from './auth/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([cart, auth, user]);
}
