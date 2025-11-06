export type AuthReq = {
  "email": string,
  "password": string,
}

export type AuthRes = {
  "success": boolean,
  "message": string,
  user: {
    "id": number,
    "name": string,
    "email": string,
    "role": string,
    "phone": string | null,
    "address": string | null,
  },
  "token": string,
}
