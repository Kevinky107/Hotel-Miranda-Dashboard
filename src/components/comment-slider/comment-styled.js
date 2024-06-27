import { styled } from 'styled-components';

export const CommentSliderWrap = styled.article`
    grid-column-start: 1;
    grid-column-end: 5;
    align-self: start;

    width: 96%;
    height: 20em;
    padding: 2em;
    padding-inline: 4em;
    padding-bottom: 3em;
    margin-top: 2em;
    border-radius: 1em;
    
    ${props => props.theme === 'light' ?`
        background-color: white;
        `:`
        background-color: #202020;
    `
    }

    .swiper-wrapper{
        padding-inline: 1em;
    }

    .swiper-button-next{
        background: #135846;
        color: white;
        right: 0;
        width: 2em;
        height: 2em;
        border-radius: 0.5em;

        &::after{
            font-size: 1rem;
        }
    }

    .swiper-button-prev{
        background: #135846;
        color: white;
        left: 0em;
        width: 2em;
        height: 2em;
        border-radius: 0.5em;

        &::after{
            font-size: 1rem;
        }
    }

    .swiper-button-disabled{
        display: none;
    }
`
export const CommentTitle = styled.h2`
    padding-bottom: 2em;
    padding-top: 1em;
    padding-left: 1em;
    font-size: 1rem;
    font-weight: 400;
`

export const CommentCard = styled.div`
    border: 1px solid #EBEBEB;
    height: 11em;
    border-radius: 1em;
    padding: 2em;
    width: 75%;
    position: relative;
`

export const CommentText = styled.p`
    font-size: 0.8rem;
    height: 9em;
    overflow: hidden;
`

export const CommentFooter = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding-top: 1em;

`

export const CommentCustomer = styled.div`
    display: inline-flex;
    align-items: center;
    width: 10em;

    img{
        height: 3em;
        display: inline-flex;
        border-radius: 0.5em;
    }
    
    div{
        display: inline-flex;
        flex-direction: column;
        padding-left: 1em;

        h4{
            font-size: 0.7rem;
        }

        p{
            font-size: 0.6rem;
            color: #799283;
        }
    }

`

export const CommentActions = styled.div`
    position: absolute;
    bottom: 1em;
    right: 1.5em;
    font-size: 1.5rem;

    .check{
        color: green;
        padding-right: 0.5em;
    }

    .cross{
        color: red;
    }

`