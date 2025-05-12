import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

enum UserType {
  RESEARCHER = 'RESEARCHER',
  COMPANY = 'COMPANY',
}

enum ResearcherType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

enum UserRole {
  ADMIN = 'ADMIN',  
  USER = 'USER',
}

enum UserStatus {
  APPROVED = 'APPROVED',
  BLOCK = 'BLOCK',
  PENDING = 'PENDING',
}

export class CreateCompanyDto {
  contactName?: string;

  @IsEmail()
  contactEmail?: string;

  contactPhone?: string;
}

export class CreateResearcherDto {
  urlLattes?: string;

  @IsIn([ResearcherType.STUDENT, ResearcherType.TEACHER])
  researcherType: ResearcherType;
}

export class UpdateUserDto {
  @IsIn([UserRole.ADMIN, UserRole.USER])
  role: UserRole;

  @IsIn([UserStatus.APPROVED, UserStatus.BLOCK, UserStatus.PENDING])
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

  @IsOptional()
  @IsIn([UserType.COMPANY, UserType.RESEARCHER])
  utype?: UserType;

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
