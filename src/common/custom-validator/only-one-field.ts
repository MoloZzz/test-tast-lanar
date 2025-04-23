import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function OnlyOneField(propertyNames: string[], validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'onlyOneField',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyNames],
            options: validationOptions,
            validator: {
                validate(_: any, args: ValidationArguments) {
                    const object = args.object as any;
                    const definedFields = propertyNames.filter((field) => !!object[field]);
                    return definedFields.length === 1;
                },
                defaultMessage(args: ValidationArguments) {
                    return `Only one of the following fields must be defined: ${propertyNames.join(', ')}`;
                },
            },
        });
    };
}
