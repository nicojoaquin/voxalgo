// libs/functions/src/utils/function-registry.ts
import { PrismaService } from '../../../prisma/src/prisma.service';
import { PreCallFunction } from '../interfaces/function.interface';
import { FindCustomerFunction } from './find-customer-function';

/**
 * A registry containing all available pre-call functions.
 * Each function is identified by a unique key.
 */
export const functionRegistry = (
  prisma: PrismaService
): Record<string, () => PreCallFunction> => ({
  findCustomer: () => new FindCustomerFunction(prisma)
  // Add more functions here as needed
  // validateCustomer: () => new ValidateCustomerFunction(),
});
