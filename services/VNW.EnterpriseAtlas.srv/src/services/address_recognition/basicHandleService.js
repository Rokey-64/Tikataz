import CommonAddressService from './commonAddressService.js';
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xmlData = fs.readFileSync('address.xml', 'utf-8');
const parser = new XMLParser({ ignoreAttributes: false });
const jsonObj = parser.parse(xmlData);

/**
 * * BasicHandleService is a class that provides basic address handling functionality.
 * * It extends the CommonAddressService class and implements methods for setting, getting, and clearing an address.
 */
class BasicHandleService extends CommonAddressService {
  constructor() {
  }

  getShortAddress(address) {
    
  }

  removeUnicode(str) {
    return str
      .toLowerCase()
      .normalize('NFD') // chuẩn hóa
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, '') // xóa ký tự đặc biệt
      .trim();
  }
  
  extractAddressInfo(rawAddress) {
    const tokens = rawAddress
      .split(',')
      .map(part => removeUnicode(part))
      .filter(Boolean)
      .reverse();
  
    let provinces = jsonObj.nation.province;
    if (!Array.isArray(provinces)) provinces = [provinces];
  
    let found = {
      province: null,
      district: null,
      ward: null
    };
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      // Tìm province
      const province = provinces.find(p => removeUnicode(p['@_none_unicode']) === token);
      if (province && !found.province) {
        found.province = province['@_name'];
  
        // Tìm district trong province đó
        let districts = province.district;
        if (!Array.isArray(districts)) districts = [districts];
        const district = tokens[i + 1]
          ? districts.find(d => removeUnicode(d['@_none_unicode']) === tokens[i + 1])
          : null;
  
        if (district) {
          found.district = district['@_name'];
  
          // Tìm ward trong district đó
          let wards = district.ward;
          if (!Array.isArray(wards)) wards = [wards];
          const ward = tokens[i + 2]
            ? wards.find(w => removeUnicode(w['@_none_unicode']) === tokens[i + 2])
            : null;
  
          if (ward) {
            found.ward = ward['@_name'];
          }
        }
  
        break; // Stop sau khi tìm được province
      }
    }
  
    return found;
  }

  getBestAddress(baseAddressList, targetAddress) {
    // * BasicHandleService does not implement this method.
    // * It is an abstract method that should be implemented by subclasses.
    throw new Error('getBestAddress method not implemented');
  }
}