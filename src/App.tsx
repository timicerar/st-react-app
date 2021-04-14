import { Suspense } from "react"
import { Redirect, Route, Router, Switch } from "react-router-dom"
import { observer } from "mobx-react"
import { FullScreenLoader } from "./components/loader"
import { ChatDetails, ChatsEdit } from "./containers/chats"
import { Dialog } from "./containers/dialog/Dialog"
import { UsersDetails, UsersEdit, UsersList } from "./containers/users"
import BrowserService from "./services/BrowserService"

const App = observer(() => {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <Router history={BrowserService.history}>
                <Switch>
                    <Route path={"/users/:userId/chat/new"} exact component={ChatsEdit} />
                    <Route path={"/users/:userId/chat/:chatId/edit"} exact component={ChatsEdit} />
                    <Route path={"/users/:userId/chat/:chatId"} component={ChatDetails} />
                    <Route path={"/users/new"} exact component={UsersEdit} />
                    <Route path={"/users/:id/edit"} exact component={UsersEdit} />
                    <Route path={"/users/:id"} component={UsersDetails} />
                    <Route path={"/users"} component={UsersList} />
                    <Redirect to={"/users"} />
                </Switch>
            </Router>
            <Dialog />
        </Suspense>
    )
})

export default App
