import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  public?: boolean;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsOptional()
  keywords?: string[];

  @IsOptional()
  projects?: string[];
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsOptional()
  keywords?: string[];

  @IsOptional()
  projects?: string[];

  @IsOptional()
  public?: boolean;
}

export class SuggestDemandDTO {
  id: string;
  name: string;
  description: string;
}
