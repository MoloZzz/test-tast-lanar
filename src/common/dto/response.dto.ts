import { Expose } from 'class-transformer';

export class ResponseProfileDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    username: string;
}
