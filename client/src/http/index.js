import axios from "axios";

const $host = process.env.REACT_APP_API_URL

const $authHost = axios.create()

$authHost.defaults.baseURL = process.env.REACT_APP_API_URL

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` // Добавить токен
    return config
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}