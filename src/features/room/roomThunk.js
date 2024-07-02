import { createAsyncThunk } from "@reduxjs/toolkit"
import rooms from '../../assets/rooms.json'

export const getRoomListThunk = createAsyncThunk("room/getRoomList", async() => {
    const myRoomListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (rooms.length > 0) {
                resolve(rooms);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myRoomListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getRoomThunk = createAsyncThunk("room/getRoom", async(id) => {
    const myRoomListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let roomObject = {}
            rooms.map((room, index) => {
                if(room.id === id)
                    roomObject = room
            })
            if (Object.keys(roomObject).length !== 0) {
                resolve(roomObject);
            } else {
                reject(`Room Not Found `);
            }
        }, 200);
    });

    return myRoomListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})