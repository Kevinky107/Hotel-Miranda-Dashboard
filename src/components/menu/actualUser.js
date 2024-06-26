import { styled } from 'styled-components';

export const ActualUser = styled.div`
    text-align: center;
    margin: auto;
    margin-inline: 3em;
    border-radius: 1em;
    position: relative;
    padding-top: 2.5em;
    padding-bottom: 1.5em;

    ${props => props.theme === 'light' ? `
        background-color: #FFFFFF;
        box-shadow: 0px 5px 25px rgb(163, 163, 163);
        `:`
        background-color: #292828;
        box-shadow: 0px 5px 25px rgb(24, 24, 24);
        `
    }

    h4{
        padding-block: 1em;
    }

    p{
        font-weight: 200;
        font-size: 0.8rem;
        padding-bottom: 1em;
    }
`

export const ActualUserImage = styled.img`
    width: 5em;
    height: auto;
    border-radius: 1em;
    position: absolute;
    top: -2.5em;
    left: 0;
    right: 0;
    margin: auto;
`