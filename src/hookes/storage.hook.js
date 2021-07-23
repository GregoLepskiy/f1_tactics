import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
    const setItem = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.log(error);
        }
    },
    getItem = async (key) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return JSON.parse(item);
        } catch (error) {
            console.log(error);}
    },
    removeItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);}
    },
    updateItem = async (key, value) => {
        try {
            const item = await AsyncStorage.getItem(key),
                result = {...JSON.parse(item), ...value};

            await AsyncStorage.setItem(key, JSON.stringify(result));
        } catch (error) {
            console.log(error);}
    }

    return { setItem, getItem, removeItem, updateItem }
}