import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../features/room/roomSlice";
import { bookingSlice } from "../features/booking/bookingSlice";
import { contactSlice } from "../features/contact/contactSlice";
import { userSlice } from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        booking: bookingSlice.reducer,
        contact: contactSlice.reducer,
        user: userSlice.reducer,
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']