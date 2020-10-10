<template>
    <div class="container">
        <search-bar :word="$route.params.word"></search-bar>
    </div>
</template>

<script>
import searchBar from '../components/search/search-bar';

export default {
    components: {
        searchBar
    },
    mounted() {
        // console.log(this.$route.params.word)
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        background: white;
        // padding: 0 20px;
    }
</style>