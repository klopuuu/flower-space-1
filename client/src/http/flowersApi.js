import axios from 'axios';
import { $host } from "./index";

export const createBinderFlower = async(userId) => {
    const {data} = await axios .post(`${$host}api/flowers/${userId}`)
    return data
}

export const getAllFlowers = async(binderflowerId) => {
    const {data} = await axios .get(`${$host}api/flowers/${binderflowerId}`)
    return data
}

export const getOneFlowers = async(flowersid) => {
    const {data} = await axios .get(`${$host}api/flowers/getoneflowers/${flowersid}`)
    return data
}

export const updateFlower = async(id,name, price, quantity) => {
    const {data} = await axios .patch(`${$host}api/flowers/${id}`,{name, price, quantity})
    return data
}

export const updateFlowerforChange = async(id, quantity) => {
    const {data} = await axios .patch(`${$host}api/flowers/${id}`,{quantity})
    return data
}

export const deleteFlower = async(id) => {
    const {data} = await axios .delete(`${$host}api/flowers/${id}`)
    return data
}

export const searchFlowers = async(name) => {
    const {data} = await axios .get(`${$host}api/flowers/searchflowers/${name}`)
    return data
}

export const searchFlowersFilter = async(id) => {
    const {data} = await axios .get(`${$host}api/flowers/searchfilter/${id}`)
    return data
}