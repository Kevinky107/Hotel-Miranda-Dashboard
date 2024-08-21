import { Context, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from '../../context/theme';
import { PageContainer } from '../../components/pageStyled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons, TableRoomImg, 
  TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer, 
  RoomStatus, ViewMore, Price, Number, 
  TableButton,
  TablePageButtons,
  TablePageButton,
  TableElementActions} from '../../components/tableStyled';
import { GreenButton } from '../../components/buttonStyled';
import { TbEyePlus } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { roomDataListSelector, roomDataSelector, roomErrorSelector, roomStatusSelector } from '../../features/room/roomSlice';
import { getRoomListThunk, removeRoomThunk } from '../../features/room/roomThunk';

import Swal from 'sweetalert2'
import { ThemeInterface } from '../../types';
import { Room as RoomClass } from '../../types';
import { AppDispatch } from '../../app/store';
import RoomDetails from '../../components/roomDetails';

function Room(): React.JSX.Element {
  
  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const pageSize: number = 10
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const roomStatus = useSelector(roomStatusSelector)
  const roomDataList = useSelector(roomDataListSelector)
  const roomData = useSelector(roomDataSelector)
  const roomError = useSelector(roomErrorSelector)

  const createPagination = (array: Array<RoomClass>, size: number) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState<number>(0)
  const [list, setList] = useState<RoomClass[]>([])
  const [roomPages, setRoomPages] = useState<RoomClass[][]>(createPagination(list, pageSize))
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [room, setRoom] = useState<RoomClass |null>(null)

  useEffect(() => {
    if (roomStatus === "idle") {
        dispatch(getRoomListThunk())
    }
    else if (roomStatus === "pending") {
        setIsLoading(true)
    }
    else if (roomStatus === "fulfilled") {
        setList(roomDataList)
        setRoomPages(createPagination(roomDataList, pageSize))
        setIsLoading(false)
    }
    else if (roomStatus === "rejected") {
        alert(roomError)
    }
  },[roomStatus, roomDataList])

  const allRooms = () => {
    setOption(0)
    setPage(0)
    setList(roomDataList)
    setRoomPages(createPagination(roomDataList, pageSize))
  }

  const availableRooms = () => {
    const aux = roomDataList.filter((room) => room.available)
    setOption(1)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  const bookedRooms = () => {
    const aux = roomDataList.filter((room) => !room.available)
    setOption(2)
    setPage(0)
    setList(aux)
    setRoomPages(createPagination(aux, pageSize))
  }

  const popUpDelete = (room: RoomClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to get the #${room._id} room back!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `The room #${room._id} has been removed.`,
          icon: "success"
        });
        dispatch(removeRoomThunk(String(room._id)))
      }
    });
  }

  const openDetails = (room: RoomClass) => {
    setRoom(room)
    setShowDetails(true)
  }

  return (
    <PageContainer>
      { !isLoading &&
      <>
        <TableHeader>
          <TableSelect>
            <TableOption type={option === 0 ? 'selected' : ""} onClick={allRooms}>All Rooms</TableOption>
            <TableOption type={option === 1 ? 'selected' : ""} onClick={availableRooms}>Available Rooms</TableOption>
            <TableOption type={option === 2 ? 'selected' : ""} onClick={bookedRooms}>Booked Rooms</TableOption>
          </TableSelect>
          <GreenButton theme="dark" onClick={() => navigate('/NewRoom')}>+ New Room</GreenButton>
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
                  <Column width='27%'>
                    <TableFlexContainer>
                      <TableRoomImg src={room.images[0]} />
                      <TableElementIdentificator>
                        <TableElementId>#{room._id}</TableElementId>
                        <TableElementName>{room.name}</TableElementName>
                      </TableElementIdentificator>
                    </TableFlexContainer>
                  </Column>
                  <Column width='8%' >{room.type}</Column>
                  <Column width='27%' >
                    <p>{room.amenities.map((element, index) => `${element} ${index < room.amenities.length-1 ? ', ' : ""}`)}</p>
                  </Column>
                  <Column width='12%'>
                    <Price><Number theme={themeSelector}>${room.price}</Number>/Night</Price>
                  </Column>
                  <Column width='12%'>
                    <Price><Number theme={themeSelector}>${room.offer}</Number>/Night</Price>
                  </Column>
                  <Column>
                    <RoomStatus status={room.available ? "available" : "booked"}>
                      {room.available ? "Available" : "Booked"}
                    </RoomStatus>
                  </Column>
                  <Column><TableElementActions><TbEyePlus onClick={() => openDetails(room)} className='more'/><FaRegEdit onClick={() => navigate(`/EditRoom/${room._id}`)} className='edit' /><MdDeleteOutline className='delete' onClick={() => popUpDelete(room)}/></TableElementActions></Column>
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
            <TableButton theme={themeSelector} onClick={() => page > 0 && setPage(page-1)}>Prev</TableButton>
            <TablePageButtons theme={themeSelector}>
            {
              roomPages.map((array, index) =>
                (index === page || index >= page-2 && index <= page+2 ) && <TablePageButton type={page === index ? 'selected' : 'none'} theme={themeSelector} key={index} onClick={() => setPage(index)}>{index+1}</TablePageButton> 
              )
            }
            </TablePageButtons>
            <TableButton theme={themeSelector} onClick={() => page+1 < roomPages.length && setPage(page+1)}>Next</TableButton>
          </TableButtons>
        </TableFooter>
        </> 
      }
      {showDetails && <RoomDetails close={() => setShowDetails(false)} room={room as RoomClass}></RoomDetails>}
    </PageContainer>
  )
}

export default Room