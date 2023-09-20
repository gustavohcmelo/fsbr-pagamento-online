import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { HashingService } from "../common/security/hashing/hashing.service";
import TestUtils from "../common/test/TestUtils";
import {CreateAuthDto} from "./dto/create-auth.dto";

const access_token = TestUtils.generateAccessToken();
const dtoAuth: CreateAuthDto = TestUtils.dtoAuth();

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            singIn: jest.fn().mockResolvedValue({ access_token: access_token })
          }
        },
        {
          provide: UserService,
          useValue: {

          }
        },
        {
          provide: JwtService,
          useValue: {

          }
        },
        {
          provide: HashingService,
          useValue: {

          }
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('singIn', () => {

    it('should authenticate user generate and return a token', async () => {

      const result = await authService.singIn(dtoAuth);
      expect(result).toEqual({ access_token: access_token })
    });
  });
});
