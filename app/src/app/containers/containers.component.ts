import { Component, OnInit } from '@angular/core';
import { DockerserviceService } from '../dockerservice.service';

interface Container {
  Status: string;
  Names: string;
  Command: string;
  CreatedAt: string;
  Ports: string;
  ID: string;
  Image: string;
}

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  containers: Container[] = [];

  containerName!: string;
  imageId!: string;

  containerNameError: string = '';
  imageIdError: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  searchQuery: string = '';
  filteredContainers: Container[] = this.containers;

  constructor(private ds: DockerserviceService) { }

  ngOnInit(): void {
    this.getContainers();
  }

  getContainers(): void {
    this.ds.getContainers().subscribe(
      data => {
        this.containers = data;
        this.filteredContainers = this.containers;
      },
      error => {
        console.error('Error fetching containers:', error);
      }
    );
  }

  filterContainers(): void {
    this.filteredContainers = this.containers.filter(container =>
      container.Status.includes(this.searchQuery) ||
      container.Names.includes(this.searchQuery) ||
      container.Command.includes(this.searchQuery) ||
      container.CreatedAt.includes(this.searchQuery) ||
      container.Ports.includes(this.searchQuery) ||
      container.ID.includes(this.searchQuery) ||
      container.Image.includes(this.searchQuery)
    );
  }

  toggleStartStop(container: Container): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (container.Status.split(' ')[0] === "Up") {
      this.ds.stopContainer(container.ID.substring(1)).subscribe(
        response => {
          this.successMessage = 'Container is stopped successfully';
          container.Status = 'Exited'; 
          this.getContainers(); 
        },
        error => {
          this.errorMessage = 'Failed to stop the running container';
          console.error('Error stopping container:', error);
        }
      );
    } else {
      this.ds.startContainer(container.ID.substring(1)).subscribe(
        response => {
          this.successMessage = 'Container started running successfully';
          container.Status = 'Up'; 
          this.getContainers(); 
        },
        error => {
          this.errorMessage = 'Failed to start the container';
          console.error('Error running container:', error);
        }
      );
    }
  }
  

  deleteContainer(container: Container): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.ds.deleteContainer(container.ID.substring(1)).subscribe(
      response => {
        this.successMessage = 'Container is Deleted successfully';
        this.getContainers();
      },
      error => {
        this.errorMessage = 'Failed to Delete container';
        console.error('Error running container:', error);
      }
    );
  }

  addContainer(): void {
    this.containerNameError = '';
    this.imageIdError = '';
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.containerName || this.containerName.trim().length === 0) {
      this.containerNameError = 'Container name is required';
    }
    if (!this.imageId || this.imageId.trim().length === 0) {
      this.imageIdError = 'Image ID is required';
    }

    if (this.containerNameError || this.imageIdError) {
      return;
    }

    this.ds.runContainerWithname(this.containerName, this.imageId).subscribe(
      response => {
        this.successMessage = 'Container is running successfully';
        this.getContainers();
      },
      error => {
        this.errorMessage = 'Failed to run container';
        console.error('Error running container:', error);
      }
    );
  }
}
