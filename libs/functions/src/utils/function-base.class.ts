import { GenericFunction } from '../interfaces/function.interface';

/**
 * Abstract base class for reusable functions in microservices.
 */
export abstract class FunctionBase implements GenericFunction {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, any>;

  constructor(id: string, name: string, type: string, parameters: Record<string, any>) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.parameters = parameters;
  }

  /**
   * Abstract method that must be implemented by all derived classes.
   */
  abstract execute(...args: any[]): Promise<any>;

  /**
   * Log the details of the function execution.
   */
  logDetails(): void {
    console.log(`Executing function ${this.name} [${this.type}] with ID: ${this.id}`);
  }
}
