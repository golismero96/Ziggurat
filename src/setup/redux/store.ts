import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './RootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
