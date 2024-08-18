import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ValidRoles } from 'src/users/auth/interfaces/valid-roles.interface';
import { Auth } from 'src/users/auth/decorators/auth.decorator';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get(':seed')
  @Auth(ValidRoles.admin)
  excecuteSeed(@Param('seed') seed: string) {
    switch (seed) {
      // case 'departments':
      //   return this.seedService.runDepartmentsSeed();
      // default:
      //   break;
    }


  }


}
