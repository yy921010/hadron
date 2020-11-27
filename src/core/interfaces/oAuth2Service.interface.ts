import { Observable } from 'rxjs';

export interface OAuth2Response {
  status: number;
  errorCode: string;
  errorMessage: string;
}

export interface OAuth2Service {
  authenticate(authorization: string): Observable<OAuth2Response>;
}
