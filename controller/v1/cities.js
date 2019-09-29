'use strict';
import Cities from '../../models/v1/cities'
import AddressComponent from '../../prototype/addressComponent';
import pinyin from 'pinyin';

class CityHandle extends AddressComponent {
  constructor(){
    super()
    this.getCity = this.getCity.bind(this)
  }
  async getCity(req, res, next){
    const type = req.query.type;
    let cityInfo;
    try {
      switch (type) {
        case 'guess':
          const city = await this.getCityName(req);
          cityInfo = await Cities.cityGuess(city);
          break;
        case 'hot':
          cityInfo = await Cities.cityHot();
          break;
        case 'group':
          cityInfo = await Cities.cityGroup();
          break;
        default:
          res.json({
            type: 'ERROR_QUERY_TYPE',
            message: '参数错误'
          });
          return
      }
      res.send({
        status: 1,
        cityInfo
      });
    }catch(err){
      console.log('获取数据失败', err);
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: '获取数据失败'
      })
    }
  }
  async getCityName(req){
    try{
      const cityInfo = await this.guessPosition(req);
      // 汉字转换成拼音
      const pinyinArr = pinyin(cityInfo.city, {
        style: pinyin.STYLE_NORMAL
      });
      let cityname = '';
      pinyinArr.forEach(item => {
        cityname += item[0];
      })
      return cityname;
    }catch(err){
      return '北京';
    }
  }
}

export default new CityHandle();