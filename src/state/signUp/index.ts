import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  formStage: 1,
  registration: "",
  accountInfo: "",
  otpConfirmation: "",
  amazonFlexInfo: "",
  finish: "",
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    formStage: (state, action) => {
      state.formStage = action.payload
    },
    registration: (state, action) => {
      state.registration = action.payload
    },
    accountInfo: (state, action) => {
      state.accountInfo = action.payload
    },
    otpConfirmation: (state, action) => {
      state.otpConfirmation = action.payload
    },
    amazonFlexInfo: (state, action) => {
      state.amazonFlexInfo = action.payload
    },
    finish: (state, action) => {
      state.finish = action.payload
    },
  },
})

export const {
  formStage,
  registration,
  accountInfo,
  otpConfirmation,
  amazonFlexInfo,
  finish,
} = signUpSlice.actions

export const signUpReducer = signUpSlice.reducer
