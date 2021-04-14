import React from "react"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import moment from "moment"
import styled from "styled-components"
import { Colors } from "../../../components"
import { DeleteIcon, EditIcon, OwnerIcon } from "../../../components/icons"
import { IUser } from "../../../interfaces"

const UserItemContainerLinkStyle = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    cursor: pointer;

    color: ${Colors.BLACK};
    text-decoration: none;

    border: 1px solid ${Colors.BLACK};
    border-radius: 0.25rem;

    &:hover {
        background: ${Colors.LIGHT_GRAY};

        &:nth-child(2) {
            visibility: visible;
        }
    }

    &:not(&:hover) {
        & > div:nth-child(2) {
            visibility: hidden;
            pointer-events: none;
        }
    }
`

const UserItemContainerStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    cursor: default;

    border: 1px solid ${Colors.BLACK};
    border-radius: 0.25rem;
`

const UserInfoWrapper = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 300;

    & > div:first-child {
        color: ${Colors.BLUE};
        font-weight: 400;
    }
`

const IconsContainerStyle = styled.div`
    display: flex;

    & > div:last-child {
        margin-left: 0.1rem;
    }
`

const IconWrapperStyle = styled.div`
    cursor: pointer;
`

type UserItemProps = {
    user: IUser
    isOwner?: boolean
    to?: string
    onClick?: (id: number) => void
    onDelete?: (id: number) => void
    onEdit?: (id: number) => void
}

export const UserItem = observer(({ user, to, isOwner, onClick, onDelete, onEdit }: UserItemProps) => {
    const handleOnDelete = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        onDelete && onDelete(id)
    }

    const handleOnEdit = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        onEdit && onEdit(id)
    }

    if (to) {
        return (
            <UserItemContainerLinkStyle to={to} onClick={() => onClick && onClick(user.id)}>
                <UserInfoWrapper>
                    <div>
                        {user.name} {user.lastName}
                    </div>
                    <div>{moment(user.dateOfBirth).format("DD. MM. yyyy")}</div>
                    <div>{user.email}</div>
                </UserInfoWrapper>
            </UserItemContainerLinkStyle>
        )
    }

    return (
        <UserItemContainerStyle onClick={() => onClick && onClick(user.id)}>
            <UserInfoWrapper>
                <div>
                    {user.name} {user.lastName}
                </div>
                <div>{moment(user.dateOfBirth).format("DD. MM. yyyy")}</div>
                <div>{user.email}</div>
            </UserInfoWrapper>
            <IconsContainerStyle>
                {onEdit && (
                    <IconWrapperStyle onClick={(e) => handleOnEdit(user.id, e)}>
                        <EditIcon size={20} hoverColor={Colors.ORANGE} />
                    </IconWrapperStyle>
                )}
                {onDelete && (
                    <IconWrapperStyle onClick={(e) => handleOnDelete(user.id, e)}>
                        <DeleteIcon size={20} hoverColor={Colors.RED} />
                    </IconWrapperStyle>
                )}
                {isOwner && <OwnerIcon />}
            </IconsContainerStyle>
        </UserItemContainerStyle>
    )
})
