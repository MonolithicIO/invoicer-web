import {Route, Routes} from "react-router-dom";
import SignInScreen from "../ui/screens/signin/SignInScreen.tsx";

export default function AuthRouter() {
    return <Routes>
        <Route path="/signin" element={<SignInScreen/>}/>
        <Route path="/signup"></Route>
    </Routes>
}