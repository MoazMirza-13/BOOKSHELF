import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    try {
      return await this.booksService.create(book);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get()
  // async findAll(): Promise<Book[]> {
  //   try {
  //     return await this.booksService.findAll();
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @Get('/top')
  // async findTopNBooks(@Query('n') n: number): Promise<Book[]> {
  //   try {
  //     return await this.booksService.findTopNBooks(n);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get('/user')
  async findByUser(@Query('userId') userId: string): Promise<Book[]> {
    try {
      return await this.booksService.findByUserId(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
