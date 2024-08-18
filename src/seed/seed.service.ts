import { Injectable } from '@nestjs/common';
import { DepartmentsService } from 'src/departments/departments.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(private departmentsService: DepartmentsService) { }


  async runDepartmentsSeed() {
    await this.departmentsService.deleteAllProducts();

    const departments = initialData.departments;

    const insertPromises = [];

    departments.forEach(department => {
      insertPromises.push(this.departmentsService.create(department));
    })

    await Promise.all(insertPromises);

    return 'DEPARTMENTS SEED EXECUTED';
  }


}
