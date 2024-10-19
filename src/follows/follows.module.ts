import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Follow } from "./follow.model";
import { FollowsService } from "./follows.service";
import { FollowsController } from "./follows.controller";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Follow]),
        UsersModule
    ],
    providers: [FollowsService],
    controllers: [FollowsController],
})
export class FollowsModule {}