import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._id = 0
        makeAutoObservable(this)
    }
    
    //для изменений
    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setId(id) {
        this._id = id
    }
    //получаем переменные из состояний
    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get id() {
        return this._id
    }
}

