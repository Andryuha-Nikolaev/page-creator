"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cors_origin_config_1 = require("./config/cors-origin.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: cors_origin_config_1.corsOrigin,
        credentials: true,
        exposedHeaders: 'set-cookie',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PageCreator OpenApi')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const options = {
        ignoreGlobalPrefix: true,
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory);
    await app.listen(process.env.PORT ?? 4200);
}
void bootstrap();
//# sourceMappingURL=main.js.map