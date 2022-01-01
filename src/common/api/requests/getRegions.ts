import axios from 'axios';
import ApiConfig from '../config';

export default async function getRegions(
  apiConfig: ApiConfig,
): Promise<string[]> {
  const resp = await axios.get(apiConfig.getRegionsUrl());
  return resp.data.regions;
}
