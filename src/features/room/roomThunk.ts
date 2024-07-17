import { createAsyncThunk } from "@reduxjs/toolkit"
import rooms from '../../assets/rooms.json'
import { Room } from "../../types";

export const getRoomListThunk = createAsyncThunk("room/getRoomList", async() => {
    const myRoomListPromise = new Promise<Room[]>((resolve, reject) => {
        setTimeout(() => {
            if (rooms.length > 0) {
                resolve(rooms as Room[]);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myRoomListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getRoomThunk = createAsyncThunk("room/getRoom", async({id, list}: {id: string, list: Room[]}) => {
    const myRoomListPromise = new Promise<Room>((resolve, reject) => {
        setTimeout(() => {
            const roomObject = list.filter(room => `${room.id}` === id)
            if (roomObject.length > 0) {     
                resolve(roomObject[0])
            } else {
                reject(`Room Not Found `)
            }
        }, 200);
    });

    return myRoomListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})