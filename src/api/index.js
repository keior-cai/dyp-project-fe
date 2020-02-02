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
		AdminLoadSpace : baseUrl + '/management/space/loadSpace',
    AdminInsertUpdateSpace : baseUrl + '/management/space/insertUpdate',
    AdminDelSpace : baseUrl + '/management/space/delSpace',
    AdminQueryMovie : baseUrl + '/management/movie/queryMovie',
    AdminAddMovie : baseUrl + '/management/movie/addMovie',
    AdminInsertUpdateMovie : baseUrl + '/management/movie/insertUpdate',
    AdminUpdateMovie : baseUrl + '/management/movie/updateMovie',
    AdminDelMovie : baseUrl + '/management/movie/delMovie',
    AdminLoadMovie : baseUrl + '/management/movie/loadMovie',
    AdminQueryPSpace : baseUrl + '/management/pspace/queryPSpace',
    AdminInsertUpdatePSpace : baseUrl + '/management/pspace/insertUpdate',
  },
  CUSTOMER : {
    
  },
	UPLOADURL : 'http://47.106.78.139:8012/tame/dfs/uploadByFile',
}