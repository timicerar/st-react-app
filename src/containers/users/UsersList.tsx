import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors, ScreenSize } from "../../components"
import { PlusIcon } from "../../components/icons"
import { ListLoader } from "../../components/loader"
import BrowserService from "../../services/BrowserService"
import { UsersStore } from "../../stores/UsersStore"
import { UserItem } from "./components/UserItem"

const UsersListContainerStyle = styled.div`
    max-width: ${ScreenSize.Small};
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
`

const UsersListWrapperStyle = styled.div`
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

const PlusIconWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    cursor: pointer;

    &:hover {
        background: ${Colors.LIGHT_GRAY};
    }
`

export const UsersList = observer(() => {
    const { t } = useTranslation()
    const [usersStore] = useState(() => new UsersStore())

    useEffect(() => {
        usersStore.load()
    }, [usersStore])

    return (
        <UsersListContainerStyle>
            <UsersListWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{t("common.users")}</HeadingStyle>
                    <PlusIconWrapperStyle onClick={() => BrowserService.push("/users/new")}>
                        <PlusIcon size={20} />
                    </PlusIconWrapperStyle>
                </HeadingWrapperStyle>
                {usersStore.items?.map((user) => (
                    <UserItem key={user.id} to={`/users/${user.id}`} user={user} />
                ))}
                <ListLoader isLoading={usersStore.isLoading} error={usersStore.error} items={usersStore.items as []} />
            </UsersListWrapperStyle>
        </UsersListContainerStyle>
    )
})
