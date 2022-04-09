export interface PriceFuelCalculator {
  /**
   * Get cost (€) of the fuel consumed during a distance.
   *
   * @param distance in kilometers.
   */
  getPrice(distance: number): number;
}
