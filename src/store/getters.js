const phone = state => state.phone;
const email = state => state.email;
const username = state => state.username;
const userID = state => state.userID;
const isLogin = state => state.isLogin;
const avatarUrl = state => state.avatarUrl;
const birthday = state => state.birthday;
const city = state => state.city;
const followeds = state => state.followeds;
const follows = state => state.follows;
const gender = state => state.gender;
const nickname = state => state.nickname;
const province = state => state.province;
const token = state => state.token;
const playListCount = state => state.playListCount;
const backgroundUrl = state => state.backgroundUrl;
const level = state => state.level;
const createdMenus = state => state.createdMenus;
const collectedMenus = state => state.collectedMenus;
const playlist = state => state.playlist;
const likelist = state => state.likelist;
const listenSongs = state => state.listenSongs;
const createTime = state => state.createTime;
const playingSong = state => state.playingSong;
const playingList = state => state.playingList;
const playingTimer = state => state.playingTimer;
const playingType = state => state.playingType;
const player = state => state.player;

export default {
    player,
    playingTimer,
    playingType,
    playingSong,
    playingList,
    createTime,
    listenSongs,
    likelist,
    createdMenus,
    collectedMenus,
    playlist,
    phone,
    username,
    userID,
    isLogin,
    avatarUrl,
    birthday,
    city,
    followeds,
    follows,
    gender,
    nickname,
    province,
    token,
    playListCount,
    backgroundUrl,
    level
}