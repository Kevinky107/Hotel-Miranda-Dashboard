import { styled } from 'styled-components';

export const Details = styled.div<{theme: 'light' | 'dark'}>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 10em;
    right: 0;
    margin: auto;
    display: flex;
    width: 50em;
    height: 20em;
    border-radius: 1em;
    justify-content: space-between;

    div{
        display: inline-flex;
    }

    .swiper{
        width: 20em;
        height: 20em;
    }

    img{
        width: 20em;
        height: 20em;
        border-radius: 0 1em 1em 0;
    }
    
    ${props => props.theme === 'light' ?`
        background-color: #F8F8F8;
        `:`
        background-color: #171717;
    `}
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2em;
    overflow-y: auto;
    width: 100%;
    gap: 1em;
`

export const Close = styled.div`
    position: absolute;
    right: 0.2em;
    z-index: 2;

    &:hover{
        cursor: pointer;
        color: red;
    }
`

export const Profile = styled.div`
    display: flex;
    flex-direction: column; 
`

export const CallButton = styled.button`

`

export const MessageButton = styled.button`

`

export const Check = styled.div`
        div{
            flex-direction: column;
            padding-right: 2em;
        }
`
export const BookingRoom = styled.div`

`

export const BookingNote = styled.div`

`

export const Facilitie = styled.h4`

`

export const Amenities = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`

export const Amenitie = styled.p`
    display: inline-flex;
    height: fit-content;
    margin: 0.4em 0.4em 0 0;
    padding: 0.5em;
    border-radius: 0.7em;
    width: fit-content;
    color: #5AD07A;
    background-color: #BFFF9F55;
`