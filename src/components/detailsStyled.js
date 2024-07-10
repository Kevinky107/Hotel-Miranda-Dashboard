import { styled } from 'styled-components';

export const Details = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 10em;
    right: 0;
    margin: auto;
    display: flex;
    background-color: black;
    width: 60em;
    height: 20em;
    border-radius: 1em;
    justify-content: space-between;

    div{
        display: inline-flex;
    }

    img{
        width: 20em;
        height: 20em;
        border-radius: 1em;
    }
`
export const Info = styled.div`
    display: flex;
    flex-direction: column;
`

export const Close = styled.div`
    position: fixed;
    right: 25em;
`