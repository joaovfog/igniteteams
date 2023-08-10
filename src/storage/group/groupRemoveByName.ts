import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllGroups } from "./getAllGroups"

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"

export async function groupRemoveByName(deletedGroup: string) {
    try {
        const storedGroups = await getAllGroups()
        const groups = storedGroups.filter(group => group !== deletedGroup)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`)
    } catch(error) {
        throw error
    }
}