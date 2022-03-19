import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as basicAuth from 'express-basic-auth';

export enum SwaggerRunStatusEnum {
  On = 'on',
  Off = 'off',
}
export class SwaggerStarter {
  static start(app: any, path: string = process.env.SWAGGER_API_PATH) {
    if (process.env.SWAGGER_RUN_STATUS === SwaggerRunStatusEnum.On) {
      app.use(
        [
          `/${process.env.SWAGGER_API_PATH}`,
          `/${process.env.SWAGGER_API_PATH}-json`,
        ],
        basicAuth({
          challenge: true,
          users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
          },
        }),
      );

      const options = new DocumentBuilder()
        .setTitle('ATS Backend APIs')
        .setVersion('1.0')
        .setDescription(
          'ATS Backend Apis. Click on each item in the list to see its details',
        )
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup(path, app, document, {
        customCss: readFileSync('swagger.css', 'utf8'),
        swaggerOptions: {
          docExpansion: 'none',
          layout: 'StandaloneLayout',
        },
      });
    }
  }
}
