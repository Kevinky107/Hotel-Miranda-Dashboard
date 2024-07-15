import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { PageContainer } from '../../components/pageStyled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons, 
  TableButton, TablePageButtons, TablePageButton, 
  CommentAction} from '../../components/tableStyled';
import { SwiperContainer } from '../../components/comment-slider/commentStyled';
import CommentsSlider from '../../components/comment-slider/commentsSlider';
import { contactDataListSelector, contactDataSelector, contactErrorSelector, contactStatusSelector, removeContact } from '../../features/contact/contactSlice';
import { getContactListThunk } from '../../features/contact/contactThunk';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Comment, ThemeInterface } from '../../types';
import { AppDispatch } from '../../app/store';

function Contact() {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const pageSize = 10
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const contactStatus = useSelector(contactStatusSelector)
  const contactDataList = useSelector(contactDataListSelector)
  const contactData = useSelector(contactDataSelector)
  const contactError = useSelector(contactErrorSelector)

  const createPagination = (array: Comment[], size: number) => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState<number>(0)
  const [list, setList] = useState<Comment[]>([])
  const [commentPages, setCommentPages] = useState<Comment[][]>(createPagination(list, pageSize))
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (contactStatus === "idle") {
        dispatch(getContactListThunk())
    }
    else if (contactStatus === "pending") {
        setIsLoading(true)
    }
    else if (contactStatus === "fulfilled") {
        setList(contactDataList)
        setCommentPages(createPagination(contactDataList, pageSize))
        setIsLoading(false)
    }
    else if (contactStatus === "rejected") {
        alert(contactError)
    }
  },[contactStatus, contactDataList])

  const allComments = () => {
    setOption(0)
    setPage(0)
    setList(contactDataList)
    setCommentPages(createPagination(contactDataList, pageSize))
  }

  const publishedComments = () => {
    const aux = contactDataList.filter((comment) => comment.archived === false)
    setOption(1)
    setPage(0)
    setList(aux)
    setCommentPages(createPagination(aux, pageSize))
  }

  const archivedComments = () => {
    const aux = contactDataList.filter((comment) => comment.archived === true)
    setOption(2)
    setPage(0)
    setList(aux)
    setCommentPages(createPagination(aux, pageSize))
  }

  return (
    <PageContainer>
      <SwiperContainer>
        <CommentsSlider/>
      </SwiperContainer>
      <br></br><br></br>
      {!isLoading && <>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allComments}>All Comments</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={publishedComments}>Published</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={archivedComments}>Archived</TableOption>
        </TableSelect>
      </TableHeader>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Contact Id</ColumnTitle>
            <ColumnTitle>Date</ColumnTitle>
            <ColumnTitle>Customer</ColumnTitle>
            <ColumnTitle>Comment</ColumnTitle>
            <ColumnTitle>Action</ColumnTitle>
          </Row>
          {
            commentPages[page].map((comment, index) => 
              <Row type='big' key={index}>
                <Column width='10%'>
                      #{comment.id}
                </Column>
                <Column width='10%'>{comment.date}</Column>
                <Column width='15%'>{comment.customer}</Column>
                <Column width='40%' >{comment.comment}</Column>
                <Column width='15%'>
                  <CommentAction type='publish'>Publish</CommentAction><CommentAction type='archive'>Archive</CommentAction>
                </Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <TableFooter>
        <TablePages>
          <h4>Showing {pageSize * (page) + commentPages[page].length} of {list.length}</h4>
        </TablePages>
        <TableButtons>
          <TableButton theme={themeSelector} onClick={() => page > 0 && setPage(page-1)}>Prev</TableButton>
          <TablePageButtons theme={themeSelector}>
          {
            commentPages.map((array, index) =>
              (index === page || index >= page-2 && index <= page+2 ) && <TablePageButton type={page === index ? 'selected' : 'none'} theme={themeSelector} key={index} onClick={() => setPage(index)}>{index+1}</TablePageButton> 
            )
          }
          </TablePageButtons>
          <TableButton theme={themeSelector} onClick={() => page+1 < commentPages.length && setPage(page+1)}>Next</TableButton>
        </TableButtons>
      </TableFooter>
      </>}
    </PageContainer>
  )
}

export default Contact