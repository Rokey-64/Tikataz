import mongoose from 'mongoose';
import CommonCardTemplate from './templateService.js'

/**
 * * StandardCardService is a base class for card services that provides common methods for retrieving card data.
 */
class StandardCardService {
  constructor() {
    this.payload = [];

    /**
     * Specifies the fields to be included in the query result.
     */
    this.queryString = {
      'user_id': 1,
      'state': 1,
    };


    /**
     * * A filter for the query
     */
    this.queryCondition = {};
  }

  /**
   * Get the common data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getProfile() {
    /**
     * ** title
     * ** description
     * 
     * 
     */
    return this;
  }



  /**
   * Get partner data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getPartners() {
    /**
     * ** name
     * ** logo
     * ** taxcode
     * ** address
     */
    return this;
  }


  /**
   * Get location data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getLocation() {
    /**
     * address
     * distance
     */
    return this;
  }

  /**
   * Get items data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getItems() {
    /**
     * item
     * name
     * 
     */
    return this;
  }

  /**
   * Get logo data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getLogo() {
    return this;
  }


  /**
   * Get certificates data from database
   * @param {*}  - The mongoose  to use for the card data.
   */
  getCerts() {
    /**
     * image
     * name
     * date
     * type
     */
    return this;
  }

  /**
   * Get working time data from database
   * @returns 
   */
  getWorkingTime() {
    return this;
  }

  /**
   * calculate and retrieve an address from the list that might match user's needs
   * * @param {Array} address - The array of addresses to be handled.
   * @returns {string} - The first address from the array or an empty string if the array is empty.
   */
  handleAddress(address) {
    if (process.env.NODE_ENV === 'development') {
      // console.log("⚠⚠ There needs to be a function to handle address in development mode ⚠⚠");
    }
    if (address && address.length > 0) {
      return address[0];
    }
    return '';
  }

  /**
   * Create a filter for the query based on the card ID and predictions.
   * @param {*} cid - The card ID to filter by.
   * @param {*} predicts - The predictions major to filter by.
   * @param {*} searchCIDs - A list of card IDs retrieved from the Meili API.
   */
  createFilter(cid, predicts, searchCIDs) {
    /**
     * * Check state of card
     */
    if (process.env.NODE_ENV === 'production') {
      this.queryCondition.state = "approved";
    }

    /**
     * If the searchCID is not empty, use it to filter the query.
     */
    if (searchCIDs && searchCIDs.length > 0) {
      this.queryCondition._id = { $in: searchCIDs };
      return;
    }

    /**
     * * Just get from ID
     */
    if (cid) {
      this.queryCondition._id = { $gt: new mongoose.Types.ObjectId(String(cid)) };
    }

    /**
     * * Need to categorize the card by major category
     */
    if (predicts && predicts.length > 0) {
      const tags = predicts.map((item) => {
        const key = `prediction.weighted_predict.${item}`;

        return {
          $and: [
            { [key]: { $exists: true } },
            { [key]: { $gte: 25 } }
          ]
        };
      });
      this.queryCondition.$or = tags;
    }
  }


  /**
   * Execute the query and return an array of the card data.
   *
   * @returns {Promise} A promise that resolves to the card data.
   */
  async run() {
    throw new Error("Method 'run' must be implemented.");
  }
}

export default StandardCardService;