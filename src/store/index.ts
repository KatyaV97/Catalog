import type {ComponentCustomProperties} from 'vue'
import Vuex from 'vuex'
import {Store} from 'vuex'
import devices from "@/store/devices"

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
        count: number
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}

export default new Vuex.Store({
    modules: {
        devices
    }
})