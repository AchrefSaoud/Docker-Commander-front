import { Component, OnInit } from '@angular/core';
import { DockerserviceService } from '../dockerservice.service';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  NumberOfImages!: number;
  NumberOfContainers!:number;
  NumberOfRuningContainers!:number;
  systemInfo!:SystemInfo;
  constructor(private dockerservice:DockerserviceService){}
  ngOnInit(): void {
      this.dockerservice.getImages().subscribe(
        data => {
          this.NumberOfImages=data.length;
        },
        error => {
          console.error('Error fetching images:', error);
        }
      );
      this.dockerservice.getSystemInfo().subscribe(
        data=>{
          this.systemInfo=data;
        },
        error=>{
          console.error('Error fetching system info:', error);
        }
      );
      this.dockerservice.getContainers().subscribe(
        response=>{
          this.NumberOfContainers=response.length;
          this.NumberOfRuningContainers=0;
          response.forEach(v=>{
            if(v.Status.includes('Up')){
              this.NumberOfRuningContainers++;
            }
          })
        },
        error => {
          console.error('Error fetching containers:', error);
        }
      );
  }
  
}
