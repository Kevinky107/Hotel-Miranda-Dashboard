import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { RoomContainer } from '../../components/room-styled';
import { Column, ColumnTitle, Row, Table } from '../../components/table-styled';
import rooms from '../../assets/rooms.json'

function Room() {

  const themeSelector = useContext(ThemeContext)

  const [roomList, setRommList] = useState(rooms)

  return (
    <RoomContainer>
      <Table theme={themeSelector}>
        <Row>
          <ColumnTitle>Room Name</ColumnTitle>
          <ColumnTitle>Bed Type</ColumnTitle>
          <ColumnTitle>Room Floor</ColumnTitle>
          <ColumnTitle>Amenities</ColumnTitle>
          <ColumnTitle>Price</ColumnTitle>
        </Row>
        <Row>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
        </Row>
      </Table>
    </RoomContainer>
  )
}

export default Room