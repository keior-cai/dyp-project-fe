// import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

var baseUrl = 'http://localhost:9901/admin'

export const API = {
  ADMIN : {
    AdminLogin : baseUrl + '/login/login',
    AdminUseInfo : baseUrl + '/management/admin/getAdminInfo',
    AdminLoadCustomer : baseUrl + '/management/admin/queryAdmin',
    AdminLoadStaticsData : baseUrl + '/management/admin/getStatics',
    AdmingetCount : baseUrl + '/management/admin/getCount',
    AdminInsertUpdate : baseUrl + '/management/admin/insertUpdate',
    AdminActivedmin : baseUrl + '/management/admin/activeAdmin',
    AdminLoadWechatCustomer : baseUrl + '/management/customer/queryCustomer',
    AdminQuerySpace : baseUrl + '/management/space/querySpace',
    AdminAddSpace : baseUrl + '/management/space/addSpace',
    AdminInsertUpdateSpace : baseUrl + '/management/space/insertUpdate',
    AdminDelSpace : baseUrl + '/management/space/delSpace',
    AdminQueryMovie : baseUrl + '/management/movie/queryMovie',
    AdminAddMovie : baseUrl + '/management/movie/addMovie',
    AdminUpdateMovie : baseUrl + '/management/movie/updateMovie',
    AdminDelMovie : baseUrl + '/management/movie/delMovie',
  },
  CUSTOMER : {
    
  }
}