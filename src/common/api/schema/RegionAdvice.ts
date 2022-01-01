import Assignments from './Assignments';
import Instance from './Instance';

type RegionAdvice = {
  score: number;
  instances: { [id: string]: Instance };
  assignments: Assignments;
};
export default RegionAdvice;
