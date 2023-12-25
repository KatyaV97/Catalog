import axios from "axios"
import type {Device, RowTitle} from "@/constants/componentsTypes"
import type {GetterTree, MutationTree} from 'vuex'

enum MutationTypes {
    setAllDevices = 'setAllDevices',
    setCountDevicesForCompare = 'setCountDevicesForCompare',
    setDevicesForCompare = 'setDevicesForCompare',
    setUnusedDevices = 'setUnusedDevices',
    setShowDifference = 'setShowDifference',
    changeDevices = 'changeDevices',
    filteredRowsTitles = 'filteredRowsTitles',
    setFilteredRowsTitles = 'setFilteredRowsTitles',
}

type Mutations<S = State> = {
    [MutationTypes.setAllDevices](state: S, payload: Device[]): void
    [MutationTypes.setCountDevicesForCompare](state: S, payload: number): void
    [MutationTypes.setDevicesForCompare](state: S): void
    [MutationTypes.setUnusedDevices](state: S): void
    [MutationTypes.setShowDifference](state: S, payload: boolean): void
    [MutationTypes.changeDevices](state: S, payload: { newId: string, oldId: string }): void
    [MutationTypes.filteredRowsTitles](state: S): void
    [MutationTypes.setFilteredRowsTitles](state: S): void
}

enum ActionTypes {
    getDevices = 'getDevices',
}

type Getters = {
    getCountDevicesForCompare(state: State): number
    getAllDevices(state: State): Device[]
    getDevicesForCompare(state: State): Device[]
    getUnusedDevices(state: State): Device[]
    getShowDifference(state: State): boolean
    getFilteredRowsTitles(state: State): RowTitle[]
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

const getters: GetterTree<State, State> & Getters = {
    getCountDevicesForCompare: (state: State) => {
        return state.countDevicesForCompare
    },
    getAllDevices: (state: State) => {
        return state.allDevices
    },
    getDevicesForCompare: (state: State) => {
        return state.devicesForCompare
    },
    getUnusedDevices: (state: State) => {
        return state.unusedDevices
    },
    getShowDifference: (state: State) => {
        return state.showDifference
    },
    getFilteredRowsTitles: (state: State) => {
        return state.filteredRowsTitles
    },
}

const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.setAllDevices](state: State, payload: Device[]) {
        return state.allDevices = payload
    },

    [MutationTypes.setCountDevicesForCompare](state: State, payload: number) {
        return state.countDevicesForCompare = payload
    },

    [MutationTypes.setDevicesForCompare](state: State) {
        return state.devicesForCompare = state.allDevices.slice(0, state.countDevicesForCompare)
    },

    [MutationTypes.setUnusedDevices](state: State) {
        if (state.allDevices.length > 0) {
            return state.unusedDevices = state.allDevices.slice(state.countDevicesForCompare)
        }
        return state.unusedDevices = []
    },

    [MutationTypes.setShowDifference](state: State, payload: boolean) {
        return state.showDifference = payload
    },

    [MutationTypes.changeDevices](state: State, payload: { newId: string, oldId: string }) {
        const index = state.allDevices.findIndex((device: Device) => {
            return device.id === payload.oldId
        })
        const indexUnusedDevice = state.allDevices.findIndex((device: Device) => {
            return device.id === payload.newId
        })

        const deviceUnused = state.allDevices[index]

        state.allDevices.splice(index, 1, state.allDevices[indexUnusedDevice])
        return state.allDevices.splice(indexUnusedDevice, 1, deviceUnused)
    },

    [MutationTypes.filteredRowsTitles](state: State) {
        let parametersWithDifference: string = []

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

    [MutationTypes.setFilteredRowsTitles](state: State) {
        return state.filteredRowsTitles = state.rowsTitles.slice()
    }
}

const actions = {
    async [ActionTypes.getDevices]({commit}) {
        try {
            const response = await axios.get('http://localhost:8999/api/')
            commit('setAllDevices', response.data)
            commit('setUnusedDevices')
        } catch (e) {
            commit('setAllDevices', [])
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}