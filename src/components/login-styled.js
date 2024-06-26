import { styled } from 'styled-components';

export const LoginBackground = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    overflow: hidden;
    position: relative;

    ${props => props.theme === 'light' ? `
        background-color: #F8F8F8;
        color: rgb(24, 24, 24);
        `:`
        background-color: #202020;
        color: white;    
        `
    }

    .decoration{
        position: absolute;
        left: 60em;
        bottom: -20em;
        width: 100em;
        
        height: 100em;
        transform: rotate(-45deg);

        ${props => props.theme === 'light' ? `
            background-color: rgb(238, 238, 238);
            `:`
            background-color: rgb(46, 46, 46);
            `
        }
    }

    .decoration2{
        position: absolute;
        left: -81.5em;
        bottom: -20em;
        width: 100em;
        height: 100em;
        transform: rotate(45deg);

        ${props => props.theme === 'light' ? `
            background-color: rgb(255, 255, 255);
            `:`
            background-color: rgb(24, 24, 24);
            `
        }
    }

    form{
        padding: 3em;
        margin-right: 20%;
        border-radius: 2em;
        z-index: 2;

        ${props => props.theme === 'light' ? `
            background-color: #FFFFFF;
            box-shadow: 0 5px 10px 1px rgb(156, 156, 156);
            `:`
            background-color: #171717;
            box-shadow: 0 5px 10px 1px rgb(27, 27, 27);
            `
        }

        h2{
            padding-bottom: 0.5em;
        }

        p{
            padding-top: 1em;
        }

        button{
            border-radius: 0.5em;
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

export const LoginInputText = styled.input.attrs({ type: "text" })`
    margin-bottom: 0.9em;
    padding: 0.4em;
    border: none;

    ${props => props.theme === 'light' ? `
        background-color: #e0e0e0;
        `:`
        background-color: #202020;
        color: white;
        `
    }
`

export const LoginInputPassword = styled.input.attrs({ type: "password" })`
    margin-bottom: 0.9em;
    padding: 0.4em;
    border: none;
    margin-bottom: 2em;

    ${props => props.theme === 'light' ? `
        background-color: #e0e0e0;
        `:`
        background-color: #202020;
        color: white;
        `
    }
`
