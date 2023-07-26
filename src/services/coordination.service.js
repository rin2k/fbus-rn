import { protectedAxios } from "./api-service";

export function getCoordinationService(id) {
  const url = `/Trips/${id}`;
  return protectedAxios.get(url);
}

export function getCoordinationsService() {
  const url = `Trips`;
  return protectedAxios.get(url);
}
