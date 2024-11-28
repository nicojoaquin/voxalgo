// libs/functions/src/utils/find-customer.function.ts
import { PrismaService } from '../../../prisma/src/prisma.service';
import { PreCallFunction } from '../interfaces/function.interface';
import { FunctionBase } from './function-base.class';

export class FindCustomerFunction extends FunctionBase {
  constructor(private prisma: PrismaService) {
    super('findCustomer', 'Find Customer', 'pre-call', {}); // Initialize base class
  }

  /**
   * Executes the logic to find a customer by their SIP URI.
   * @param customerData Customer information from the incoming request.
   * @returns The customer data from the database.
   */
  async execute(customerData: any): Promise<any> {
    console.log('Executing FindCustomerFunction...');
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerData.sipUri } //change ti sipUri...
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  /**
   * Logs execution details.
   */
  logDetails(): void {
    console.log(`Function [${this.id}] - ${this.name} executed successfully.`);
  }
}
