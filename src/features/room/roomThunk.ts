import { createAsyncThunk } from "@reduxjs/toolkit"
import { Room } from "../../types";
import { backendAPIcall } from "../backendAPIcall";

export const getRoomListThunk = createAsyncThunk("room/getRoomList", async() => {
    try {
        const Room: Room[] = await backendAPIcall("/Rooms");
        return Room;
    } catch (error) {
        throw new Error();
    }
})

export const getRoomThunk = createAsyncThunk("room/getRoom", async(id: string) => {
    try {
        const room: Room = await backendAPIcall(`/Rooms/${id}`);
        return room;
    } catch (error) {
        throw new Error();
    }
})

export const removeRoomThunk = createAsyncThunk("room/removeRoom", async(id: string) => {
    try {
        const room: Room = await backendAPIcall(`/Rooms/delete/${id}`, "DELETE");
        return room;
    } catch (error) {
        throw new Error();
    }
})

export const addroomThunk = createAsyncThunk("room/addRoom", async(roomData: Partial<Room>) => {
    try {
        const Room: Room = await backendAPIcall(`/Rooms/add`, "POST", roomData);
        return Room;
    } catch (error) {
        throw new Error();
    }
})

export const updateRoomThunk = createAsyncThunk("room/updateRoom", async(roomData: Room) => {
    try {
        const room: Room = await backendAPIcall(`/Rooms/update/${roomData._id}`, "PUT", roomData);
        return room;
    } catch (error) {
        throw new Error();
    }
})