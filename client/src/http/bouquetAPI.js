import axios from 'axios';
import { $host } from "./index";

export const createBinderBouquet = async(userId) => {
    const {data} = await axios .post(`${$host}api/bouquet/${userId}`)
    return data
}


export const getAllBouquet = async(id, id_category) => {
    const {data} = await axios .get(`${$host}api/bouquet/${id}/${id_category}`)
    return data
}

export const deleteupdateBouquet = async(id) => {
    const {data} = await axios .patch(`${$host}api/bouquet/${id}`)
    return data
}

export const searchBouquet = async(name, id) => {
    const {data} = await axios .get(`${$host}api/bouquet/searchbouquet/${name}/${id}`)
    return data
}

///searchbouquetcategories/:name/:id

export const searchBouquetCategories = async(name, id) => {
    const {data} = await axios .get(`${$host}api/bouquet/searchbouquetcategories/${name}/${id}`)
    return data
}

export const bouquetcategory = async(id, id_bouquet, id_category) => {
    const {data} = await axios .post(`${$host}api/bouquetcategory/createbouquetcategory/${id}`,{id_bouquet, id_category})
    return data
}

export const getbouquetcategory = async(id, id_category) => {
    const {data} = await axios .get(`${$host}api/bouquetcategory/${id}`, id_category)
    return data
}

export const createBinderCategory = async(id) => {
    const {data} = await axios .post(`${$host}api/bouquetcategory/createbouquetbindercategory/${id}`)
    return data
}

export const getonebouquetcategory = async(id, iduser) => {
    const {data} = await axios .get(`${$host}api/bouquetcategory/getonecategory/${id}/${iduser}`)
    return data
}

export const getonebouquet = async(id, idbouquet) => {
    const {data} = await axios .get(`${$host}api/bouquet/getonebouquet/${id}/${idbouquet}`)
    return data
}
