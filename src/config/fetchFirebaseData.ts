import {
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    updateDoc
} from "firebase/firestore"
import { addDoc, db, collection } from "./firebase-config"
import { DiagramSchema } from "../types"

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
                status: "Record deleted",
                deletedItem: doc.data()
            })
            deleteDoc(doc.ref)
        })
        resolve()
    })
    return promises.length === 0
        ? { status: searchFieldName + " not found to be deleted" }
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
    documentEntity: DiagramSchema,
    collectionName: string
) => {
    try {
        return addDoc(collection(db, collectionName), documentEntity)
    } catch (e) {
        console.error(`Error when adding ${documentEntity}`, e)
    }
}

export const updateFirebaseDocument = async (
    collectionName: string,
    field: string,
    fieldValue: string,
    body: object
) => {
    try {
        const firebaseQuery = query(
            collection(db, collectionName),
            where(field, "==", fieldValue)
        )

        const promises = []
        const querySnapshot = await getDocs(firebaseQuery)

        await new Promise<void>((resolve) => {
            querySnapshot.forEach((doc) => {
                promises.push({
                    status: "Record updated",
                    updatedItem: doc.data()
                })
                updateDoc(doc.ref, body)
            })
            resolve()
        })
        return promises.length === 0
            ? { status: field + " not found to be updated" }
            : promises
    } catch (e) {
        console.error(`Error when updating ${body}`, e)
    }
}

export default fetchFirebaseDataMatch
