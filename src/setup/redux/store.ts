import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './RootReducer';
import { allActionsMiddleware } from './actions';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allActionsMiddleware)
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
