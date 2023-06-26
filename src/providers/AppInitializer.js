import {useDispatch} from "react-redux";
import {login} from "../app/auth";

export const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const auth = localStorage.getItem('auth');

    if (auth) {
        dispatch(login(JSON.parse(auth)));
    }

    return <>{children}</>;
}