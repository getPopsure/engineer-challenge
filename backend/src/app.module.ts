import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loggingMiddlewarePrisma } from './common/middleware/logging.middleware';
import { CustomerModule } from './customer/customer.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddlewarePrisma(new Logger('PrismaMiddleware'))],
      },
    }),
    PoliciesModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
