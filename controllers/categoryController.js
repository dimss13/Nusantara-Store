import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try{
    const {name} = req.body;
    if (!name)
    {
      return res.status(401).send({
        message: "Name is required"
      })
    }
    const existingCategory = await categoryModel.findOne({name});
    if (existingCategory)
    {
      return res.status(200).send({
        success: true,
        message: "Category already exists"
      })
    }

    const category = await new categoryModel({
      name, slug:slugify(name)
    }).save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category
    })

  } catch(error){
    console.log(`Error in createCategoryController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category"
    })
  }
}

// update category 
export const updateCategoryController = async (req, res) => {
  try {
    const {name} = req.body;
    const {id} = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new: true});
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category
    })
  } catch(error)
  {
    console.log(`Error in updateCategoryController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category"
    })
  }
}

// get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      category
    })
  } catch(error)
  {
    console.log(`Error in categoryController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting categories"
    })
  }
}

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    res.status(200).send({
      success: true,
      message: "Single category fetched successfully",
      category
    })
  } catch (error)
  {
    console.log(`Error in singleCategoryController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category"
    })
  }
}

// delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const {id} = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category
    })
  } catch (error)
  {
    console.log(`Error in deleteCategoryController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category"
    })
  }
}