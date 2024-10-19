import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService{
    static findOne(followingId: number) {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.name = createUserDto.name;
        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        return this.userModel.findByPk(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.update(updateUserDto);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy();
    }
}