import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongodbModule } from './config/mongodb.module';
import { HttpModule } from '@nestjs/axios';
import { AuthApiService } from './api-services/auth-api/auth-api.service';
import { CheckHeaderMiddleware } from './core/platform-key-middleware/check-header.middleware';
import { JwtStrategy } from './core/jwt-auth-guard/jwt.strategy';
import { RabbitMqConfigModule } from './config/rabbitmq-config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './models/person.model';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    MongodbModule,
    HttpModule,
    RabbitMqConfigModule,
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [AppController, ProfileController],
  providers: [
    AppService,
    ProfileService,
    AuthApiService,
    JwtStrategy,
    ProfileService,
  ],
})
export class AppModule implements NestModule {
  // MiddlewareConsumer is used to configure the middleware vvv
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
      .forRoutes(
        { path: '*', method: RequestMethod.ALL } /* OR AppController */,
      );
    /*  // to implement other middleware:
     consumer
          .apply(NewMiddleware)
          .forRoutes({ path: 'demo', method: RequestMethod.GET });*/
  }
}
