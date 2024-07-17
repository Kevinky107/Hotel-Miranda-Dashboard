import { styled } from 'styled-components';

export const Pages = styled.main<{size: 'small' | 'big'}>`
    height: 100%;
    padding-top: 6em;
    overflow: auto;
    width: 100%;

    ${props => props.size === 'small' && `
        padding-left: 22.5em;
        width: 81.2%;
        
        `
    }
`