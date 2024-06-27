import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { RoomContainer } from '../../components/room-styled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, TableBody, TableHeader, TableFooter, TablePages, TableButtons, TableRoomImg, TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer } from '../../components/table-styled';
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

  const [option, setOption] = useState(0)
  const [list, setList] = useState(rooms)
  const [roomPages, setRoomPages] = useState(createPagination(list, pageSize))
  const [page, setPage] = useState(0)

  const allRooms = () => {
    setOption(0)
    setPage(0)
    setList(rooms)
    setRoomPages(createPagination(rooms, pageSize))
  }

  const availableRooms = () => {
    const aux = rooms.filter((room) => room.available)
    setOption(1)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  const bookedRooms = () => {
    const aux = rooms.filter((room) => !room.available)
    setOption(2)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  return (
    <RoomContainer>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allRooms}>All Rooms</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={availableRooms}>Available Rooms</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={bookedRooms}>Booked Rooms</TableOption>
        </TableSelect>
        <GreenButton theme="dark">+ New Room</GreenButton>
      </TableHeader>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Room Name</ColumnTitle>
            <ColumnTitle>Type</ColumnTitle>
            <ColumnTitle>Amenities</ColumnTitle>
            <ColumnTitle>Price</ColumnTitle>
            <ColumnTitle>Offer</ColumnTitle>
            <ColumnTitle>Status</ColumnTitle>
          </Row>
          {
            roomPages[page].map((room, index) => 
              <Row key={index}>
                <Column>
                  <TableFlexContainer>
                    <TableRoomImg src={room.images[0]} />
                    <TableElementIdentificator>
                      <TableElementId>#{room.id}</TableElementId>
                      <TableElementName>{room.name}</TableElementName>
                    </TableElementIdentificator>
                  </TableFlexContainer>
                </Column>
                <Column>{room.type}</Column>
                <Column>{room.amenities}</Column>
                <Column>${room.price}/Night</Column>
                <Column>${room.offer}/Night</Column>
                <Column>{room.available ? "Available" : "Booked"}</Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <TableFooter>
        <TablePages>
          <h4>Showing {pageSize * (page) + roomPages[page].length} of {list.length}</h4>
        </TablePages>
        <TableButtons>
          <button onClick={() => page > 0 && setPage(page-1)}>Prev</button>
          {
            roomPages.map((array, index) =>
              (index === page || index >= page-2 && index <= page+2 ) && <button key={index} onClick={() => setPage(index)}>{index+1}</button> 
            )
          }
          <button onClick={() => page+1 < roomPages.length && setPage(page+1)}>Next</button>
        </TableButtons>
      </TableFooter>
    </RoomContainer>
  )
}

export default Room