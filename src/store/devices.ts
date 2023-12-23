//import axios from "axios"

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
    devicesForCompare: Device []
}

const state = (): State => ({
    allDevices: [],
    devicesForCompare: []
})

const getters = {
    getAllDevices(state) {
        return state.allDevices
    },
    getDevicesForCompare(state) {
        console.log(2)
        return state.devicesForCompare
    },
}

const mutations = {
    setAllDevices(state, payload) {
        return state.allDevices = payload
    },

    setDevicesForCompare(state, payload) {
        console.log(payload)
        return state.devicesForCompare = state.allDevices.slice(0, payload)
    },

    changeDevicesForCompare(state, payload) {

    }
}

const actions = {
    async getDevices(context) {
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
                    brand: 'Xiaomi',
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
                    price: 709999,
                    imgPath: 'SamsungS21.png',
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
                    imgPath: 'AppleXr.png',
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
                    imgPath: 'Readmi8Pro.png',
                }
            ]
            context.commit('setAllDevices', response)
        } catch (e) {
            console.log(e)
        }
    },

    async getDevicesForCompare(context, payload){
        console.log(22)
        context.commit('setDevicesForCompare', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}