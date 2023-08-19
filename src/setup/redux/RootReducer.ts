import { combineReducers } from 'redux';

import counterReducer from '../../redux/crypto/counter/counterSlice';

export const rootReducer = combineReducers({
  counter: counterReducer.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
