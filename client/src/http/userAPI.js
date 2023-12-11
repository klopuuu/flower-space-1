import {$authHost, $host } from "./index";
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const registration = async(email, password, name, surname, age, workexperience, address, number) => {
    const {data} = await axios .post(`${$host}api/user/registration`, {email, password, name, surname, age, workexperience, address, number})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async(email, password) => {
    const {data} = await axios .post(`${$host}api/user/login`, {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async() => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getAll = async(id) => {
    const {data} = await axios .get(`${$host}api/user/${id}`)
    return data
}

export const update = async(id,name, surname, age, workexperience, address, number) => {
    const {data} = await axios .patch(`${$host}api/user/${id}`,{name, surname, age, workexperience, address, number})
    return data
}
