import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import TestUtils from '../common/test/TestUtils';
import { CreateUserDto } from './dto/create-user.dto';

const User = TestUtils.newUser();
const userDto: CreateUserDto = TestUtils.dtoUser();

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JwtModule],
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([User, User]),
          create: jest.fn().mockResolvedValue(User),
          findOne: jest.fn().mockResolvedValue(User),
          update: jest.fn().mockResolvedValue(User),
          deleteById: jest.fn().mockResolvedValue(undefined)
        }
      }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
  });

  it('controller and service should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });


  describe('index', () => {
    it('should return a user list entity successfully', async () => {
      const result = await userController.index();

      expect(result).toEqual([User, User]);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const result = await userController.create(userDto);

      expect(result).toEqual(User);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(userDto);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create(userDto)).rejects.toThrowError();
    })
  });

  describe('show', () => {
    it('should get a unique user entity successfully', async () => {
      const result = await userController.show('1');

      expect(result).toEqual([User, User][0]);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith('1');
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(6);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      expect(userController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const result = await userController.update('1', userDto);

      expect(result).toEqual(User);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith('1', userDto);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      expect(userController.update('1', userDto)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a user succssefuly', async () => {
      const result = await userController.delete('1');

      expect(result).toEqual(undefined);
    });

    it('shoud throw an exception', () => {
      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());

      expect(userController.delete('1')).rejects.toThrowError();
    });
  });
});
