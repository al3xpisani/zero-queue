import {
    addFirebaseDocument,
    fetchAllFirebaseData,
    deleteFirebaseDoc,
    updateFirebaseDocument
} from "../config/fetchFirebaseData"
import { v4 as uuidv4 } from "uuid"
import { DiagramSchema } from "../types"

export const createDiagram = async (diagramData: DiagramSchema) => {
    try {
        diagramData["id"] = uuidv4()
        await addFirebaseDocument(diagramData, process.env.COLLECTION_NAME)
    } catch (e) {
        console.error("Error when creating diagram :  ", e)
    }
}
export const listDiagrams = async () => {
    try {
        const respAlldiagrams = await fetchAllFirebaseData(
            process.env.COLLECTION_NAME,
            "name",
            "true"
        )
        return respAlldiagrams
    } catch (e) {
        console.error("Error when listing diagrams :  ", e)
    }
}
export const editDiagrams = async (
    field: string,
    fieldValue: string,
    body: object
) => {
    try {
        const respFetchByField = await updateFirebaseDocument(
            process.env.COLLECTION_NAME,
            field,
            fieldValue,
            body
        )
        return respFetchByField
    } catch (e) {
        console.error("Error when editing diagrams :  ", e)
    }
}
export const deleteDiagrams = (fieldName: string, fieldValue: string) => {
    try {
        return deleteFirebaseDoc(
            process.env.COLLECTION_NAME,
            fieldName,
            fieldValue
        )
    } catch (e) {
        console.error("Error when deleting Diagrams :  ", e)
    }
}
