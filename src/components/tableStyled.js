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
    ${props => props.type === "big" && `
        
        height: 7em;
        
    `
    }
    
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
    color: #686868; 

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

export const TableElementActions = styled.div`
    display: inline-flex;

    svg{
        padding-left: 0.7em;

        &:hover{
            cursor: pointer;
        }
    }

    .edit{
        &:hover{
            color: #3085d6;
        }
    }

    .delete{
        &:hover{
            color: #d33;
        }
    }

    .more{
        &:hover{
            color: green;
        }
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
        background-color: #5AD07A;
    `:`
        background-color: #E23428;
    `
    }
`

export const ViewMore = styled.picture`
    font-size: 1rem;

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

export const Notes = styled.button`
    padding-block: 0.7em;
    tex-align: center;
    width: 9em;
    border-radius: 0.5em;
    font-weight: 400;

    ${props => props.theme === 'light' ? `
        color: black;
        background-color: #EEF9F2;
        border: none;

        &:disabled{
            color: #799283;
            border: 1px solid #799283;
            background-color: white;
        }
        `:`
        color: white;
        background-color: #3D3D3D;
        border: none;

        &:disabled{
            color: #135846;
            border: 1px solid #135846;
            background-color: #202020;
        }
    `
    }

    &:hover{
            cursor: pointer;
        }
`


export const BookingStatus = styled.p`
    width: 6em;
    color: white;
    text-align: center;
    padding: 0.5em;
    font-weight: 300;
    border-radius: 0.5em;
    ${({status}) => {
        switch(status) {
            case "check in":
                return `
                    color: #5AD07A;
                    background-color: #BFFF9F55;
                `;
            case "check out": 
                return `
                    color: #E23428;
                    background-color: #FF766655;
                `;
            case "in progress":
                return`
                    color: #FFFC2A; 
                    background-color: #FFFEA055;
                `;
        }}
    }
`

export const TableBookingImg = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 0.4em;
`

//Contact
export const CommentAction= styled.p`
    display: inline-flex;
    padding-right: 1em;

    ${props => props.type === 'publish' ? ` 
        color: green;
        `:`
        color: red;
    `
    }

    &:hover{
        cursor: pointer;
    }
`

//Concierge

export const UserStatus = styled.p`
    ${props => props.state === 'active' ? ` 
        color: green;
        `:`
        color: red;
    `
    }
`
