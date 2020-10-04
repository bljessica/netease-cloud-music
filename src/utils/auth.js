//获取权限token，并放入cookie


function getToken() {
    return this.$store.getters.token;
}

export {
    getToken
}