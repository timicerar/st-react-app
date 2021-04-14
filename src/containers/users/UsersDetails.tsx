import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors, ScreenSize } from "../../components"
import { CloseIcon, PlusIcon } from "../../components/icons"
import { DetailsLoader, ListLoader } from "../../components/loader"
import BrowserService from "../../services/BrowserService"
import { ChatsStore } from "../../stores/ChatsStore"
import DialogStore from "../../stores/dialog/DialogStore"
import { UsersStore } from "../../stores/UsersStore"
import { ChatItem } from "./components/ChatItem"
import { UserItem } from "./components/UserItem"

const UsersDetailsContainerStyle = styled.div`
    max-width: ${ScreenSize.Small};
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
`

const UsersListWrapperStyle = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    margin-bottom: 1rem;
`

const ChatsListWrapperStyle = styled.div`
    display: grid;
    grid-gap: 0.5rem;
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

export const UsersDetails = observer(() => {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [usersStore] = useState(() => new UsersStore())
    const [chatsStore] = useState(() => new ChatsStore())

    useEffect(() => {
        usersStore.loadById(id)
        chatsStore.load(id)
    }, [chatsStore, id, usersStore])

    const handleOnDelete = (id: number) => {
        DialogStore.delete(
            async () => {
                await DialogStore.execFullScreen(usersStore.delete(id))
            },
            () => void 0,
            t("common.delete_user"),
            t("common.delete_user_message"),
        )
    }

    return (
        <UsersDetailsContainerStyle>
            <UsersListWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{t("common.user_details")}</HeadingStyle>
                    <HeaderIconWrapperStyle onClick={() => BrowserService.push("/users")}>
                        <CloseIcon size={20} />
                    </HeaderIconWrapperStyle>
                </HeadingWrapperStyle>
                {usersStore.item && (
                    <UserItem user={usersStore.item} onDelete={handleOnDelete} onEdit={() => BrowserService.push(`/users/${id}/edit`)} />
                )}
                <DetailsLoader isLoading={usersStore.isLoading} error={usersStore.error} item={usersStore.item} />
            </UsersListWrapperStyle>
            <ChatsListWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{t("common.chats")}</HeadingStyle>
                    <HeaderIconWrapperStyle onClick={() => BrowserService.push(`/users/${id}/chat/new`)}>
                        <PlusIcon size={20} />
                    </HeaderIconWrapperStyle>
                </HeadingWrapperStyle>
                {chatsStore.items?.map((chat) => (
                    <ChatItem key={chat.id} to={`/users/${id}/chat/${chat.id}`} chat={chat} />
                ))}
                <ListLoader isLoading={chatsStore.isLoading} error={chatsStore.error} items={chatsStore.items as []} />
            </ChatsListWrapperStyle>
        </UsersDetailsContainerStyle>
    )
})
