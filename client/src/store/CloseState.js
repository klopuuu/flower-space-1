import {makeAutoObservable} from "mobx";

export default class CloseState {
    constructor() {
        this._isAuth = false
        makeAutoObservable(this)
    }
    
    //для изменений
    setIsAuth(bool) {
        this._isAuth = bool
    }

    //получаем переменные из состояний
    get isAuth() {
        return this._isAuth
    }
}

