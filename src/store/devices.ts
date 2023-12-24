import axios from "axios"
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
    hasNFC: boolean,
    hasESIM: boolean,
    hasWirelessCharge: boolean,
    price: number,
    imgPath: string,
}

type RowTitle = {
    title: string,
    parameter: string,
    unit: string | null
}

export interface State {
    allDevices: Device [],
    devicesForCompare: Device [],
    unusedDevices: Device [],
    countDevicesForCompare: number,
    showDifference: boolean,
    filteredRowsTitles: RowTitle[],
    rowsTitles: RowTitle[],
}

const state = (): State => ({
    allDevices: [],
    devicesForCompare: [],
    unusedDevices: [],
    countDevicesForCompare: 3,
    showDifference: false,
    filteredRowsTitles: [],
    rowsTitles: [
        {
            title: 'Производитель',
            parameter: 'brand',
            unit: null
        },
        {
            title: 'год релиза',
            parameter: 'releaseYear',
            unit: null
        },
        {
            title: 'Диагональ экрана (дюйм)',
            parameter: 'displaySize',
            unit: null
        },
        {
            title: 'Страна-производитель',
            parameter: 'manufactureCountry',
            unit: null
        },
        {
            title: 'Объем памяти',
            parameter: 'memory',
            unit: 'Гб'
        },
        {
            title: 'Частота обновления экрана',
            parameter: 'displayRefreshRate',
            unit: null
        },
        {
            title: 'NFC',
            parameter: 'hasNFC',
            unit: null
        },
        {
            title: 'Поддержка eSIM',
            parameter: 'hasESIM',
            unit: null
        },
        {
            title: 'Поддержка беспроводной зарядки',
            parameter: 'hasWirelessCharge',
            unit: null
        },
        {
            title: 'Стоимость',
            parameter: 'price',
            unit: '₽'
        }
    ]
})

const getters = {

    getCountDevicesForCompare(state: State) {
        return state.countDevicesForCompare
    },
    getAllDevices(state: State) {
        return state.allDevices
    },
    getDevicesForCompare(state: State) {
        return state.devicesForCompare
    },
    getUnusedDevices(state: State) {
        return state.unusedDevices
    },
    getShowDifference(state: State) {
        return state.showDifference
    },
    getFilteredRowsTitles(state: State) {
        return state.filteredRowsTitles
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
        if (state.allDevices.length > 0) {
            return state.unusedDevices = state.allDevices.slice(state.countDevicesForCompare)
        }
        return []
    },

    setShowDifference(state: State, payload: boolean) {
        return state.showDifference = payload
    },

    changeDevices(state: State, payload: { newId: string, oldId: string }){
        const index = state.allDevices.findIndex(device => {
            return device.id === payload.oldId
        })
        const indexUnusedDevice = state.allDevices.findIndex(device => {
            return device.id === payload.newId
        })

        const deviceUnused = state.allDevices[index]

        state.allDevices.splice(index, 1, state.allDevices[indexUnusedDevice])
        return state.allDevices.splice(indexUnusedDevice, 1, deviceUnused)
    },

    filteredRowsTitles(state: State){
        let parametersWithDifference = []

        state.rowsTitles.forEach((row: RowTitle) => {
            state.devicesForCompare.forEach((device: Device) => {
                if (device[row.parameter] !== state.devicesForCompare[0][row.parameter] &&
                    !parametersWithDifference.includes(row.parameter)) {
                    parametersWithDifference.push(row.parameter)
                }
            })
        })

        return state.filteredRowsTitles = state.rowsTitles.filter((row: RowTitle) => {
            return parametersWithDifference.includes(row.parameter)
        })
    },

    setFilteredRowsTitles(state: State){
        state.filteredRowsTitles = state.rowsTitles.slice()
    }
}

const actions = {
    async getDevices(context: ActionContext) {
        try {
            const response = await axios.get('http://localhost:8999/api/')
            context.commit('setAllDevices', response.data)
            context.commit('setUnusedDevices')
        } catch (e) {
            context.commit('setAllDevices', [])
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