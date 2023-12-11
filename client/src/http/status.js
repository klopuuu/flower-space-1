import axios from 'axios';
import { $host } from "./index";

export const getAllStatus = async() => {
    const {data} = await axios .get(`${$host}api/statusord/getstatusorder`)
    return data
}

export const getOneStatus = async(status) => {
    const {data} = await axios .get(`${$host}api/statusord/getonestatus/${status}`)
    return data
}

export const getOneStatusId = async(id) => {
    const {data} = await axios .get(`${$host}api/statusord/getonestatusid/${id}`)
    return data
}