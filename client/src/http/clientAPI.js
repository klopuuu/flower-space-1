import axios from 'axios';
import { $host } from "./index";

export const createBinderClient = async(userId) => {
    const {data} = await axios .post(`${$host}api/clientbase/${userId}`)
    return data
}

export const getAllclient = async(binderclientbaseId) => {
    const {data} = await axios .get(`${$host}api/clientbase/getclient/${binderclientbaseId}`)
    return data
}

export const createClient = async(id, name, surname, phonenumber, address) => {
    const {data} = await axios .post(`${$host}api/clientbase/client/${id}`,{name, surname, phonenumber, address})
    return data
}

export const deleteClient = async(id) => {
    const {data} = await axios .delete(`${$host}api/clientbase/${id}`)
    return data
}

export const updateClient = async(id,name, surname, phonenumber, address) => {
    const {data} = await axios .patch(`${$host}api/clientbase/${id}`,{name, surname, phonenumber, address})
    return data
}

export const getOneClient = async(clientid) => {
    const {data} = await axios .get(`${$host}api/clientbase/getoneclient/${clientid}`)
    return data
}

export const searchClient = async(phonenumber) => {
    const {data} = await axios .get(`${$host}api/clientbase/searchclient/${phonenumber}`)
    return data
}