export type AdvisorWeights = {
  price: number;
  availability: number;
  performance: number;
};

type Advisor = {
  type: string;
  weights: AdvisorWeights;
};
export default Advisor;
