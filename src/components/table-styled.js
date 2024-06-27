import { styled } from 'styled-components';

export const Table = styled.table`
    width: 100%;
    text-align: left;
    border-radius: 1em;
    padding: 1em;
    margin-block: 2em;

    ${props => props.theme === 'light' ? `
        background-color: white;
        `:`
        background-color: #202020;
        `
    }
`

export const TableBody = styled.tbody`

`

export const Row = styled.tr`

`

export const Column = styled.td`
    
`

export const ColumnTitle = styled.th`
    
`

export const TableSelect = styled.div`
    color: #686868;
    border-bottom: 1px solid ;
`

export const TableOption = styled.h2`
    display: inline-flex;
    font-size: 1rem;
    padding-bottom: 1em;
    padding-inline: 1em;
    font-weight: 500;
    margin-bottom: -0.09em;

    ${props => props.type === 'selected' && `
        color: #135846;
        border-bottom: 1px solid;
    `
    }

    &:hover{
        cursor: pointer;
    }
    
`

export const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TableFooter = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TablePages = styled.div`
    display: inline-flex;  

    h4{
        font-weight: 400;
    }
`

export const TableButtons = styled.div`
    display: inline-flex;
`

export const TableFlexContainer = styled.div`
    padding-block: 1em;
    display: inline-flex;
    align-items: center;
`

export const TableElementIdentificator = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding-left: 1em;
`

export const TableElementId = styled.p`
    color: #799283;
    font-size: 0.8rem;
`
export const TableElementName = styled.p`
`

export const TableButton = styled.button`
    border: solid 1px #135846;
    width: 5em;
    padding: 0.5em;
    border-radius: 0.5em;
    margin-inline: 1em;

    ${props => props.theme === 'light' ? `
        color: black;
        background: white;
        `:`
        color: white;
        background: #262626;
    `
    }

    &:hover{
        cursor: pointer;
    }
`

export const TablePageButtons = styled.div`
    border: none;
    border-radius: 0.5em;

    ${props => props.theme === 'light' ? `
        color: black;
        background: white;
        `:`
        color: white;
        background: #262626;
    `
    }
    
`

export const TablePageButton = styled.button`
    background: none;
    border: none;
    width: 3em;
    height: 3em;
    padding: 1em;
    border-radius: 0.5em;

    ${props => props.theme === 'light' ? `
        color: black;
        `:`
        color: white;
    `
    }

    ${props => props.type === 'selected' && `
        background-color: #135846;
        color: white;
    `
    }

    &:hover{
        cursor: pointer;
    }
`

//ROOM

export const TableRoomImg = styled.img`
    width: 8em;
    height: 5em;
    border-radius: 0.6em;
`

export const RoomStatus = styled.p`
    width: 6em;
    color: white;
    text-align: center;
    padding: 0.5em;
    font-weight: 300;
    border-radius: 0.5em;

    ${props => props.status === 'available' ? `
        background-color: #E23428;
        
    `:`
        background-color: #5AD07A;
    `
    }
`

export const ViewMore = styled.picture`
    font-size: 2rem;

    &:hover{
        cursor: pointer;
    }
`

export const Price = styled.p`
    font-size: 0.7rem;
    color: #799283;
`

export const Number = styled.b`
    font-size: 1rem;
    
    ${props => props.theme === 'light' ? `
        color: black;
        `:`
        color: white;
    `
    }
`

//Booking

export const Notes = styled.p`

`

export const BookingStatus = styled.p`
    width: 6em;
    color: white;
    text-align: center;
    padding: 0.5em;
    font-weight: 300;
    border-radius: 0.5em;
`

export const TableBookingImg = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 0.4em;
`
