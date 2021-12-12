import Advisor from './schema/Advisor';
import Options from './schema/Options';
import Service from './schema/Service';

export default async function getInstances(args: {
  s: Service[];
  a: Advisor;
  o: Options;
}) {
  console.log(args);
}
