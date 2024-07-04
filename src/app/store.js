import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../features/room/roomSlice";
import { bookingSlice } from "../features/booking/bookingSlice";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        booking: bookingSlice.reducer,
    }
})