import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ResearcherType, UserRole, UserStatus } from '@prisma/client';

enum UserType {
  RESEARCHER = 'RESEARCHER',
  COMPANY = 'COMPANY',
}

export class CreateCompanyDto {
  contactName?: string;

  @IsEmail()
  contactEmail?: string;

  contactPhone?: string;
}

export class CreateResearcherDto {
  urlLattes?: string;

  @IsEnum(ResearcherType)
  researcherType?: ResearcherType;
}

export class UpdateUserDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  utype?: 'RESEARCHER_STUDENT' | 'RESEARCHER_TEACHER';
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
  password: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  passwordConfirmation: string;

  @IsEnum(UserType)
  utype: UserType;

  @IsOptional()
  company?: CreateCompanyDto;

  @IsOptional()
  researcher?: CreateResearcherDto;
}

export class ChangePasswordDto {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
  newPassword: string;

  @IsNotEmpty()
  oldPassword: string;
}
