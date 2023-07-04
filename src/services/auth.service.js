import { publicAxios } from "./api-service";

export function authService(idToken) {
  const url = `/Auth`;
  return publicAxios.post(url, idToken);
}
