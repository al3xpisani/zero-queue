import fetchFirebaseDataMatch, {
    addFirebaseDocument,
    fetchAllFirebaseData,
    deleteFirebaseDoc,
    updateFirebaseDocument
} from '../config/fetchFirebaseData'
import { v4 as uuidv4 } from 'uuid'
import { DiagramSchema } from '../types'

export const createDiagramService = async (diagramData: DiagramSchema) => {
    try {
        const id = uuidv4()
        diagramData['id'] = id
        diagramData['name'] = 'workflow' + id.substring(0, 8)
        diagramData['creation'] = new Date().toISOString()
        await addFirebaseDocument(diagramData, process.env.COLLECTION_NAME)
        return diagramData
    } catch (e) {
        console.error('Error when creating diagram :  ', e)
    }
}

export const listDiagramsByIdService = async (
    field: string,
    fieldValue: string
) => {
    try {
        const respAlldiagrams = await fetchFirebaseDataMatch(
            process.env.COLLECTION_NAME,
            field,
            fieldValue,
            field,
            'true'
        )
        return respAlldiagrams
    } catch (e) {
        console.error('Error when listing diagrams :  ', e)
    }
}

export const listDiagramsService = async () => {
    try {
        const respAlldiagrams = await fetchAllFirebaseData(
            process.env.COLLECTION_NAME,
            'name',
            'true'
        )
        return respAlldiagrams
    } catch (e) {
        console.error('Error when listing diagrams :  ', e)
    }
}

export const editDiagramsService = async (
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
        console.error('Error when editing diagrams :  ', e)
    }
}

export const deleteDiagramsService = async (
    fieldName: string,
    fieldValue: string
) => {
    try {
        return deleteFirebaseDoc(
            process.env.COLLECTION_NAME,
            fieldName,
            fieldValue
        )
    } catch (e) {
        console.error('Error when deleting Diagrams :  ', e)
    }
}
