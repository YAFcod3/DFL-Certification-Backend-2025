import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private apps: { appId: string; name: string; url: string }[];

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });

        const appsJson = configService.get<string>('ALLOWED_APPS') || '[]';
        this.apps = JSON.parse(appsJson);

    }



    async validate(payload: any) {
        console.log('payload',payload)
        const app = this.apps.find(a => a.url === payload.url);
        if (!app) {
            throw new UnauthorizedException('App not authorized');
        }
        return { url: payload.url, name: app.name };
    }
}



