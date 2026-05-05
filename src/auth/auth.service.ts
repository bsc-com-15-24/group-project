import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { LoginDto } from './dto/login-auth-dto';
import { RegisterDto } from './dto/register-auth-dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async login(loginDto: LoginDto) {
        // 1. Fetch user by email
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Verify password (WARNING: currently using plain text comparison! You should install bcrypt and use bcrypt.compare here)
        if (user.password !== loginDto.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Create payload and generate token
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        // 1. Check if user already exists
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // 2. create user
        const user = await this.usersService.create({
            name: registerDto.username,
            email: registerDto.email,
            password: registerDto.password,
            role: registerDto.role,
        });

        // 3. Create payload and generate token
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
