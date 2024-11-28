/**
 * Interface for defining a generic function structure.
 */
export interface GenericFunction {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, any>; // Flexible key-value pair for function parameters

  /**
   * Executes the function logic and returns a result.
   * @param args Optional arguments for the function.
   * @returns A promise resolving to any result type.
   */
  execute(...args: any[]): Promise<any>;

  /**
   * Logs execution details of the function.
   */
  logDetails(): void;
}

/**
 * Interface for defining a pre-call function, extending the generic function structure.
 */
export interface PreCallFunction extends GenericFunction {
  /**
   * Executes the pre-call function logic with specific customer data.
   * @param customerData The customer data to be processed.
   * @returns A promise resolving to any result type.
   */
  execute(customerData: any): Promise<any>;
}
