import { styled } from 'styled-components';

export const SideMenu = styled.aside`
    position: fixed;
    width: 22em;
    height: 100%;
    z-index: 3;

    ${props => props.theme === 'light' ? `
        background-color: #FFFFFF;
        box-shadow: 1em 0 4em #eeeeee6e;
        `:`
        background-color: #202020;
        box-shadow: 1em 0 4em #0000006e;
        `
    }
`

export const Logo = styled.picture`
    position: relative;
    padding-left: 4.5em;

    .build{
        font-size: 3rem;
        color: #1C7A61;
        position: absolute;
        top: -0.08em;
        left: 1em;
    }
    .stars{
        color: #E23428;
        position: absolute;
        top: -1.1em;
        left: 4em;
    }
`

export const TextLogo = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding-left: 2em;

    h1{
        margin-top: 0.5em;
        padding-top: 1em;
        font-weight: 800;
    }

    h4{
        font-weight: 300;
        font-size: 0.8rem;
        color: #686868;
    }
`

export const NavList = styled.ul`
    margin-top: 1em;
    list-style: none;
    padding-bottom: 3em;
`
export const NavListElement = styled.li`
    display: flex;
    align-items: center;
    padding-block: 1em;
    margin-block: 0.8em;
    padding-left: 3em;
    color: #799283;

    &:hover{
        cursor: pointer;
        color: #E23428; 
    }

    svg{
        display: inline-flex;
        font-size: 1.6em;
    }
                
    h3{
        display: inline-flex;
        padding-left: 2em;
        font-weight: 300;
    }

    ${props => props.selected === 'selected' && `
        svg{
            color: #E23428;
        }
        h3{
            color: #E23428;
        }
        border-left: 4px solid #E23428;
        `
    }
`

export const SideMenuFooter = styled.div`
    padding-top: 2em;

    h3{
        padding-inline: 3em;
        font-size: 1rem;
    }

    h4{
        padding-inline: 3.3em;
        font-size: 0.9rem;
        color: #799283;
        font-weight: 300;
        padding-top: 0.5em;
    }

    p{
        padding-top: 3em;
        padding-inline: 3.3em;
        font-size: 0.9rem;
        color: #799283;
        font-weight: 300;
    }
`