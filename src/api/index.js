// import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

var baseUrl = 'http://localhost:9901/admin'
// var baseUrl = 'http://ccj.wezhuiyi.com:9901/admin'
// var baseUrl = 'http://192.168.31.127:9901/admin'
// var baseUrl = 'http://47.106.78.139/admin'
// var baseUrl = 'http://ccj.wezhuiyi.com/admin'


export const API = {
  ADMIN : {
    AdminLogin : baseUrl + '/login/login',
    Logout : baseUrl + '/login/logout',
    AdminUseInfo : baseUrl + '/management/admin/getAdminInfo',
    AdminCreateToken : baseUrl + '/management/admin/createToken',
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
    AdminQueryMovieById : baseUrl + '/management/movie/queryMovieById',
    AdminAddMovie : baseUrl + '/management/movie/addMovie',
    AdminInsertUpdateMovie : baseUrl + '/management/movie/insertUpdate',
    AdminUpdateMovie : baseUrl + '/management/movie/updateMovie',
    AdminDelMovie : baseUrl + '/management/movie/delMovie',
    AdminLoadMovie : baseUrl + '/management/movie/loadMovie',
    AdminQueryPSpace : baseUrl + '/management/pspace/queryPSpace',
    AdminInsertUpdatePSpace : baseUrl + '/management/pspace/insertUpdate',
    AdminInsertQeryOrder : baseUrl + '/management/order/queryOrder',
    LOGURL : baseUrl + '/management/admin/queryLog',
    OrderStatics : baseUrl + '/management/admin/getCharts',
  },
  CUSTOMER : {
    
  },
	UPLOADURL : 'http://47.106.78.139:8012/tame/dfs/uploadByFile',
}