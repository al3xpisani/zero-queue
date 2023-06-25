import { getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore"
import { addDoc, db, collection } from "./firebase-config"
import { HouseSchema } from "../types"

export const deleteFirebaseDoc = async (
    collectionName: string,
    searchFieldName: string,
    searchValue: string
) => {
    const firebaseQuery = query(
        collection(db, collectionName),
        where(searchFieldName, "==", searchValue)
    )

    const promises = []
    const querySnapshot = await getDocs(firebaseQuery)

    await new Promise<void>((resolve) => {
        querySnapshot.forEach((doc) => {
            promises.push({
                status: "Registro excluído",
                deletedItem: doc.data()
            })
            deleteDoc(doc.ref)
        })
        resolve()
    })
    return promises.length === 0
        ? { status: searchFieldName + " não encontrado para ser excluido" }
        : promises
}

export const fetchAllFirebaseData = async (
    collectionName: string,
    orderByField: string,
    isAscSorted: string
) => {
    const firebaseQuery = query(
        collection(db, collectionName),
        orderBy(orderByField, isAscSorted ? "asc" : "desc")
    )

    const entity = []
    const querySnapshot = await getDocs(firebaseQuery)
    querySnapshot.forEach((doc) => {
        entity.push(doc.data())
    })
    return entity
}

const fetchFirebaseDataMatch = async (
    collectionName: string,
    searchFieldName: string,
    searchValue: string,
    orderByField: string,
    isAscSorted: string
) => {
    const firebaseQuery = query(
        collection(db, collectionName),
        where(searchFieldName, "==", searchValue),
        orderBy(orderByField, isAscSorted ? "asc" : "desc")
    )

    const entity = []
    const querySnapshot = await getDocs(firebaseQuery)
    querySnapshot.forEach((doc) => {
        entity.push(doc.data())
    })
    return entity
}

export const fetchFirebaseLikeAt = async (
    collectionName: string,
    searchFieldName: string,
    searchValue: string,
    searchFieldName1: string,
    searchValue1: string
) => {
    const entity = []
    try {
        const startAtNameRes = query(
            collection(db, collectionName),
            where(searchFieldName, "==", searchValue),
            where(searchFieldName1, ">=", searchValue1),
            where(searchFieldName1, "<=", searchValue1 + "\uf8ff")
        )

        const querySnapshot = await getDocs(startAtNameRes)
        querySnapshot.forEach((doc) => {
            entity.push(doc.data())
        })
    } catch (error) {
        console.log("error from firebase query fields starting with ", error)
    }
    return entity
}

export const addFirebaseDocument = async (
    documentEntity: HouseSchema,
    collectionName: string
) => {
    try {
        return addDoc(collection(db, collectionName), documentEntity)
    } catch (e) {
        console.error(`Erro ao adicionar ${documentEntity}`, e)
    }
}

export default fetchFirebaseDataMatch
