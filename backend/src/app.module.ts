import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    PoliciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
