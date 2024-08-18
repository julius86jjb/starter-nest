import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../entities/user.entity';
import { ValidRoles } from '../interfaces/valid-roles.interface';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user)
      throw new BadRequestException('User not found');

    if (user.id === req.params.id || user.roles.includes(ValidRoles.admin))
      return true;

    throw new ForbiddenException('You can not perform this action [not current user or Admin]')


  }
}
