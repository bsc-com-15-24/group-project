import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private configService: ConfigService) {
        const secretKey = configService.get<string>("JWT_SECRET_KEY");

        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined ");
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,

        });
    }
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };

    }
}