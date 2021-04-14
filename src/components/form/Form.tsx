import React from "react"
import styled from "styled-components"

interface IFormProps {
    children: React.ReactNode
    onSubmit?: () => void
}

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const Form = ({ onSubmit, children }: IFormProps) => {
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onSubmit && onSubmit()
    }

    return <StyledForm onSubmit={onFormSubmit}>{children}</StyledForm>
}
