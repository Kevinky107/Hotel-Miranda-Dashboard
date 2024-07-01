import { styled } from 'styled-components';

export const FormStyledWrapper = styled.div`
    margin-top: 4em;
    margin-inline: auto;
    width: fit-content;
    padding: 2em;
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

        textarea{
            width: 100%;
            height: 6em;
        }

        p{
            padding-left: 1em;
        }

        button{
            border-radius: 0.5em;
            margin-top: 2em;
            border: none;
            padding: 0.8em;
            padding-inline: 4em;

            ${props => props.theme === 'light' ? `
                background: ##EBF1EF;
                color: #135846;
                `:`
                background: #135846;
                color: white;
                `
            }

            &:hover{
                cursor: pointer
            }
        }
    }
    
`

export const CheckboxContainer = styled.div`
    
`

export const FormStyledSection = styled.div`
        display: inline-flex;
        align-items: center;
        padding-bottom: 1em;
        width: 100%;
        gap: 1em;

        input{
            width: 100%;
        }

        img{
            border-radius: 0.5em;
        }

        div{
            width: 100%;
        }
`

export const FormButtonsContainer = styled.div`
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 1em;
`