import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../features/room/roomSlice";
import { bookingSlice } from "../features/booking/bookingSlice";
import { contactSlice } from "../features/contact/contactSlice";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        booking: bookingSlice.reducer,
        contact: contactSlice.reducer,
    }
})