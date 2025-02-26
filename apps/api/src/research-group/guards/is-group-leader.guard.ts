import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ResearchGroupService } from '../research-group.service';

@Injectable()
export class IsGroupLeaderGuard implements CanActivate {
  constructor(private readonly researchGroupService: ResearchGroupService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const groupId = request.params.id;

    const group = await this.researchGroupService.findOne(groupId);
    if (!group) {
      throw new ForbiddenException('Grupo não encontrado.');
    }

    if (group.researcherId !== userId) {
      throw new ForbiddenException('Apenas o líder do grupo pode modificar seus membros.');
    }

    return true;
  }
}
