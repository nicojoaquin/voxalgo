import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  test(data: { status: string }) {
    return { message: 'Hello from Example Service!', ...data };
  }
}
