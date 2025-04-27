
/**
 * * CommonAddressService is an abstract class that provides a common interface for address recognition services.
 * * It defines methods for checking the validity of an address, creating a short address, getting coordinates, calculating distances, and selecting the best address from a list.
 */
class CommonAddressService {
  constructor() {
  }

  /**
   * Checks if the address is valid.
   * * @param {string} address - The address to check.
   * @returns {boolean} - Returns true if the address is valid, false otherwise.
   */
  isAddress(address) {
    throw new Error('isAddress method not implemented');
  }

  /**
   * * Create a short address from the address object.
   * A short address is a string that includes the ward, district, city, and country levels.
   * @param {string} address - The address object.
   * @returns {string} - The short address of the address.
   */
  getShortAddress(address) {
    throw new Error('getShortAddress method not implemented');
  }

  /**
   * * get a coordinate from the address object.
   * A coordinate is a string that includes the latitude and longitude of the address.
   * * @param {string} address - The address object.
   * * @returns {string} - The coordinate of the address.
   */
  getCoordinate(address) {
    throw new Error('getLocationFromAddress method not implemented');
  }

  /**
   * Get the distance between two addresses.
   * @param {string} address1 - The first address.
   * @param {string} address2 - The second address.
   * @returns {number} - The distance between the two addresses in meters.
   */
  getDistance(address1, address2) {
    throw new Error('getDistance method not implemented');
  }

  /**
   * Select the best address from a list of addresses.
   * the best address is the one with nearest distance to the target address.
   * @param {*} baseAddressList - The list of addresses to select from.
   * @param {*} targetAddress - The target address to compare with. 
   * 
   * * @returns {*} - The best address from the list.
   */
  getBestAddress(baseAddressList, targetAddress) {
    throw new Error('getBestAddress method not implemented');
  }
}

export default CommonAddressService;