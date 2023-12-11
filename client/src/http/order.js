import axios from 'axios';
import { $host } from "./index";

export const createBinderOrder = async(userId) => {
    const {data} = await axios .post(`${$host}api/order/createbinderorders/${userId}`)
    return data
}

export const createOrder = async(userId,adddescription, dateOFcreation, dateField, price,addres, clientbaseId, bouquetcategoryId, receivingId, statusorderId) => {
    const {data} = await axios .post(`${$host}api/order/createorders/${userId}`,{adddescription, dateOFcreation, dateField, price, addres, clientbaseId, bouquetcategoryId, receivingId, statusorderId})
    return data
}

export const getAllOrder = async(userId, boleanOrder) => {
    const {data} = await axios .get(`${$host}api/order/getorders/${userId}/${boleanOrder}`)
    return data
}

export const getOneOrder = async(userId, orderId) => {
    const {data} = await axios .get(`${$host}api/order/getoneorders/${userId}/${orderId}`)
    return data
}

export const updateOrder = async(id, statusorderId) => {
    const {data} = await axios .patch(`${$host}api/order/${id}`,{statusorderId})
    return data
}

export const getAllOrderWhere = async(userId, telephone) => {
    const {data} = await axios .get(`${$host}api/order/getallorderswhere/${userId}/${telephone}`)
    return data
}