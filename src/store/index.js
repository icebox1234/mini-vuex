import { createStore } from '../../mini-vuex';

const store = createStore({
    strict: true,
    state() {
        return {
            count: 1
        }
    },
    mutations: {
        add(state) {
            state.count++;
        }
    },
    getters: {
        doubleCounter(state) {
            return state.count * 2;
        }
    },
    actions: {
        addAction({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        }
    }
});

export { store };