<template>
    <div class="container">
        <search-bar :word="$route.params.word"></search-bar>
        <!-- 搜索结果分类 -->
        <kind-bar></kind-bar>
    </div>
</template>

<script>
import searchBar from '../components/search/search-bar';
import kindBar from '../components/search/kind-bar';

export default {
    components: {
        searchBar,
        kindBar
    }
}
</script>

<style lang="scss" scoped>
    .container {
        background: white;
        padding: 0 20px;
    }
</style>