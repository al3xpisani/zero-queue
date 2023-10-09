import { DiagramSchema } from '../types'
import {
    createDiagramService,
    listDiagramsByIdService,
    listDiagramsService,
    editDiagramsService,
    deleteDiagramsService
} from '../services/diagramService'

export const createDiagram = async (diagramData: DiagramSchema) => {
    try {
        return await createDiagramService(diagramData)
    } catch (error) {
        throw new Error('Error creating diagram: ' + error.message)
    }
}
export const listDiagramsById = async (field: string, fieldValue: string) => {
    try {
        return await listDiagramsByIdService(field, fieldValue)
    } catch (error) {
        throw new Error('Error listing diagrams: ' + error.message)
    }
}
export const listDiagrams = async () => {
    try {
        return await listDiagramsService()
    } catch (error) {
        throw new Error('Error listing diagrams: ' + error.message)
    }
}
export const editDiagrams = async (
    field: string,
    fieldValue: string,
    body: object
) => {
    try {
        return await editDiagramsService(field, fieldValue, body)
    } catch (error) {
        throw new Error('Error editing diagrams: ' + error.message)
    }
}
export const deleteDiagrams = async (fieldName: string, fieldValue: string) => {
    try {
        return await deleteDiagramsService(fieldName, fieldValue)
    } catch (error) {
        throw new Error('Error deleting diagrams: ' + error.message)
    }
}
