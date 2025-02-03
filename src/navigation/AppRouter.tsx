import {BrowserRouter as Router} from 'react-router-dom';
import AuthRouter from "../features/auth/navigation/AuthRouter.tsx";


export default function AppRouter() {
    return (
        <Router>
            <AuthRouter/>
        </Router>
    )
}