import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Blog } from "./blog.model";
import { BlogsService } from "./blogs.service";
import { BlogsController } from "./blogs.controller";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Blog]),
        UsersModule
    ],
    providers: [BlogsService],
    controllers: [BlogsController],
    exports: [BlogsService],
})
export class BlogsModule {}