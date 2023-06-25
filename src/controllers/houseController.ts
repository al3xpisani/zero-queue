import {
    addFirebaseDocument,
    fetchAllFirebaseData,
    deleteFirebaseDoc
} from "../config/fetchFirebaseData"
import fetchFirebaseDataMatch from "../config/fetchFirebaseData"
import { v4 as uuidv4 } from "uuid"
import { HouseSchema, tvSeries } from "../types"

export const addHouse = async (houseData: HouseSchema) => {
    try {
        const seasons = await getSeasons(houseData)
        if (seasons) {
            houseData["seasons"] = { items: seasons }
        }
        houseData["id"] = uuidv4()
        await addFirebaseDocument(houseData, process.env.COLLECTION_NAME)
        console.info("House adicionada com sucesso")
    } catch (e) {
        console.error("Falha ao adicionar House :  ", e)
    }
}
const getSeasons = async (characterURL: HouseSchema) => {
    const { currentLord } = characterURL
    const response = await fetch(currentLord)
    const resultSet: tvSeries = await response.json()
    const doubleQuoteArray = String(resultSet["tvSeries"])
        .replace(/'/g, '"')
        .split(",")
    return doubleQuoteArray
}
export const listHouses = async () => {
    try {
        const respAllHouses = await fetchAllFirebaseData(
            process.env.COLLECTION_NAME,
            "region",
            "true"
        )
        console.info("Listagem houses ok")
        return respAllHouses
    } catch (e) {
        console.error("Falha ao Listar houses :  ", e)
    }
}
export const findByHouseField = async (houseName: string, field: string) => {
    try {
        const respFetchByField = await fetchFirebaseDataMatch(
            process.env.COLLECTION_NAME,
            field,
            houseName,
            field,
            "true"
        )
        console.info("Listagem findByField houses ok")
        return respFetchByField
    } catch (e) {
        console.error("Falha ao Listar findByField houses :  ", e)
    }
}
export const deleteRecordByField = (houseName: string, field: string) => {
    try {
        return deleteFirebaseDoc(process.env.COLLECTION_NAME, field, houseName)
    } catch (e) {
        console.error("Falha ao Excluir :  ", e)
    }
}
