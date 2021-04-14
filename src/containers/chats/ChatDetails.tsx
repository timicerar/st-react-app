import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors, ScreenSize } from "../../components"
import { CloseIcon } from "../../components/icons"
import { DetailsLoader } from "../../components/loader"
import BrowserService from "../../services/BrowserService"
import { ChatsStore } from "../../stores/ChatsStore"
import DialogStore from "../../stores/dialog/DialogStore"
import { ChatItem } from "../users/components/ChatItem"
import { UserItem } from "../users/components/UserItem"

const ChatsDetailsContainerStyle = styled.div`
    max-width: ${ScreenSize.Small};
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
`

const ChatsListWrapperStyle = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    margin-bottom: 1rem;
`

const HeadingWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const HeadingStyle = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: 2rem;
    color: ${Colors.BLACK};
`

const HeaderIconWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    cursor: pointer;

    &:hover {
        background: ${Colors.LIGHT_GRAY};
    }
`

export const ChatDetails = observer(() => {
    const { t } = useTranslation()
    const { userId, chatId } = useParams<{ userId: string; chatId: string }>()
    const [chatsStore] = useState(() => new ChatsStore())

    useEffect(() => {
        chatsStore.loadById(chatId, userId)
    }, [chatId, chatsStore, userId])

    const handleOnDelete = (id: number) => {
        DialogStore.delete(
            async () => {
                await DialogStore.execFullScreen(chatsStore.delete(id, userId))
            },
            () => void 0,
            t("common.delete_user"),
            t("common.delete_user_message"),
        )
    }

    return (
        <ChatsDetailsContainerStyle>
            <ChatsListWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{t("common.chat_details")}</HeadingStyle>
                    <HeaderIconWrapperStyle onClick={() => BrowserService.push(`/users/${userId}`)}>
                        <CloseIcon size={20} />
                    </HeaderIconWrapperStyle>
                </HeadingWrapperStyle>
                {chatsStore.item && (
                    <>
                        <ChatItem
                            chat={chatsStore.item}
                            onDelete={handleOnDelete}
                            onEdit={() => BrowserService.push(`/users/${userId}/chat/${chatId}/edit`)}
                        />
                        <HeadingStyle>{t("common.members")}</HeadingStyle>
                        {chatsStore.item.users.map((u) => (
                            <UserItem key={u.id} user={u} isOwner={u.id === chatsStore.item?.ownerId} />
                        ))}
                    </>
                )}
                <DetailsLoader isLoading={chatsStore.isLoading} error={chatsStore.error} item={chatsStore.item} />
            </ChatsListWrapperStyle>
        </ChatsDetailsContainerStyle>
    )
})
