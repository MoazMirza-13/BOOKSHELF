import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  user_id: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
