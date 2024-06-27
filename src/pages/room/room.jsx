import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { RoomContainer } from '../../components/room-styled';
import { Column, ColumnTitle, Row, Table, TableBody } from '../../components/table-styled';
import rooms from '../../assets/rooms.json'
import { GreenButton } from '../../components/button-styled';

function Room() {

  const themeSelector = useContext(ThemeContext)
  const pageSize = 10

  const createPagination = (array, size) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [list, setList] = useState(rooms)
  const [roomPages, setRoomPages] = useState(createPagination(list, pageSize))
  const [page, setPage] = useState(0)

  const allRooms = () => {
    setPage(0)
    setList(rooms)
    setRoomPages(createPagination(rooms, pageSize))
  }

  const availableRooms = () => {
    const aux = rooms.filter((room) => room.available)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  const bookedRooms = () => {
    const aux = rooms.filter((room) => !room.available)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  return (
    <RoomContainer>
      <div>
        <h2 onClick={allRooms}>All Rooms</h2>
        <h2 onClick={availableRooms}>Available Rooms</h2>
        <h2 onClick={bookedRooms}>Booked Rooms</h2>
      </div>
      <GreenButton theme="dark">+ New Room</GreenButton>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Room Name</ColumnTitle>
            <ColumnTitle>Bed Type</ColumnTitle>
            <ColumnTitle>Amenities</ColumnTitle>
            <ColumnTitle>Price</ColumnTitle>
            <ColumnTitle>Offer</ColumnTitle>
            <ColumnTitle>Status</ColumnTitle>
          </Row>
          {
            roomPages[page].map((room, index) => 
              <Row key={index}>
                <Column>#{room.id}</Column>
                <Column>{room.roomtype}</Column>
                <Column>{room.Amenities}</Column>
                <Column>${room.price}/Night</Column>
                <Column>${room.offer}/Night</Column>
                <Column>{room.available ? "Available" : "Booked"}</Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <div>
        <h4>Showing {pageSize * (page) + roomPages[page].length} of {list.length}</h4>
      </div>
      <div>
        <button onClick={() => page > 0 && setPage(page-1)}>Prev</button>
        {
          roomPages.map((array, index) =>
            (index === page || index >= page-2 && index <= page+2 ) && <button key={index} onClick={() => setPage(index)}>{index+1}</button> 
          )
        }
        <button onClick={() => page+1 < roomPages.length && setPage(page+1)}>Next</button>
      </div>
    </RoomContainer>
  )
}

export default Room