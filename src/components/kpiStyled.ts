import { styled } from 'styled-components';

export const KPI = styled.div<{theme: 'light' | 'dark'}>`
    padding: 1em;
    width: 120%;
    height: 6em;
    border-radius: 1em;
    display: flex;
    align-items: center;

    ${props => props.theme === 'light' ?`
        background-color: white;
        `:`
        background-color: #202020;
    `
    }
`

export const KPIpicture = styled.picture<{type: 'regular' | 'red'}>`
    display: inline-flex;
    padding: 0.6em;
    font-size: 2rem;
    border-radius: 0.3em;
    margin-right: 0.5em;

    ${props => props.type === 'regular' ?`
        color: #E23428;
        background-color: #E234281C;
        `:`
        color: #ffffff;
        background-color: #E23428;
    `
    }
`

export const KPItext = styled.div`
    display: inline-flex;
    flex-direction: column;

    h3{
        font-size: 2rem;
    }

    h4{
        font-size: 0.8rem;
        font-weight: 300;
    }
`