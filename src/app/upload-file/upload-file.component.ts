import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFileService } from '../service/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFiles?: FileList;
   fileInfos:any;
  currentFile?: File;
  public imagePath: any;
  newFile :any;
  imgURL:any;
  message = '';
  errorMsg = '';
  submitted = false;
  imageToShow: any;
  isImageLoading: boolean | undefined;

  constructor(private uploadService: UploadFileService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.loadAll();
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
  selectFile(event: any): void {
      if (event.target.files.length > 0){
        const file = event.target.files[0];
        this.currentFile = file;
      this.selectedFiles = event.target.files;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
  
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
     
    }
  }

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
  }
  /**
   * return all files
   */
loadAll(){
  this.uploadService.loadAll().subscribe(
    res=>{
        this.fileInfos = res;
        console.log(res);
    }
    ,
    error=>{
      console.log(error);
    }
  )
}


    getImageFromService(event:any) {
      this.isImageLoading = true;
      this.uploadService.getImageData(event.target.value).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  getData(event:any) {
    this.submitted = true;
    this.uploadService.getData(event.target.value).subscribe(
      response =>{
        this.newFile = response;
        console.log(this.newFile);
        var reader = new FileReader();
      
       // this.imagePath = file;
        reader.readAsDataURL(this.newFile); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
      }
     );
   
  }
  public upload(): void {
    this.submitted = false;
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err) => {
            console.log(err.errorMessage);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

}
