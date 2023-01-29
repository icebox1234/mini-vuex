import { reactive, computed, watch } from 'vue';

export function createStore(options) {
    const store = {
        install(app) {
            app.config.globalProperties.$store = this;
        },
        _state: reactive(options.state()),
        get state() {
            return this._state;
        },
        set state(v) {
            return;
        },
        _mutations: options.mutations,
        _actions: options.actions,
        _commit: false,
        _withCommit(fn) {
            this._commit = true;
            fn();
            this._commit = false;
        }
    };

    function commit(type, payload) {
        const entry = this._mutations[type];
        if (entry) {
            this._withCommit(() => {
                entry.call(this, this.state, payload);
            });
        } else {
            console.error(`mutation ${type} not exsist`);
        }
    }

    function dispatch(type, payload) {
        const entry = this._actions[type];
        if (entry) {
            return entry.call(this, this, payload);
        } else {
            console.error(`action ${type} not exsist`);
            return;
        }
    }

    store.commit = commit.bind(store);
    store.dispatch = dispatch.bind(store);
    store.getters = {};
    Object.keys(options.getters).forEach(key => {
        const res = computed(() => {
            const getter = options.getters[key];
            if (getter) {
                return getter.call(store, store.state);
            } else {
                console.error(`${key} not exsist`);
                return;
            }
        })
        Object.defineProperty(store.getters, key, {
            get() {
                return res;
            },
            set() { }
        })
    })

    if (options.strict) {
        watch(
            store.state,
            () => {
                if (!store._commit) {
                    console.error('use commit');
                }
            },
            { deep: true, flush: 'sync' }
        )
    }

    return store;
}