import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {POSReturnDTO} from '../interfaces/POSReturnDTO';

@Injectable({
  providedIn: 'root'
})
export class PartOfSpeechService {

  constructor(private httpClient: HttpClient) {
  }


  public postService(value): Observable<POSReturnDTO[]> {
    const url = `${environment.backendUrl}`;
    return this.httpClient.post<POSReturnDTO[]>(url, value);
  }

}
