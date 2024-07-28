import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetDep = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();

        const department = req.department

        if(!department) 
            throw new InternalServerErrorException('department not found (req)');

        return (!data) ? department : department[data]
    }
)