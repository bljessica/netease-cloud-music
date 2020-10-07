<template>
    <div class="container">
        <div class="videos">
                <div class="col-1 col">
                    <li v-for="(item, index) in videos.slice(0, Math.floor(videos.length / 2))" :key="index">

                    </li>
                </div>
                <div class="col-2 col">
                    <li v-for="(item, index) in videos.slice(Math.floor(videos.length / 2))" :key="index">

                    </li>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videos: []
        }
    }
}
</script>

<style>

</style>