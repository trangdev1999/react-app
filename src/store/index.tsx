import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productSlide from "../slice/product"

export const store =configureStore({
    reducer:{
        product:productSlide
    }
})

export type AppDispatch=typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
export type AppThunk<ReturnType=void>=ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>>;