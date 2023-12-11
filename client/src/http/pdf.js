import axios from 'axios';
import { $host } from "./index";

export const createPdf = async(userId) => {
    const {data} = await axios .get(`${$host}api/pdf/generatepdf/${userId}`)
    return data
}
