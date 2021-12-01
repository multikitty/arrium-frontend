import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { signUpReducer } from "./signUp"

const rootReducer = combineReducers({
  signUp: signUpReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch

export default store
