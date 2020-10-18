import * as types from './mutation-types';

const mutations = {
    [types.SET_AVATAR_URL](state, avatarUrl) {
        state.avatarUrl = avatarUrl;
        localStorage.avatarUrl = avatarUrl;
    },
    [types.SET_BIRTHDAY](state, birthday) {
        state.birthday = birthday;
        localStorage.birthday = birthday;
    },
    [types.SET_CITY](state, city) {
        state.city = city;
        localStorage.city = city;
    },
    [types.SET_FOLLOWEDS](state, followeds) {
        state.followeds = followeds;
        localStorage.followeds = followeds;
    },
    [types.SET_FOLLOWS](state, follows) {
        state.follows = follows;
        localStorage.follows = follows;
    },
    [types.SET_GENDER](state, gender) {
        state.gender = gender;
        localStorage.gender = gender;
    },
    [types.SET_IS_LOGIN](state, isLogin) {
        state.isLogin = isLogin;
        localStorage.isLogin = isLogin;
    },
    [types.SET_NICKNAME](state, nickname) {
        state.nickname = nickname;
        localStorage.nickname = nickname;
    },
    [types.SET_PHONE](state, phone) {
        state.phone = phone;
        localStorage.phone = phone;
    },
    [types.SET_EMAIL](state, email) {
        state.email = email;
        localStorage.email = email;
    },
    [types.SET_PROVINCE](state, province) {
        state.province = province;
        localStorage.province = province;
    },
    [types.SET_TOKEN](state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    [types.SET_USERNAME](state, username) {
        state.username = username;
        localStorage.username = username;
    },
    [types.SET_USER_ID](state, userID) {
        state.userID = userID;
        localStorage.userID = userID;
    },
    [types.SET_PLAY_LIST_COUNT](state, playListCount) {
        state.playListCount = playListCount;
        localStorage.playListCount = playListCount;
    },
    [types.SET_BACKGROUND_URL](state, backgroundUrl) {
        state.backgroundUrl = backgroundUrl;
        localStorage.backgroundUrl = backgroundUrl;
    },
    [types.SET_LEVEL](state, level) {
        state.level = level;
        localStorage.level = level;
    },
    [types.SET_COLLECTED_MENUS](state, collectedMenus) {
        state.collectedMenus = collectedMenus;
        localStorage.collectedMenus = collectedMenus;
    },
    [types.SET_CREATED_MENUS](state, createdMenus) {
        state.createdMenus = createdMenus;
        localStorage.createdMenus = createdMenus;
    },
    [types.SET_PLATLIST](state, playlist) {
        state.playlist = playlist;
        localStorage.playlist = playlist;
    },
    [types.SET_LIKELIST](state, likelist) {
        state.likelist = likelist;
        localStorage.likelist = likelist;
    },
    [types.SET_LISTEN_SONGS](state, listenSongs) {
        state.listenSongs = listenSongs;
        localStorage.listenSongs = listenSongs;
    },
    [types.SET_CREATE_TIME](state, createTime) {
        state.createTime = createTime;
        localStorage.createTime = createTime;
    },
    [types.SET_PLAYING_SONG](state, playingSong) {
        state.playingSong = playingSong;
        localStorage.playingSong = playingSong;
    },
    [types.SET_PLAYING_LIST](state, playingList) {
        state.playingList = playingList;
        localStorage.playingList = playingList;
    },
    [types.SET_PLAYING_LIST](state, playingList) {
        state.playingList = playingList;
        localStorage.playingList = playingList;
    },
    [types.SET_PLAYING_TIMER](state, playingTimer) {
        state.playingTimer = playingTimer;
        localStorage.playingTimer = playingTimer;
    },
    [types.SET_PLAYING_TYPE](state) {
        state.playingType += 1;
        state.playingType %= 3;
        // localStorage.playingType = playingType;
    },
    [types.SET_PLAYER](state, player) {
        state.player = player;
        localStorage.player = player;
    },
    [types.SET_LYRIC_NOW](state, lyricNow) {
        state.lyricNow = lyricNow;
        localStorage.lyricNow = lyricNow;
    },
    [types.SET_CURRENT_TIME](state, currentTime) {
        state.currentTime = currentTime;
        localStorage.currentTime = currentTime;
    },
    [types.SET_LYRICS](state, lyrics) {
        state.lyrics = lyrics;
        localStorage.lyrics = lyrics;
    }
}


export default mutations;