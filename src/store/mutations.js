import * as types from './mutation-types';

const mutations = {
    [types.SET_AVATAR_URL](state, avatarUrl) {
        state.avatarUrl = avatarUrl;
    },
    [types.SET_BIRTHDAY](state, birthday) {
        state.birthday = birthday;
    },
    [types.SET_CITY](state, city) {
        state.city = city;
    },
    [types.SET_FOLLOWEDS](state, followeds) {
        state.followeds = followeds;
    },
    [types.SET_FOLLOWS](state, follows) {
        state.follows = follows;
    },
    [types.SET_GENDER](state, gender) {
        state.gender = gender;
    },
    [types.SET_IS_LOGIN](state, isLogin) {
        state.isLogin = isLogin;
    },
    [types.SET_NICKNAME](state, nickname) {
        state.nickname = nickname;
    },
    [types.SET_PHONE](state, phone) {
        state.phone = phone;
    },
    [types.SET_PROVINCE](state, province) {
        state.province = province;
    },
    [types.SET_TOKEN](state, token) {
        state.token = token;
    },
    [types.SET_USERNAME](state, username) {
        state.username = username;
    },
    [types.SET_USER_ID](state, userID) {
        state.userID = userID;
    }
}


export default mutations;