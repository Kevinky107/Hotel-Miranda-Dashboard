import { styled } from 'styled-components';

export const GreenButton = styled.button`
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
`