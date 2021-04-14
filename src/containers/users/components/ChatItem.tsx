import React from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { observer } from "mobx-react"
import moment from "moment"
import styled from "styled-components"
import { Colors } from "../../../components"
import { DeleteIcon, EditIcon } from "../../../components/icons"
import { IChat } from "../../../interfaces/Chat"

const ChatItemContainerLinkStyle = styled(Link)`
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

const ChatItemContainerStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    cursor: default;

    border: 1px solid ${Colors.BLACK};
    border-radius: 0.25rem;
`

const ChatInfoWrapper = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 300;

    & > div:first-child {
        color: ${Colors.GREEN};
        font-weight: 400;
    }
`

const IconsContainerStyle = styled.div`
    display: flex;
    margin-left: 1rem;

    & > div:last-child {
        margin-left: 0.1rem;
    }
`

const IconWrapperStyle = styled.div`
    cursor: pointer;
`

type ChatItemProps = {
    chat: IChat
    to?: string
    onClick?: (id: number) => void
    onDelete?: (id: number) => void
    onEdit?: (id: number) => void
}

export const ChatItem = observer(({ chat, to, onClick, onDelete, onEdit }: ChatItemProps) => {
    const { t } = useTranslation()
    const { userId } = useParams<{ userId: string }>()
    const owner = chat.users.find((c) => c.id === chat.ownerId)

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
            <ChatItemContainerLinkStyle to={to} onClick={() => onClick && onClick(chat.id)}>
                <ChatInfoWrapper>
                    <div>{chat.name}</div>
                    <div>
                        {t("common.created_at")}: {moment(chat.createdAt).utc().format("DD. MM. yyyy HH:mm:ss UTC")}
                    </div>
                    {owner && (
                        <div>
                            {t("common.owner")}: {owner.name} {owner.lastName}
                        </div>
                    )}
                </ChatInfoWrapper>
            </ChatItemContainerLinkStyle>
        )
    }

    return (
        <ChatItemContainerStyle onClick={() => onClick && onClick(chat.id)}>
            <ChatInfoWrapper>
                <div>{chat.name}</div>
                <div>
                    {t("common.created_at")}: {moment(chat.createdAt).utc().format("DD. MM. yyyy HH:mm:ss UTC")}
                </div>
                {owner && (
                    <div>
                        {t("common.owner")}: {owner.name} {owner.lastName}
                    </div>
                )}
            </ChatInfoWrapper>
            {userId === chat.ownerId.toString() && (
                <IconsContainerStyle>
                    {onEdit && (
                        <IconWrapperStyle onClick={(e) => handleOnEdit(chat.id, e)}>
                            <EditIcon size={20} hoverColor={Colors.ORANGE} />
                        </IconWrapperStyle>
                    )}
                    {onDelete && (
                        <IconWrapperStyle onClick={(e) => handleOnDelete(chat.id, e)}>
                            <DeleteIcon size={20} hoverColor={Colors.RED} />
                        </IconWrapperStyle>
                    )}
                </IconsContainerStyle>
            )}
        </ChatItemContainerStyle>
    )
})
