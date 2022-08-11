import { Model, ObjectId, Query } from "mongoose";

import Pagination from "../interfaces/pagination.interface";

export default class BaseService {

    private readonly Model: Model<any>;

    constructor(Model: Model<any>) {
        this.Model = Model;
    }

    getAll = async (args?: Pagination) => {
        let users = [];
        
        if (args && args.size && args.page) {
            users = await this.Model.find()
                                    .sort({ createdAt: -1 }) // order by desc
                                    .limit(args.size)
                                    .skip(args.size * (args.page - 1));
        } else {
            users = await this.Model.find()
                                    .sort({ createdAt: -1 }); // order by desc
        }
        return users;
    };

    getById = async (id: ObjectId | string) => {
        const user = await this.Model.findById(id);
        console.log(user)
        return user;
    };

    insertOne = async (entity: any) => {
        const data = await this.Model.insertMany([ entity ]);
        return data[0];
    }

    insertMany = async (entities: any[]) => {
        const data = await this.Model.insertMany(entities);
        return data;
    }

    findByIdAndUpdate = async (id: ObjectId, entity: any) => {
        const data = await this.Model.findByIdAndUpdate(id, entity);
        return data;
    }

    addOrUpdate = async (entity: any)  => {
        await entity.save();
        return entity;
    }

    deleteById = async (id: ObjectId) => {
        await this.Model.findByIdAndDelete({ _id: id });
    };

}
