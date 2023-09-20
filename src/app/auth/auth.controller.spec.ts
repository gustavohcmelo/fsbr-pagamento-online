import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import TestUtils from "../common/test/TestUtils";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {JwtModule} from "@nestjs/jwt";

const access_token = TestUtils.generateAccessToken();
const dtoAuth: CreateAuthDto = TestUtils.dtoAuth();

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            singIn: jest.fn().mockResolvedValue({ access_token: access_token })
          }
        }
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {

    it('should login the user and return access_token', async () => {

      const result = await authController.login(dtoAuth);
      expect(authService.singIn).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ access_token: access_token });
    });

    it('should throw an exception', () => {

      jest.spyOn(authService, 'singIn').mockRejectedValueOnce(new Error());
      expect(authController.login).rejects.toThrowError();
    });
  });
});
