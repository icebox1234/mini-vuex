<script setup>
</script>

<template>
    <div class="title">mini vuex</div>
    <div @click="$store.commit('add')">commit: {{ $store.state.count }}</div>
    <div @click="$store.state.count++">commit error: {{ $store.state.count }}</div>
    <div @click="$store.dispatch('addAction')">dispatch: {{ $store.state.count }}</div>
    <div>double: {{ $store.getters.doubleCounter }}</div>
</template>

<style scoped>
.title {
    font-size: 20px;
}
</style>
