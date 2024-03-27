import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'


export const createCategoryController = async (req, res) => {

    try {
        // Get the data from the request body
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is Required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New category Created",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        })
    }
};

// Update category

export const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body;
        const id = req.params.id;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category,

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'

        })
    }

};


// Get all Category

export const categoryController = async (req, res) => {

    try {
        const category = await categoryModel.find({

        });

        res.status(200).send({
            success: true,
            message: "All categories List",
            category,

        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })

    }

};

// Single Category
export const singleCategoryController = async (req, res) => {

    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Successfully fetched single Category",
            category

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Single Category"

        })

    }

};

// Delete Category

export const deleteCategoryController = async (req, res) => {

    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({

            success: false,
            message: "Error while deleting Category",
            error

        })

    }

};