import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createOrUpdate(userData: Partial<User>): Promise<UserDocument> {
    let user = await this.userModel.findOne({ email: userData.email });
    if (!user) {
      user = await this.userModel.create(userData);
    }
    return user;
  }
}
