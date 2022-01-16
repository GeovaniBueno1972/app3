import {useContext} from "react";
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';

export const useAppContext = () => {
    return {uiCtx: useContext(UIContext), authCtx: useContext(AuthContext)};
}