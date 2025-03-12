import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  public?: boolean;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
  projects?: string[];
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
  projects?: string[];

  public: boolean;
}

export class SuggestDemandDTO {
  id: string;
  name: string;
  description: string;
}
