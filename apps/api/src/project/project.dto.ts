import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  researchGroupId: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUUID()
  demandId: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  keywords?: string[];
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  demandId?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  keywords?: string[];
}
