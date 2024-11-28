import { FunctionBase } from './function-base.class';

/**
 * EXAMPLE - TEST
 * A specific implementation of a reusable function for calculations.
 */
export class CalculationFunction extends FunctionBase {
  constructor(id: string, name: string, parameters: { a: number; b: number }) {
    super(id, name, 'calculation', parameters);
  }

  /**
   * Executes the calculation logic.
   */
  async execute(): Promise<number> {
    this.logDetails();
    const { a, b } = this.parameters;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Parameters "a" and "b" must be numbers.');
    }
    const result = a + b; // Example calculation
    console.log(`Result of calculation: ${result}`);
    return result;
  }
}
