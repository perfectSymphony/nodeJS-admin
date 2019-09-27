'use strict';

import AddressComponent from '../../prototype/addressComponent';

class CityHandle extends AddressComponent {
  constructor(){
    super()
    this.getCity = this.getCity.bind(this)
  }
  async getCity(req, res, next){
    
  }
}

export default CityHandle;