'use strict';

import AddressComponent from '../../prototype/addressComponent';
import CityHandle from './cities';
import Cities from '../../models/v1/cities';

class SearchPlace extends AddressComponent {
  constructor(){
    super();
    this.search = this.search.bind(this); 
  }
  async search(req, res, next){
    let {type = 'search', city_id, keyword} = req.query
    if(!keyword){
      res.send({
        status: 0,
        type: 'ERROR_QUERY_TYPE',
        message: '参数错误'
      });
      return
      // 如果给定值为 NaN则返回值为true；否则为false
    } else if(isNaN(city_id)){
      try{
        const cityname = await CityHandle.getCityName(req);
        const cityInfo = await Cities.cityGuess(cityname);
        city_id = cityInfo.id
      }catch(err){
        console.log('搜索地址时，获取城市定位失败', err);
        res.send({
          status: 0,
          type: 'ERROR_GET_POSITION',
          message: '获取数据失败'
        });
      }
    }
    try{
      const cityInfo = await Cities.getCityById(city_id);
      const resObj = await this.searchPlace(keyword, cityInfo.name, type);
      const cityList = [];
      resObj.data.forEach((item, index) => {
        cityList.push({
          name: item.name,
          address: item.address,
          latitude: item.location.lat,
          longitude: item.location.lng,
          geohash: item.location.lat + ',' + item.location.lng
        });
      });
      res.send({
        status: 1,
        cityList
      });
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_ADDRESS_ERROR',
        message: '获取地址信息失败'
      });
    }
  }
}

export default new SearchPlace()