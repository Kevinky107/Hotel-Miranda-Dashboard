import { styled } from 'styled-components';

export const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    ${props => props.theme === 'light' ? `
        background-color: #F8F8F8;
        color: rgb(24, 24, 24);
        `:`
        background-color: #171717;
        color: white;    
        `
    }
    
` 