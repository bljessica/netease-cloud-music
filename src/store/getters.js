// const phone = state => state.phone || localStorage.getItem('phone');
// const email = state => state.email || localStorage.getItem('email');
// const username = state => state.username || localStorage.getItem('username');
// const userID = state => state.userID || localStorage.getItem('userID');
// const isLogin = state => state.isLogin || localStorage.getItem('isLogin');
// const avatarUrl = state => state.avatarUrl || localStorage.getItem('avatarUrl');
// const birthday = state => state.birthday || localStorage.getItem('birthday');
// const city = state => state.city || localStorage.getItem('city');
// const followeds = state => state.followeds || localStorage.getItem('followeds');
// const follows = state => state.follows || localStorage.getItem('follows');
// const gender = state => state.gender || localStorage.getItem('gender');
// const nickname = state => state.nickname || localStorage.getItem('nickname');
// const province = state => state.province || localStorage.getItem('province');
// const token = state => state.token || localStorage.getItem('token');
// const playListCount = state => state.playListCount || localStorage.getItem('playListCount');
// const backgroundUrl = state => state.backgroundUrl || localStorage.getItem('backgroundUrl');
// const level = state => state.level || localStorage.getItem('level');
// const createdMenus = state => state.createdMenus || localStorage.getItem('createdMenus');
// const collectedMenus = state => state.collectedMenus || localStorage.getItem('collectedMenus');
// const playlist = state => state.playlist || localStorage.getItem('playlist');
// const likelist = state => state.likelist || localStorage.getItem('likelist');
// const listenSongs = state => state.listenSongs || localStorage.getItem('listenSongs');
// const createTime = state => state.createTime || localStorage.getItem('createTime');
// const playingSong = state => state.playingSong || localStorage.getItem('playingSong');
// const playingList = state => state.playingList || localStorage.getItem('playingList');
// const playingTimer = state => state.playingTimer || localStorage.getItem('playingTimer');
// const playingType = state => state.playingType || localStorage.getItem('playingType');
// const player = state => state.player || localStorage.getItem('player');
// const lyricNow = state => state.lyricNow || localStorage.getItem('lyricNow');
// const currentTime = state => state.currentTime || localStorage.getItem('currentTime');
// const lyrics = state => state.lyrics || localStorage.getItem('lyrics');
const phone = state => state.phone
const email = state => state.email
const username = state => state.username
const userID = state => state.userID
const isLogin = state => state.isLogin 
const avatarUrl = state => state.avatarUrl 
const birthday = state => state.birthday 
const city = state => state.city 
const followeds = state => state.followeds
const follows = state => state.follows
const gender = state => state.gender
const nickname = state => state.nickname
const province = state => state.province 
const token = state => state.token 
const playListCount = state => state.playListCount
const backgroundUrl = state => state.backgroundUrl
const level = state => state.level 
const createdMenus = state => state.createdMenus
const collectedMenus = state => state.collectedMenus
const playlist = state => state.playlist 
const likelist = state => state.likelist
const listenSongs = state => state.listenSongs 
const createTime = state => state.createTime 
const playingSong = state => state.playingSong
const playingList = state => state.playingList 
const playingTimer = state => state.playingTimer 
const playingType = state => state.playingType
const player = state => state.player 
const lyricNow = state => state.lyricNow 
const currentTime = state => state.currentTime 
const lyrics = state => state.lyrics
const isPlaying = state => state.isPlaying
const duration = state => state.duration
const searchingWord = state => state.searchingWord

export default {
    searchingWord,
    duration,
    isPlaying,
    lyrics,
    currentTime,
    lyricNow,
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