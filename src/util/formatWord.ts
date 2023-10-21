import { Servicetype } from '../types'

export const clearAccentCapitalize = (word: Servicetype) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    return capitalized
        .replace(/\s+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') as Servicetype
}
