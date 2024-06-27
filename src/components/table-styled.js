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

`
export const TableElementName = styled.p`
`

//ROOM

export const TableRoomImg = styled.img`
    width: 8em;
    height: 5em;
    border-radius: 0.6em;
`