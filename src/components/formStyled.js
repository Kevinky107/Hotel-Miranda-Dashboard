import { styled } from 'styled-components';

export const FormStyledWrapper = styled.div`
    margin-inline: auto;
    width: fit-content;
    padding: 1em;
    border-radius: 1em;

    ${props => props.theme === 'light' ?`
        background-color: white;
        `:`
        background-color: #202020;
    `}
    
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
`

export const RadioContainer = styled.div`
    
`