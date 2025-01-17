import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe('UsersController', () => {
    let controller: UsersController;

    const mockUsersService = {
        create: jest.fn((dto) => ({
            id: Math.floor(Math.random() * 100),
            ...dto,
        })),

    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', () => {
        expect(controller.create({
            email: 'brenno@gmail.com',
            password: '123456',
            name: 'Brenno',
        })).toEqual({
            id: expect.any(Number),
            email: 'brenno@gmail.com',
            password: '123456',
            name: 'Brenno',
        });

        expect(mockUsersService.create).toHaveBeenCalled();
    });
});