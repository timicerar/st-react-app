import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import _ from "lodash"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors, ScreenSize } from "../../components"
import { Button, Form, Input } from "../../components/form"
import { CloseIcon } from "../../components/icons"
import { DetailsLoader } from "../../components/loader"
import BrowserService from "../../services/BrowserService"
import { ChatsStore } from "../../stores/ChatsStore"

const UserEditContainerStyle = styled.div`
    max-width: ${ScreenSize.Small};
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
`

const UsersEditWrapperStyle = styled.div`
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

const BackIconWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    cursor: pointer;

    &:hover {
        background: ${Colors.LIGHT_GRAY};
    }
`

const WarningMessage = styled.div`
    padding: 1rem;
    text-align: center;
    color: ${Colors.RED};
    font-style: italic;
    text-transform: uppercase;
`

export const ChatsEdit = observer(() => {
    const { t } = useTranslation()
    const { userId, chatId } = useParams<{ userId: string; chatId: string }>()
    const [chatsStore] = useState(() => new ChatsStore())

    useEffect(() => {
        if (userId && chatId) {
            chatsStore.loadById(chatId, userId)
        }
    }, [chatId, chatsStore, userId])

    const handleOnSubmit = async () => {
        if (userId && chatId) {
            await chatsStore.update(chatId, userId)
        } else {
            await chatsStore.post(userId)
        }
    }

    return (
        <UserEditContainerStyle>
            <UsersEditWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{userId && chatId ? t("common.edit_chat") : t("common.add_chat")}</HeadingStyle>
                    <BackIconWrapperStyle
                        onClick={() =>
                            userId && chatId ? BrowserService.push(`/users/${userId}/chat/${chatId}`) : BrowserService.push(`/users/${userId}`)
                        }
                    >
                        <CloseIcon size={20} />
                    </BackIconWrapperStyle>
                </HeadingWrapperStyle>
                <WarningMessage>
                    Opcije za dodajanje in odstranjevanje članov nisem implementiral v tej aplikaciji. Možno jih je dodati preko Postman-a.
                </WarningMessage>
                {chatsStore.item && (
                    <Form onSubmit={handleOnSubmit}>
                        <Input
                            mandatory={true}
                            name="name"
                            label={t("common.name")}
                            placeholder={t("common.name")}
                            value={chatsStore.item?.name || ""}
                            onChange={(value) => chatsStore.setValue("name", value)}
                            validatorRuleInfo={chatsStore.validator.rules.get("name")}
                        />
                        <Button
                            type="submit"
                            disable={!!(userId && chatId && _.isEqual(chatsStore.copyItem, chatsStore.item))}
                            text={t("common.save")}
                            height={2.7}
                            background={Colors.BLUE}
                            borderColor={Colors.BLUE}
                        />
                    </Form>
                )}
                <DetailsLoader isLoading={chatsStore.isLoading} error={chatsStore.error} item={chatsStore.item} />
            </UsersEditWrapperStyle>
        </UserEditContainerStyle>
    )
})
