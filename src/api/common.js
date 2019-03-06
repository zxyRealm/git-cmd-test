import request from '../utils/request'

export function GetList (data) {
  return request({
    url: '/getServiceIp',
    data
  })
}
