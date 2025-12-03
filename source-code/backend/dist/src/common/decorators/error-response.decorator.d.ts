export declare function BadRequestResponse(): MethodDecorator & ClassDecorator;
export declare function UnauthorizedResponse(): MethodDecorator & ClassDecorator;
export declare function UnprocessableEntityResponse(): MethodDecorator & ClassDecorator;
export declare function ErrorCommonResponses(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
