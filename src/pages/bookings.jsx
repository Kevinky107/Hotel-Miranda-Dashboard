import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { PageContainer } from '../components/pageStyled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons, TableRoomImg, 
  TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer, 
  ViewMore, TableButton, TablePageButtons, TablePageButton, Notes,
  BookingStatus,
  TableBookingImg} from '../components/tableStyled';
import bookings from '../assets/bookings.json'
import { TbEyePlus } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


function Bookings() {

  const themeSelector = useContext(ThemeContext)
  const pageSize = 10

  const createPagination = (array, size) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState(0)
  const [list, setList] = useState(bookings)
  const [bookingPages, setBookingPages] = useState(createPagination(list, pageSize))
  const [page, setPage] = useState(0)

  const allbookings = () => {
    setOption(0)
    setPage(0)
    setList(bookings)
    setBookingPages(createPagination(bookings, pageSize))
  }

  const inbookings = () => {
    const aux = bookings.filter((booking) => booking.status === "check in")
    setOption(1)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  const outbookings = () => {
    const aux = bookings.filter((booking) => booking.status === "check out")
    setOption(2)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  const progressbookings = () => {
    const aux = bookings.filter((booking) => booking.status === "in progress")
    setOption(3)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  return (
    <PageContainer>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allbookings}>All bookings</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={inbookings}>Check In</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={outbookings}>Check Out</TableOption>
          <TableOption type={option === 3 ? 'selected' : ""} onClick={progressbookings}>In Progress</TableOption>
        </TableSelect>
      </TableHeader>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Guest</ColumnTitle>
            <ColumnTitle>Order Date</ColumnTitle>
            <ColumnTitle>Check In</ColumnTitle>
            <ColumnTitle>Check Out</ColumnTitle>
            <ColumnTitle>Special Request</ColumnTitle>
            <ColumnTitle>Room Type</ColumnTitle>
            <ColumnTitle>Status</ColumnTitle>
          </Row>
          {
            bookingPages[page].map((booking, index) => 
              <Row key={index}>
                <Column>
                  <TableFlexContainer>
                    <TableBookingImg src={booking.picture} />
                    <TableElementIdentificator>
                      <TableElementName>{booking.guest}</TableElementName>
                      <TableElementId>#{booking.id}</TableElementId>
                    </TableElementIdentificator>
                  </TableFlexContainer>
                </Column>
                <Column >{booking.orderdate}</Column>
                <Column >{booking.checkin}</Column>
                <Column >{booking.checkout}</Column>
                {booking.note !== null ? 
                  <Column><Notes theme={themeSelector} >View Notes</Notes></Column> : 
                  <Column><Notes theme={themeSelector} disabled>View Notes</Notes></Column>
                }
                <Column>{booking.roomtype}</Column>
                <Column>
                  <BookingStatus status={booking.status}>
                    {booking.status}
                  </BookingStatus>
                </Column>
                <Column><TbEyePlus /><FaRegEdit /><MdDeleteOutline /></Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <TableFooter>
        <TablePages>
          <h4>Showing {pageSize * (page) + bookingPages[page].length} of {list.length}</h4>
        </TablePages>
        <TableButtons>
          <TableButton theme={themeSelector} onClick={() => page > 0 && setPage(page-1)}>Prev</TableButton>
          <TablePageButtons theme={themeSelector}>
          {
            bookingPages.map((array, index) =>
              (index === page || index >= page-2 && index <= page+2 ) && <TablePageButton type={page === index ? 'selected' : 'none'} theme={themeSelector} key={index} onClick={() => setPage(index)}>{index+1}</TablePageButton> 
            )
          }
          </TablePageButtons>
          <TableButton theme={themeSelector} onClick={() => page+1 < bookingPages.length && setPage(page+1)}>Next</TableButton>
        </TableButtons>
      </TableFooter>
    </PageContainer>
  )
}

export default Bookings