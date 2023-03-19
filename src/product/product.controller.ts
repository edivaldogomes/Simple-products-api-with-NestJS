import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, NotFoundException  } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO): Promise<CreateProductDTO> {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            "message": 'Product successfully Created',
            product: product
        });
    }

    @Get()
    async getProducts(@Res() res): Promise<Product[]>{
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products: products
        });
        return products;
    }

    @Get('/:productID') 
    async getProduct(@Res() res, @Param('productID') productID): Promise<Product> { 
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException("Product Does not exists");
        res.status(HttpStatus.OK).json({
            product: product
        });

        return product;
    }

    @Delete('/delete/:productID')
    async deletProduct(@Res() res, @Param('productID') productID: string): Promise<Product>{
        /* Ej: http://localhost:5000/product/delete?productID=641706b9f27232acc37e0b48 */
        const productDeleted = await this.productService.deleteProduct(productID);
        if(!productDeleted) throw new NotFoundException('Product Does not exists');        
        return res.status(HttpStatus.OK).json({
            message: "Product Delected Successfully",
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const productUpdated = await this.productService.updateProduct(productID, createProductDTO);
        if(!productUpdated) throw new NotFoundException("Product Does not exists")

        return res.status(HttpStatus.OK).json({
            message: "Product Updated Successfully",
            productUpdated
        });
    }
 }
