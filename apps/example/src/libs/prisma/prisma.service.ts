import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.POSTGRES_URI,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to DB!!');
  }
}
