import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DockerHubService {

  private apiUrl = '/api/v2/repositories/library/';

  constructor(private http: HttpClient) { }

  getSuggestedImages(query: string): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}?search=${query}`)
      .pipe(
        map(response => response.results.map((result: any) => result.name))
      );
  }
}
