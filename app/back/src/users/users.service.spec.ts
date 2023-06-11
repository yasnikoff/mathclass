import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');
import { User, UserSchema } from 'src/db/schemas/User.schema';
import { UsernameAlreadyInUseError, UsersService } from './users.service';
import { NewUserDto, UserRole } from './user';
import * as bcrypt from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;
  const userModelToken = getModelToken(User.name);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [
        {
          provide: userModelToken,
          useValue: mongoose.model('User', UserSchema),
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(userModelToken);
  });

  describe('createUser', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    const newUserDto: NewUserDto = {
      username: 'username',
      password: 'password',
      email: 'username@example.com',
      role: UserRole.Teacher,
      avatar: '<svg></svg>',
    };
    const doc: Omit<User, 'id' | 'passwordHash'> = {
      ...newUserDto,
    };
    describe('called with username that already in use', () => {
      beforeEach(async () => {
        mockingoose(model).toReturn(doc, 'findOne');
      });

      it('should throw', async () => {
        expect.assertions(1);
        await expect(service.createUser(newUserDto)).rejects.toThrowError(
          new UsernameAlreadyInUseError(newUserDto.username),
        );
      });
    });

    describe('called with invalid password', () => {
      it.each([
        { description: 'password id too short', password: '123' },
        { description: 'password is empty', password: '' },
        { description: 'password is too long', password: '1'.repeat(33) },
      ])('should throw when $description', async ({ password }) => {
        expect.assertions(1);
        await expect(
          service.createUser({ ...newUserDto, password }),
        ).rejects.toThrowError('password');
      });
    });

    describe('called without user role', () => {
      it('should throw', async () => {
        expect.assertions(1);
        await expect(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          service.createUser({ ...newUserDto, role: '' }),
        ).rejects.toThrowError('user role');
      });
    });

    describe('called with valid unused username', () => {
      let result: Awaited<ReturnType<typeof service.createUser>>;

      beforeEach(async () => {
        result = await service.createUser(newUserDto, {
          withPasswordHash: true,
        });
      });

      it('should return new user with id', async () => {
        expect(result?.username).toEqual(newUserDto.username);
        expect(result?.role).toEqual(newUserDto.role);
        expect(result?.email).toEqual(newUserDto.email);
        expect(result?.id).toBeDefined();
        expect(result?.id).not.toEqual('');
        expect(
          await bcrypt.compare(newUserDto.password, result?.passwordHash),
        ).toBeTruthy();
      });
    });
  });
});
