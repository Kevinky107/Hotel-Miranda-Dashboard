import { styled } from 'styled-components';

export const NavBar = styled.nav`
    width: 100%;
    height: 6em;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => props.theme === 'light' ? `
        background-color: #FFFFFF;
        `:`
        background-color: #202020;    
        `
    }

    svg{
        font-size: 2rem;
    }

    svg:hover{
        cursor: pointer;
    }
`

export const LeftNavBar = styled.div`
    display: flex;
    align-items: center;

    ${props => props.size === "small" ? `
        padding-left: 25em;
        `:`
        padding-left: 5em;
        `
    }
    

    svg{
        display: inline-flex;
    }

    h1{
        padding-left: 1em;
        font-size: 2rem;
        display: inline-flex;
    }    
`

export const RightNavBar = styled.div`
    display: flex;
    align-items: center;
    color: #135846;
    padding-right: 5em;

    svg{
        padding-inline: 0.5em;
    }
`