<template>
    <div class="rebase-wrap">
        <ul class="list-wrap">
            <li class="list-item" v-for="i in 8" :key="i">
                这是第{{i}}个
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "rebase"
    }
</script>

<style scoped>

</style>