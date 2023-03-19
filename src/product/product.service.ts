import { Injectable } from '@nestjs/common';
import { Model  } from 'mongoose';
import { Product} from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private productModel: Model<Product>) {}

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productModel.findById(productId);
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        await product.save();
        return product;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const deleteProduct = await this.productModel.findByIdAndDelete(productId);
        return deleteProduct;

    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId, 
            createProductDTO, 
            {new: true}
            );//Muestrame el nuevo no el viejo
        return updatedProduct;
    }

}