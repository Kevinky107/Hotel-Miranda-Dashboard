import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { RoomContainer } from '../../components/room-styled';
import { Column, ColumnTitle, Row, Table, TableBody } from '../../components/table-styled';
import rooms from '../../assets/rooms.json'

function Room() {

  const themeSelector = useContext(ThemeContext)
  const pageSize = 6

  const createPagination = (array, size) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [roomList, setRoomList] = useState(createPagination(rooms, pageSize))
  const [page, setPage] = useState(0)

  return (
    <RoomContainer>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Room Name</ColumnTitle>
            <ColumnTitle>Bed Type</ColumnTitle>
            <ColumnTitle>Room Floor</ColumnTitle>
            <ColumnTitle>Amenities</ColumnTitle>
            <ColumnTitle>Price</ColumnTitle>
          </Row>
          {
            roomList[page].map((room, index) => 
              <Row key={index}>
                <Column>{room.id}</Column>
                <Column>{room.roomtype}</Column>
                <Column>{room.name}</Column>
                <Column>{room.Amenities}</Column>
                <Column>${room.offer}/Night</Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <div>
        <h4>Showing {pageSize * (page+1)} of {rooms.length}</h4>
      </div>
      <div>
        <button onClick={() => page > 0 && setPage(page-1)}>prev</button>
        {
          roomList.map((array, index) =>
            (index === page || index >= page-2 && index <= page+2 ) && <button onClick={() => setPage(index)}>{index+1}</button> 
          )
        }
        <button onClick={() => page+1 < roomList.length && setPage(page+1)}>next</button>
      </div>
    </RoomContainer>
  )
}

export default Room