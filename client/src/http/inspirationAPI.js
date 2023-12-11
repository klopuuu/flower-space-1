import axios from 'axios';
import { $host } from "./index";

export const createBinderInspiration = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/binderinspiration/${userId}`)
    return data
}

export const createInspiration = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/${userId}`)
    return data
}

export const createInspiratioRose = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/rose/${userId}`)
    return data
}

export const createInspiratioPeonies = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/peonies/${userId}`)
    return data
}
export const createInspiratioGipsohila = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/gipsophila/${userId}`)
    return data
}
export const createInspiratioChrysant = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/chrysant/${userId}`)
    return data
}
export const createInspiratioChamomile = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/chamomile/${userId}`)
    return data
}
export const createInspiratio = async(userId) => {
    const {data} = await axios .post(`${$host}api/inspiration/generate/rose/${userId}`)
    return data
}
export const getInspiration = async(userId) => {
    const {data} = await axios .get(`${$host}api/inspiration/getgenerate/${userId}`)
    return data
}