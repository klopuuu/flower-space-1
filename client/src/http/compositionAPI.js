import axios from 'axios';
import { $host } from "./index";

export const getAllCompositionWhere = async(userId, compositionId) => {
    const {data} = await axios .get(`${$host}api/composition/getcomposition/${userId}/${compositionId}`)
    return data
}

export const createBinderComposition = async(id) => {
    const {data} = await axios .post(`${$host}api/composition/${id}`)
    return data
}