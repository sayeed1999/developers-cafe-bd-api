import { Model } from "mongoose";

import Pagination from "../interfaces/pagination.interface";

export default class BaseService {

    private readonly Model: Model<any>;

    constructor(Model: Model<any>) {
        this.Model = Model;
    }

    getAll = async (args?: Pagination) => {
        const users = await this.Model.find()
                                      .sort({ createdAt: -1 }) // order by desc
                                      .limit(args.size)
                                      .skip(args.size * (args.page - 1));
        return users;
    };

    getById = async (id: number) => {
        const user = await this.Model.findById(id);
        return user;
    };

    insertOne = async (entity: any) => {
        await this.Model.insertMany([ entity ]);
        // await entity.save();
        return entity;
    }

    insertMany = async (entities: any[]) => {
        await this.Model.insertMany(entities);
        return entities;
    }

    findByIdAndUpdate = async (id: number, entity: any) => {
        const data = await this.Model.findByIdAndUpdate(id, entity);
        return data;
    }

    addOrUpdate = async (entity: any)  => {
        await entity.save();
        return entity;
    }

    deleteById = async (id: number) => {
        await this.Model.findByIdAndDelete({ _id: id });
    };

}
