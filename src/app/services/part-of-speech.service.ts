import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartOfSpeechService {

  constructor(private httpClient: HttpClient) {
  }


  public postService(value) {
    const url = `${environment.backendUrl}`;
    return this.httpClient.post(url, value);
  }

}
