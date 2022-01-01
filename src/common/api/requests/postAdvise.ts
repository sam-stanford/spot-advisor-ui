import axios from 'axios';
import ApiConfig from '../config';
import Advice from '../schema/Advice';
import AdviseRequest from '../schema/AdviseRequest';

export default async function postAdvise(
  request: AdviseRequest,
  config: ApiConfig,
): Promise<Advice> {
  const resp = await axios.post(config.getAdviseUrl(), request, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return resp.data as Advice;
}
