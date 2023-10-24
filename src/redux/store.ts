import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./states/auth";
import { userSlice } from "./states/user";
import { taskSlice } from "./states/task";

export const reduxStore = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        userReducer: userSlice.reducer,
        taskReducer: taskSlice.reducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch