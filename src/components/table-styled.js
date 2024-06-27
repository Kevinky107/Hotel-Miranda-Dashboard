import { styled } from 'styled-components';

export const Table = styled.table`
    width: 100%;
    text-align: left;
    border-radius: 1em;
    padding: 1em;

    ${props => props.theme === 'light' ? `
        background-color: #F8F8F8;
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