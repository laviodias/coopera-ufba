import { IsNotEmpty } from 'class-validator';

export class CreateKnowledgeAreaDto {
  @IsNotEmpty()
  name: string;
}
