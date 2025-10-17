import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('google')
  async googleLogin(@Body() body: any) {
    const user = await this.usersService.createOrUpdate(body);
    return {
      id: user._id,
      email: user.email,
    };
  }
}
