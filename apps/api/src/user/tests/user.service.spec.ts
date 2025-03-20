/* // eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';

import { ResearcherType, UserRole, UserStatus } from '@prisma/client';
import { PrismaService } from '@/infra/database/prisma.service'; // Import PrismaService
import {
  NotFoundException,
  ConflictException,
} from '@nestjs/common/exceptions';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/user.dto';
import { hashPassword } from '@/user/utils/hashPassword.util';

describe('Integration test - UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService], // Add PrismaService to providers
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Integration test - UsersService - findOne', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return user data when user is found', async () => {
    const mockUser = {
      id: '94b6ce74-3e80-4968-8956-7d812f4a295a',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findOne(mockUser.id);

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(
      service.findOne('94b6ce74-3d55-4968-8956-7d812f4a295a'),
    ).rejects.toThrow(NotFoundException);
  });
});

describe('Integration test - UsersService - create', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user', async () => {
    const mockUserDto: CreateUserDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      role: UserRole.USER,
    };

    const mockCreatedUser = {
      id: '12345',
      ...mockUserDto,
      password: await hashPassword(mockUserDto.password),
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockCreatedUser);

    const result = await service.create(mockUserDto);

    expect(result).toEqual({
      id: mockCreatedUser.id,
      name: mockCreatedUser.name,
      img: mockCreatedUser.img,
      email: mockCreatedUser.email,
      role: mockCreatedUser.role,
    });
  });

  it('should throw ConflictException if user already exists', async () => {
    const mockUserDto: CreateUserDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      role: UserRole.USER,
    };

    const mockExistingUser = {
      id: '12345',
      ...mockUserDto,
      password: await hashPassword(mockUserDto.password),
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(mockExistingUser);

    await expect(service.create(mockUserDto)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('Integration test - UsersService - create with researcher', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user with researcher role', async () => {
    const mockUserDto: CreateUserDto = {
      name: 'Researcher Doe',
      email: 'researcher@example.com',
      password: 'password123',
      role: UserRole.USER,
      researcher: {
        researcherType: ResearcherType.STUDENT,
        urlLattes: 'http://lattes.com/researcher',
      },
    };

    const mockCreatedUser = {
      id: '12345',
      ...mockUserDto,
      password: await hashPassword(mockUserDto.password),
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockCreatedUser);

    const result = await service.create(mockUserDto);

    expect(result).toEqual({
      id: mockCreatedUser.id,
      name: mockCreatedUser.name,
      img: mockCreatedUser.img,
      email: mockCreatedUser.email,
      role: mockCreatedUser.role,
    });
  });
});

describe('Integration test - UsersService - create with company', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user with company role', async () => {
    const mockUserDto: CreateUserDto = {
      name: 'Company Doe',
      email: 'company@example.com',
      password: 'password123',
      role: UserRole.USER,
      company: {
        contactName: 'Company Inc.',
        contactEmail: 'dwdwdwd@teste.com',
        contactPhone: '123456789',
      },
    };

    const mockCreatedUser = {
      id: '12345',
      ...mockUserDto,
      password: await hashPassword(mockUserDto.password),
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockCreatedUser);

    const result = await service.create(mockUserDto);

    expect(result).toEqual({
      id: mockCreatedUser.id,
      name: mockCreatedUser.name,
      img: mockCreatedUser.img,
      email: mockCreatedUser.email,
      role: mockCreatedUser.role,
    });
  });
});

describe('Integration test with database - findOne', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let savedUserId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdUser = await prismaService.user.create({
      data: {
        name: 'John Doe',
        img: 'https://example.com/johndoe.jpg',
        password: 'encrypted-pass-hahaha',
        email: 'john@example.com',
      },
    });

    savedUserId = createdUser.id;
  });

  it('should return the user data when the user is found', async () => {
    const result = await service.findOne(savedUserId);
    expect(result.id).toEqual(savedUserId);
  });

  afterAll(async () => {
    await prismaService.user.delete({
      where: {
        id: savedUserId,
      },
    });

    await prismaService.$disconnect();
  });
});
 */
