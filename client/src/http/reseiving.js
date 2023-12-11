import axios from 'axios';
import { $host } from "./index";

export const getAllReseiving = async() => {
    const {data} = await axios .get(`${$host}api/receiving/getreceiving`)
    return data
}

export const getOneReseiving = async(choisercv) => {
    const {data} = await axios .get(`${$host}api/receiving/getonereceiving/${choisercv}`)
    return data
}