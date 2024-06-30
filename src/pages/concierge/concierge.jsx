import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { PageContainer } from '../../components/page-styled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons,
  TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer, 
  RoomStatus, TableButton, TablePageButtons, TablePageButton,
  UserStatus} from '../../components/table-styled';
import users from '../../assets/users.json'
import { GreenButton } from '../../components/button-styled';

function Concierge() {

  const themeSelector = useContext(ThemeContext)
  const pageSize = 10

  const createPagination = (array, size) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState(0)
  const [list, setList] = useState(users)
  const [userPages, setUserPages] = useState(createPagination(list, pageSize))
  const [page, setPage] = useState(0)

  const allUsers = () => {
    setOption(0)
    setPage(0)
    setList(users)
    setUserPages(createPagination(users, pageSize))
  }

  const activeUsers = () => {
    const aux = users.filter((user) => user.state)
    setOption(1)
    setPage(0)
    setList(aux)
    setUserPages(createPagination(aux, pageSize))
  }

  const inactiveUsers = () => {
    const aux = users.filter((user) => !user.state)
    setOption(2)
    setPage(0)
    setList(aux)
    setUserPages(createPagination(aux, pageSize))
  }

  return (
    <PageContainer>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allUsers}>All Employee</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={activeUsers}>Active Employee</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={inactiveUsers}>Inactive Employee</TableOption>
        </TableSelect>
        <GreenButton theme="dark">+ New Employee</GreenButton>
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
                <Column width='20%'>
                  <TableFlexContainer>
                    <img width='60em' src={user.picture} />
                    <TableElementIdentificator>
                      <TableElementName>{user.name}</TableElementName>
                      <TableElementId>#{user.id}</TableElementId>
                      <p>{user.startdate}</p>
                    </TableElementIdentificator>
                  </TableFlexContainer>
                </Column>
                <Column width='10%'>{user.post}</Column>
                <Column width='35%'>{user.postdescription}</Column>
                <Column>{user.email}</Column>
                <Column>{user.phone}</Column>
                <Column width='7%'><UserStatus state={user.state ? 'active' : 'inactive'}>{user.state ? 'Active' : 'Inactive'}</UserStatus></Column>
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
    </PageContainer>
  )
}

export default Concierge