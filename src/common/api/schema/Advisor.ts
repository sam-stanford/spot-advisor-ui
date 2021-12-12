export type AdvisorWeights = {
  price: number;
  availability: number;
  performance: number;
};

type Advisor = {
  name: string;
  weights: AdvisorWeights;
};
export default Advisor;
