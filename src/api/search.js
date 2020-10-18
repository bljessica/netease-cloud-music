import request from '../common/js/request';

//搜索：默认搜索关键词
function getDefault() {
    return request({
        url: '/search/default',
        method: 'get'
    })
}

//搜索：搜索
function search(data) {
    return request({
        url: '/search',
        method: 'get',
        data: data
    })
}

//搜索：搜索建议
// function searchSuggest(data) {
//     return request({
//         url: '/search/suggest',
//         method: 'get',
//         data: data
//     })
// }

//搜索：热搜列表(详细)
function detailHotRank() {
    return request({
        url: '/search/hot/detail',
        method: 'get',
    })
}


export {
    getDefault,
    search,
    detailHotRank,
    searchSuggest
}