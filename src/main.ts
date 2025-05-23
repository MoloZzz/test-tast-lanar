import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './common/filter/exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // then validator will strip validated object of any properties that do not have any decorators (ValidatorOptions)
            transform: true, // allow automatic transformation of incoming data (ValidationPipeOptions)
            transformOptions: {
                enableImplicitConversion: true, // enable transformation of data types (ClassTransformOptions)
            },
        }),
    );
    app.useGlobalFilters(new ExceptionsFilter());
    const configService = app.get(ConfigService);

    if (configService.get<string>('API_DOCS_ENABLED') === 'true') {
        const config = new DocumentBuilder()
            .setTitle('Portfolio publication API')
            .setDescription('Task for Lanars company')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api-docs', app, document);
    }
    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
