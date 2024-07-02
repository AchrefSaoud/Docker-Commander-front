import { Component, OnInit } from '@angular/core';
import { DockerHubService } from '../docker-hub.service';
import { HttpClient } from '@angular/common/http';
import { DockerserviceService } from '../dockerservice.service';

interface Image {
  ID: string;
  Tag: string;
  Size: string;
  Repository: string;
  CreatedSince: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  suggestedImages: string[] = [];
  searchQuery: string = '';
  images: Image[] = [];
  filteredImages: Image[] = this.images;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private dockerHubService: DockerHubService, private http: HttpClient, private dockerservice: DockerserviceService) {}

  ngOnInit(): void {
    this.fetchSuggestedImages('');
    this.getImages();
  }

  filterImages(): void {
    this.filteredImages = this.images.filter(image =>
      image.ID.includes(this.searchQuery) ||
      image.Repository.includes(this.searchQuery) ||
      image.Tag.includes(this.searchQuery) ||
      image.Size.includes(this.searchQuery) ||
      image.CreatedSince.includes(this.searchQuery)
    );
  }

  fetchSuggestedImages(query: string): void {
    this.dockerHubService.getSuggestedImages(query).subscribe({
      next: images => {
        this.suggestedImages = images;
      },
      error: err => {
        console.error('Error fetching suggested images:', err);
      }
    });
  }

  getImages(){
    this.dockerservice.getImages().subscribe(
      data => {
        this.images = data;
        this.filteredImages = this.images;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

  pullImage(imageName: string): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.dockerservice.pullImage(imageName).subscribe(
      response => {
        console.log('Response:', response);
        this.isLoading = false;
        if (response.includes('successfully')) {
          this.successMessage = response;
          this.errorMessage = '';
          this.getImages();
        } else {
          this.errorMessage = response;
          this.successMessage = '';
        }
      },
      error => {
        console.error('Error pulling image:', error);
        this.isLoading = false;
        this.errorMessage = 'Error pulling image';
        this.successMessage = '';
      });
  }

  deleteImage(ID: string): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.dockerservice.deleteImage(ID).subscribe({
      next: response => {
        console.log('Response:', response);
        if (response.includes('successfully')) {
          this.successMessage = response;
          this.errorMessage = '';
          this.images = this.images.filter(img => img.ID !== ID);
          this.filterImages();
        } else {
          this.errorMessage = response;
          this.successMessage = '';
        }
      },
      error: err => {
        console.error('Error deleting image:', err);
        this.errorMessage = 'Error deleting image';
        this.successMessage = '';
      }
    });
  }
  runContainer(id:string):void{
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.dockerservice.runContainer(id).subscribe(
      response => {
        console.log('Response:', response);
        this.isLoading = false;
        if (response.includes('successfully')) {
          this.successMessage = response;
          this.errorMessage = '';
        } else {
          this.errorMessage = response;
          this.successMessage = '';
        }
      },
      error => {
        console.error('Error Runing image:', error);
        this.isLoading = false;
        this.errorMessage = 'Error Runing image';
        this.successMessage = '';
      }
    );
  }
}
