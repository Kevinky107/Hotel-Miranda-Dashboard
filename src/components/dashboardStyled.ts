import { styled } from 'styled-components';

export const DashboardGrid = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly; 
    align-content: stretch; 
    grid-template-columns: 15% 15% 15% 15%;
    grid-template-rows: 30% 70%;
`