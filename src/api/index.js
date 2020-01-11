// import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

var baseUrl = 'http://localhost:8088/simplify'

export const API = {
	AdminLogin : baseUrl + '/login/loginin'
}