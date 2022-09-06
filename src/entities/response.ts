export interface ApiResponseBody {
  text: string;
}

export interface ApiErrorResponseBody {
  error: string;
  statusCode: number;
  method: string;
}

export enum HttpStatusCodes {
  http_5xx = 500
}
