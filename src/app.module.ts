import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        // CacheModule.register<RedisClientOptions>({
        //   store: redisStore,
        //   host: process.env.REDIS_HOST || 'localhost',
        //   port: Number(process.env.REDIS_PORT) || 6379,
        //   ttl: 60,
        // }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('DB_HOST') || 'db',
                port: Number(configService.get('DB_PORT')) || 5432,
                username: configService.get('DB_USER') || 'bloguser',
                password: configService.get('DB_PASSWORD') || 'blogpass',
                database: configService.get('DB_NAME') || 'blogdb',
                autoLoadModels: true,
                synchronize: true, // Don't use this in production
            }),
        }),
        UsersModule,
        AuthModule,
        BlogsModule,
        PostsModule,
        CommentsModule,
        LikesModule,
        FollowsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
