import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SystemInfo {
  kernelVersion: string;
  operatingSystem: string;
  osType: string;
  architecture: string;
  cpus: number;
  totalMemory: string;
  name: string;
  id: string;
  dockerRootDir: string;
}

interface Image {
  ID: string;
  Tag: string;
  Size: string;
  Repository: string;
  CreatedSince: string;
}
interface Container {
  Status: string;
  Names: string;
  Command: string;
  CreatedAt: string;
  Ports: string;
  ID: string;
  Image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DockerserviceService {

  constructor(private http: HttpClient) {}

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>('http://localhost:8080/api/images');
  }

  pullImage(imageName: string): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/api/images/${imageName}`, {}, { responseType: 'text' as 'json' });
  }

  deleteImage(ID: string): Observable<string> {
    return this.http.delete(`http://localhost:8080/api/images/${ID}`, { responseType: 'text' });
  }
  getSystemInfo():Observable<SystemInfo>{
    return this.http.get<SystemInfo>('http://localhost:8080/api/docker-info');
  }
  runContainer(id:string):Observable<string>{
    return this.http.post<string>(`http://localhost:8080/api/run-container/${id}`,{},{ responseType: 'text' as 'json' });
  }
  getContainers():Observable<Container[]>{
    return this.http.get<Container[]>('http://localhost:8080/api/containers');
  }
  runContainerWithname(name:string,id:string):Observable<string>{
    return this.http.post<string>(`http://localhost:8080/api/run-container/${id}/${name}`,{},{ responseType: 'text' as 'json' });
  }
  deleteContainer(id:string):Observable<string>{
    return this.http.delete(`http://localhost:8080/api/delete-container/${id}`,{ responseType: 'text' });
  }
  stopContainer(id: string): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/api/stop-container/${id}`, {}, { responseType: 'text' as 'json' });
  }

  startContainer(id: string): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/api/start-container/${id}`, {}, { responseType: 'text' as 'json' });
  }
}
