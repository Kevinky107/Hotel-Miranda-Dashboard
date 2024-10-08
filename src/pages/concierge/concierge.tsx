import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { PageContainer } from '../../components/pageStyled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons,
  TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer, 
  RoomStatus, TableButton, TablePageButtons, TablePageButton,
  UserStatus,
  TableElementActions,
  ConciergeImage,
  ConciergeDate} from '../../components/tableStyled';
import { GreenButton } from '../../components/buttonStyled';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { userDataListSelector, userDataSelector, userErrorSelector, userStatusSelector} from '../../features/user/userSlice';
import { getUserListThunk, removeUserThunk } from '../../features/user/userThunk';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbEyePlus } from 'react-icons/tb';
import { Details } from '../../components/detailsStyled';
import ConciergeDetails from '../../components/conciergeDetails';
import { ThemeInterface, User } from '../../types';
import { AppDispatch } from '../../app/store';

function Concierge(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const pageSize: number = 10
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const userStatus = useSelector(userStatusSelector)
  const userDataList = useSelector(userDataListSelector)
  const userData = useSelector(userDataSelector)
  const userError = useSelector(userErrorSelector)

  const createPagination = (array: User[], size: number) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState<number>(0)
  const [list, setList] = useState<User[]>([])
  const [userPages, setUserPages] = useState<User[][]>(createPagination(list, pageSize))
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [user, setUser] = useState<User |null>(null)

  useEffect(() => {
    if (userStatus === "idle") {
        dispatch(getUserListThunk())
    }
    else if (userStatus === "pending") {
        setIsLoading(true)
    }
    else if (userStatus === "fulfilled") {
        setList(userDataList)
        setUserPages(createPagination(userDataList, pageSize))
        setIsLoading(false)
    }
    else if (userStatus === "rejected") {
        alert(userError)
    }
  },[userStatus, userDataList])

  const allUsers = () => {
    setOption(0)
    setPage(0)
    setList(userDataList)
    setUserPages(createPagination(userDataList, pageSize))
  }

  const activeUsers = () => {
    const aux = userDataList.filter((user) => user.state)
    setOption(1)
    setPage(0)
    setList(aux)
    setUserPages(createPagination(aux, pageSize))
  }

  const inactiveUsers = () => {
    const aux = userDataList.filter((user) => !user.state)
    setOption(2)
    setPage(0)
    setList(aux)
    setUserPages(createPagination(aux, pageSize))
  }

  const popUpDelete = (user: User) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to get the ${user.name} data back!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `The user ${user.name} has been removed.`,
          icon: "success"
        });
        dispatch(removeUserThunk(String(user._id)))
      }
    });
  }

  const openDetails = (user: User) => {
    setUser(user)
    setShowDetails(true)
  }

  return (
    <PageContainer>
      {!isLoading && <>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allUsers}>All Employee</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={activeUsers}>Active Employee</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={inactiveUsers}>Inactive Employee</TableOption>
        </TableSelect>
        <GreenButton theme="dark" onClick={() => navigate('/NewEmployee')}>+ New Employee</GreenButton>
      </TableHeader>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Name</ColumnTitle>
            <ColumnTitle>Post</ColumnTitle>
            <ColumnTitle>Job Desk</ColumnTitle>
            <ColumnTitle>Email</ColumnTitle>
            <ColumnTitle>Phone</ColumnTitle>
            <ColumnTitle>Status</ColumnTitle>
          </Row>
          {
            userPages[page].map((user, index) => 
              <Row key={index}>
                <Column width='25%'>
                  <TableFlexContainer>
                    <ConciergeImage width='60em' src={user.picture} />
                    <TableElementIdentificator>
                      <TableElementName>{user.name}</TableElementName>
                      <TableElementId>#{user._id}</TableElementId>
                      <ConciergeDate>{user.startdate}</ConciergeDate>
                    </TableElementIdentificator>
                  </TableFlexContainer>
                </Column>
                <Column width='10%'>{user.post}</Column>
                <Column width='35%'>{user.postdescription}</Column>
                <Column>{user.email}</Column>
                <Column width='20%' >{user.phone}</Column>
                <Column width='6%'><UserStatus state={user.state ? 'active' : 'inactive'}>{user.state ? 'Active' : 'Inactive'}</UserStatus></Column>
                <Column><TableElementActions><TbEyePlus onClick={() => openDetails(user)} className='more'/><FaRegEdit onClick={() => navigate(`/EditEmployee/${user._id}`)} className='edit' /><MdDeleteOutline  onClick={() => popUpDelete(user)} className='delete' /></TableElementActions></Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <TableFooter>
        <TablePages>
          <h4>Showing {pageSize * (page) + userPages[page].length} of {list.length}</h4>
        </TablePages>
        <TableButtons>
          <TableButton theme={themeSelector} onClick={() => page > 0 && setPage(page-1)}>Prev</TableButton>
          <TablePageButtons theme={themeSelector}>
          {
            userPages.map((array, index) =>
              (index === page || index >= page-2 && index <= page+2 ) && <TablePageButton type={page === index ? 'selected' : 'none'} theme={themeSelector} key={index} onClick={() => setPage(index)}>{index+1}</TablePageButton> 
            )
          }
          </TablePageButtons>
          <TableButton theme={themeSelector} onClick={() => page+1 < userPages.length && setPage(page+1)}>Next</TableButton>
        </TableButtons>
      </TableFooter>
      </>} 
      {showDetails && <ConciergeDetails close={() => setShowDetails(false)} user={user as User}></ConciergeDetails>}
    </PageContainer>
  )
}

export default Concierge