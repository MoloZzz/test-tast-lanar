import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintError, ValidationError, ForeignKeyConstraintError, DatabaseError } from 'sequelize';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let message = 'Internal server error';
        let errors: any[] = [];

        // Handle known NestJS HTTP exceptions
        if (exception instanceof BadRequestException) {
            status = 400;
            const responseData = exception.getResponse();
            message = this.extractMessage(responseData, 'Bad request');
        } else if (exception instanceof UnauthorizedException) {
            status = 401;
            message = 'Unauthorized';
        } else if (exception instanceof ForbiddenException) {
            status = 403;
            message = 'Forbidden';
        } else if (exception instanceof NotFoundException) {
            status = 404;
            message = 'Not found';
        } else if (exception instanceof ConflictException) {
            status = 409;
            message = 'Conflict';
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse();
            message = this.extractMessage(responseData, exception.message);
        }

        // Sequelize: Unique constraint (like email or username already exists)
        else if (exception instanceof UniqueConstraintError) {
            status = 400;
            message = 'Unique constraint violation';
            errors = exception.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
        }

        // Sequelize: Validation failed
        else if (exception instanceof ValidationError) {
            status = 400;
            message = 'Validation failed';
            errors = exception.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
        }

        // Sequelize: Invalid foreign key reference
        else if (exception instanceof ForeignKeyConstraintError) {
            status = 400;
            message = 'Invalid foreign key reference';
        }

        // Sequelize: General DB errors
        else if (exception instanceof DatabaseError) {
            status = 500;
            message = 'Database error';
        }

        // Catch-all
        else if (exception?.message) {
            message = exception.message;
        }

        return response.status(status).json({
            statusCode: status,
            message,
            ...(errors.length ? { errors } : {}),
        });
    }

    private extractMessage(responseData: any, fallback: string): string {
        if (typeof responseData === 'string') return responseData;
        if (Array.isArray(responseData?.message)) return responseData.message.join(', ');
        return responseData?.message || fallback;
    }
}
