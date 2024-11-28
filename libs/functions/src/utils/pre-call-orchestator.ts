// libs/functions/src/utils/pre-call-orchestrator.ts

import { PreCallFunction } from "../interfaces/function.interface";

/**
 * Orchestrator for executing pre-call functions in sequence.
 */
export class PreCallOrchestrator {
  private functions: PreCallFunction[] = [];

  /**
   * Adds a pre-call function to the orchestrator.
   * @param func The function to be added.
   */
  addFunction(func: PreCallFunction): void {
    this.functions.push(func);
  }

  /**
   * Executes all added functions in sequence with the given customer data.
   * @param customerData Customer data to pass to each function.
   */
  async executeAll(customerData: any): Promise<void> {
    for (const func of this.functions) {
      console.log(`Executing function: ${func.name}`);
      await func.execute(customerData);
      func.logDetails();
    }
  }
}


