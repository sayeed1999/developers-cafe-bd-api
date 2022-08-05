import Product from "../models/product.model";
import BaseService from "./base.service";

export default class CafeService extends BaseService {

    constructor() {
        super(Product);
    }

    giveProductRating = async (userid: number, productId: number, star: number) => {
        const product = await this.getById(productId);
        const index = product.ratings.findIndex((x) => x.userid === userid);
        
        if (index === -1) {
          product.ratings.push({
            userid,
            star,
          });
        } else {
          product.ratings[index].star = star;
        }

        const updated = await this.addOrUpdate(product);
        // console.log(updated); // is this approach good?
        return updated;
    }

}