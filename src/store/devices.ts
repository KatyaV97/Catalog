//import axios from "axios"
import type {ActionContext} from "vuex";

type Device = {
    id: string,
    model: string,
    brand: string,
    releaseYear: string,
    displaySize: number,
    manufactureCountry: string,
    memory: number,
    displayRefreshRate: number,
    haveNFC: boolean,
    haveESIM: boolean,
    haveWireless: boolean,
    price: number,
    imgPath: string,
}

export interface State {
    allDevices: Device [],
    devicesForCompare: Device [],
    unusedDevices: Device [],
    countDevicesForCompare: number
}

const state = (): State => ({
    allDevices: [],
    devicesForCompare: [],
    unusedDevices: [],
    countDevicesForCompare: 3
})

const getters = {

    getCountDevicesForCompare(state: State) {
        return state.countDevicesForCompare
    },
    getAllDevices(state: State) {
        return state.allDevices
    },
    getDevicesForCompare(state: State) {
        console.log(2)
        return state.devicesForCompare
    },
    getUnusedDevices(state: State) {
        console.log(state.unusedDevices)
        return state.unusedDevices
    },
}

const mutations = {
    setAllDevices(state: State, payload: Device[]) {
        return state.allDevices = payload
    },

    setCountDevicesForCompare(state: State, payload: number) {
        return state.countDevicesForCompare = payload
    },

    setDevicesForCompare(state: State) {
        return state.devicesForCompare = state.allDevices.slice(0, state.countDevicesForCompare)
    },

    setUnusedDevices(state: State) {
        return state.unusedDevices = state.allDevices.slice(state.countDevicesForCompare)
    },

    changeDevicesForCompare(state: State, payload: { newId: string, oldId: string }) {
        const index= state.devicesForCompare.findIndex(device => {
            return device.id === payload.oldId
        })
        const indexUnusedDevice= state.unusedDevices.findIndex(device => {
            return device.id === payload.newId
        })

        return state.devicesForCompare.splice(index, 1, state.unusedDevices[indexUnusedDevice])
    },

    changeUnusedDevices(state: State, payload: { newId: string, oldId: string }) {
        const indexUnusedDevice = state.unusedDevices.findIndex(device => {
            return device.id === payload.newId
        })

        const indexInAllDevices = state.allDevices.findIndex(device => {
            return device.id === payload.oldId
        })

        return state.unusedDevices.splice(indexUnusedDevice, 1, state.allDevices[indexInAllDevices])
    }
}

const actions = {
    async getDevices(context: ActionContext) {
        try {
            console.log(123)
            //const response = await axios.post(${PROMOCODES}, payload)
            const response = [
                {
                    id: '1frwe',
                    model: 'Apple iPhone 12',
                    brand: 'Apple',
                    releaseYear: 2020,
                    displaySize: 6.1,
                    manufactureCountry: 'China',
                    memory: 128,
                    displayRefreshRate: 60,
                    haveNFC: false,
                    haveESIM: true,
                    haveWireless: true,
                    price: 81990,
                    imgPath: 'Apple12.png',
                },
                {
                    id: '45jwe',
                    model: 'Xiaomi Mi 11 Lite',
                    brand: 'Apple',
                    releaseYear: 2021,
                    displaySize: 6.55,
                    manufactureCountry: 'China',
                    memory: 128,
                    displayRefreshRate: 90,
                    haveNFC: true,
                    haveESIM: true,
                    haveWireless: false,
                    price: 27490,
                    imgPath: 'Xiaomi11Lite.png',
                },
                {
                    id: 'dfg45',
                    model: 'Samsung Galaxy A72',
                    brand: 'Samsung',
                    releaseYear: 2021,
                    displaySize: 6.7,
                    manufactureCountry: 'Vietnam',
                    memory: 128,
                    displayRefreshRate: 90,
                    haveNFC: true,
                    haveESIM: false,
                    haveWireless: true,
                    price: 32890,
                    imgPath: 'SamsungA72.png',
                },
                {
                    id: 'koiu8',
                    model: 'Samsung Galaxy S21',
                    brand: 'Samsung',
                    releaseYear: 2021,
                    displaySize: 6.2,
                    manufactureCountry: 'Vietnam',
                    memory: 256,
                    displayRefreshRate: 120,
                    haveNFC: true,
                    haveESIM: true,
                    haveWireless: true,
                    price: 79999,
                    imgPath: 'SamsungS21.jpg',
                },
                {
                    id: '41dgh',
                    model: 'Apple iPhone Xr',
                    brand: 'Apple',
                    releaseYear: 2018,
                    displaySize: 6.1,
                    manufactureCountry: 'China',
                    memory: 128,
                    displayRefreshRate: 60,
                    haveNFC: true,
                    haveESIM: true,
                    haveWireless: true,
                    price: 81499,
                    imgPath: 'AppleXr.jpg',
                },
                {
                    id: 'ret67',
                    model: 'Readmi 8 Pro',
                    brand: 'Xiaomi',
                    releaseYear: 2019,
                    displaySize: 6.53,
                    manufactureCountry: 'China',
                    memory: 128,
                    displayRefreshRate: 60,
                    haveNFC: true,
                    haveESIM: false,
                    haveWireless: false,
                    price: 18999,
                    imgPath: 'Readmi8Pro.jpeg',
                }
            ]
            context.commit('setAllDevices', response)
            context.commit('setUnusedDevices')
        } catch (e) {
            console.log(e)
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}