import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
    const result = await CategoryModel.create(payload);
    return result;
  };
const getAllCategoryFromDB = async () => {
    const result = await CategoryModel.find()
    .populate('createdBy', '_id username email role');
    return result;
  };

  export const CategoryServices= {
    createCategoryIntoDB,
    getAllCategoryFromDB
   
};