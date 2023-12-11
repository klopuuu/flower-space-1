import axios from 'axios';
import { $host } from "./index";

export const getAllGuidFlower = async() => {
    const {data} = await axios .get(`${$host}api/guideflower/getguide`)
    return data
}

export const searchGuid = async(name) => {
    const {data} = await axios .get(`${$host}api/guideflower/searchguid/search?key=${name}`)
    return data
}
