import { combineReducers } from 'redux';

import counterReducer from 'src/redux/crypto/counter/counterSlice';
import { counterActions } from 'src/rtk-query/crypto/counter/counterActions';

export const rootReducer = combineReducers({
  counter: counterReducer.reducer,
  [counterActions.reducerPath]: counterActions.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
