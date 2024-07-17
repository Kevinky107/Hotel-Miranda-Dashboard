import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { GreenButton } from './buttonStyled'

test('The button should have the background color #EBF1EF', () => {
    render(<GreenButton theme='light'>BUTTON</GreenButton>)

    expect(screen.getByRole("button", {name: /BUTTON/i})).toHaveStyle({
        backgroundColor: "rgb(235, 241, 239)"
    })
})

test('The button should have the background color #135846', () => {
    render(<GreenButton theme='dark'>BUTTON</GreenButton>)

    expect(screen.getByRole("button", {name: /BUTTON/i})).toHaveStyle({
        backgroundColor: "rgb(19, 88, 70)"
    })
})