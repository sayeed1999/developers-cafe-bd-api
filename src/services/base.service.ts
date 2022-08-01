import { Model } from "mongoose";

export default class BaseService<T> {

    private readonly Model: Model<any>;

    constructor(Model: Model<any>) {
        this.Model = Model;
    }

    getAll = async () => {
        const users = await this.Model.find();
        return users;
    };

    getById = async (id: number) => {
        const user = await this.Model.findById(id);
        return user;
    };

    create = async (entity: any) => {
        await entity.save();
        return entity;
    }

    deleteById = async (id: number) => {
        await this.Model.findByIdAndDelete({ _id: id });
    };

}
