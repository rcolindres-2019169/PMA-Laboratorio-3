'use strict'

import Book from './book.model.js'
import { checkUpdate } from '../utils/validator.js'

export const save = async(req, res)=>{  
    try{
        let data = req.body
        const existingBook = await Book.findOne({ name: data.name });
        if (existingBook) {
            return res.status(400).send({ message: 'Book with the same name already exists' });
        }
        let book = new Book(data)
        await book.save()
        return res.send({message: `Registered successfully ${book.name}`})
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering book', err: err})
    }

}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedBook = await Book.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedBook) return res.status(401).send({message: 'Book not found and not updated'})
        return res.send({message: 'Updated book', updatedBook})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating book'})
    }
}

export const deleteU = async (req,res)=>{
    try{
        let { id } = req.params
        let deletedBook = await Book.findOneAndDelete({_id: id})
        if(!deletedBook) return res.status(404).send({message: 'Book not found and not deleted'})
        return res.send({message: `Book with name ${deletedBook.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting book'})
    }
}

export const get = async (req,res ) =>{
    try{
        let books = await Book.find().populate({path: 'category', select: 'name'})
        return res.send({books})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting books' })
    }
}

export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let books = await Book.find(
            {name: { $regex: new RegExp(search, 'i') } }
        )({path: 'category', select: 'name'})
        if (books.length === 0) {
            return res.status(404).send({ message: 'Books not found' });
        }
        if(!books) return res.status(404).send({message: 'books not found'})
            return res.send({message: 'Books found', books})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching books'})
    }
}

export const getZ = async (req,res)=>{
    try {
        let { descender } = req.query;
        let order = -1; 

        if (descender === 'desc') {
            order = -1; 
        }

        let books = await Book.find().sort({ name: order }).populate('category', ['name']);
        return res.send({ books });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting books' });
    }
}

export const getA = async (req,res)=>{
    try {
        let { asscender } = req.query;
        let order = 1; 

        if (asscender === 'asc') {
            order = 1; 
        }

        let books = await Book.find().sort({ name: order }).populate('category', ['name']);;
        return res.send({ books });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting books' });
    }
}