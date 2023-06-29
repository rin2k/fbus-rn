import {protectedAxios} from './api-service';

export function getCoordinationService(id) {
  const url = `/Coordinations/${id}`;
  return protectedAxios.get(url);
}

export function getCoordinationsService() {
  const url = `Coordinations`;
  return protectedAxios.get(url);
}
