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

  @IsOptional()
  @IsUUID()
  demandId: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  researchGroupId?: string;

  @IsOptional()
  @IsUUID()
  demandId?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
}
