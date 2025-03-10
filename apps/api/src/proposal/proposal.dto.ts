import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class ProposalDto {
  @IsNotEmpty()
  @IsUUID()
  researchGroupId: string;

  @IsNotEmpty()
  @IsUUID()
  demandId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsUUID()
  receiverId: string;
}
