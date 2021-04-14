import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import _ from "lodash"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors, ScreenSize } from "../../components"
import { Button, Form, Input } from "../../components/form"
import { CloseIcon, ShowPasswordIcon } from "../../components/icons"
import { DetailsLoader } from "../../components/loader"
import BrowserService from "../../services/BrowserService"
import { UsersStore } from "../../stores/UsersStore"

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

export const UsersEdit = observer(() => {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [usersStore] = useState(() => new UsersStore())
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (id) {
            usersStore.loadById(id)
        }
    }, [id, usersStore])

    const handleOnSubmit = async () => {
        if (id) {
            await usersStore.update(id)
        } else {
            await usersStore.post()
        }
    }

    return (
        <UserEditContainerStyle>
            <UsersEditWrapperStyle>
                <HeadingWrapperStyle>
                    <HeadingStyle>{id ? t("common.edit_user") : t("common.add_user")}</HeadingStyle>
                    <BackIconWrapperStyle onClick={() => (id ? BrowserService.push(`/users/${id}`) : BrowserService.push("/users"))}>
                        <CloseIcon size={20} />
                    </BackIconWrapperStyle>
                </HeadingWrapperStyle>
                {usersStore.item && (
                    <Form onSubmit={handleOnSubmit}>
                        <Input
                            mandatory={true}
                            name="name"
                            label={t("common.name")}
                            placeholder={t("common.name")}
                            value={usersStore.item?.name || ""}
                            onChange={(value) => usersStore.setValue("name", value)}
                            validatorRuleInfo={usersStore.validator.rules.get("name")}
                        />
                        <Input
                            mandatory={true}
                            name="lastName"
                            label={t("common.last_name")}
                            placeholder={t("common.last_name")}
                            value={usersStore.item?.lastName || ""}
                            onChange={(value) => usersStore.setValue("lastName", value)}
                            validatorRuleInfo={usersStore.validator.rules.get("lastName")}
                        />
                        <Input
                            type="date"
                            mandatory={true}
                            name="dateOfBirth"
                            label={t("common.date_of_birth")}
                            placeholder={t("common.date_of_birth")}
                            value={usersStore.item?.dateOfBirth || ""}
                            onChange={(value) => usersStore.setValue("dateOfBirth", value)}
                            validatorRuleInfo={usersStore.validator.rules.get("dateOfBirth")}
                        />
                        <Input
                            mandatory={true}
                            name="email"
                            label={t("common.email")}
                            placeholder={t("common.email")}
                            disabled={!!id}
                            value={usersStore.item?.email || ""}
                            onChange={(value) => usersStore.setValue("email", value)}
                            validatorRuleInfo={usersStore.validator.rules.get("email")}
                        />
                        {!id && (
                            <Input
                                mandatory={true}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autocomplete="new-password"
                                label={t("common.password")}
                                placeholder={t("common.password")}
                                value={usersStore.item?.password || ""}
                                onChange={(value) => usersStore.setValue("password", value)}
                                icon={<ShowPasswordIcon show={showPassword} onClick={() => setShowPassword((e) => !e)} />}
                                validatorRuleInfo={usersStore.validator.rules.get("password")}
                                validationMessageBelow={true}
                            />
                        )}
                        <Button
                            type="submit"
                            text={t("common.save")}
                            height={2.7}
                            background={Colors.BLUE}
                            borderColor={Colors.BLUE}
                            disable={!!(id && _.isEqual(usersStore.copyItem, usersStore.item))}
                        />
                    </Form>
                )}
                <DetailsLoader isLoading={usersStore.isLoading} error={usersStore.error} item={usersStore.item} />
            </UsersEditWrapperStyle>
        </UserEditContainerStyle>
    )
})
