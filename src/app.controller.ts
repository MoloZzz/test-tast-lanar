import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() {}

    @Get()
    async ping(): Promise<string> {
        return 'pong';
    }
}
