import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './RootReducer';

import { counterActions } from 'src/rtk-query/crypto/counter/counterActions';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterActions.middleware)
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
