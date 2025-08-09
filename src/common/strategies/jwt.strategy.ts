import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private apps: { appId?: string; name: string; url: string }[];

    constructor(configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });

        const appsJson = configService.get<string>('ALLOWED_APPS') || '[]';
        try {
            this.apps = JSON.parse(appsJson);
        } catch (err) {
            throw new Error('ALLOWED_APPS is not valid JSON');
        }

    }

    async validate(payload: any) {

        const normalize = (url: string) => url.replace(/\/$/, '').toLowerCase();

        const app = this.apps.find(
            (a) => normalize(a.url) === normalize(payload.url),
        );

        if (!app) {
            throw new UnauthorizedException('App not authorized');
        }

        return { url: payload.url, name: app.name };
    }
}
