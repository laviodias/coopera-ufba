import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ResearcherType, UserRole, UserStatus } from '@prisma/client';

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
  status: UserStatus;
  utype?: any;
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  img?: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

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
