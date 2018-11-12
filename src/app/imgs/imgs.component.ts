import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imgs',
  templateUrl: './imgs.component.html',
  styleUrls: ['./imgs.component.css']
})

export class ImgsComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  defaultLink: string = "https://www.arab-security.com/wp-content/uploads/2015/09/default-placeholder-600x600.png";
  
  selectedImg = new Image();
  selectedMask = new Image();
  
  background: boolean = false;

  downloadUrl: string;
  reader = new FileReader();

  constructor() { }

  ngOnInit() {
    this.selectedImg.src = this.defaultLink;
    this.selectedMask.src = this.defaultLink;

    this.reader.onload = (event: any) => {

      if(this.background) {
        this.selectedImg.src = event.target.result;
        this.background = false;
      }
      else this.selectedMask.src = event.target.result;
    }
  }

 

  uploadImg(file: FileList) {
  
    this.reader.readAsDataURL(file.item(0));
  }

  mergeImgs() {
    if(!this.validateSelection()){
      alert("Both background and mask must be selected");
    }

    else {

      let canvas: HTMLCanvasElement = this.canvas.nativeElement;
      let context = canvas.getContext('2d');
      
      canvas.width = 600;
      canvas.height = 600;
      context.globalAlpha = 1.0;
      
      context.drawImage(this.selectedImg, 0, 0, 600, 600);
      context.drawImage(this.selectedMask, 0, 0);
      this.downloadUrl = canvas.toDataURL(); 

    }
    
  }

  validateSelection(): boolean {
    
    if
    (this.selectedImg.src === this.defaultLink || this.selectedMask.src === this.defaultLink)
    return false;

    else return true;
  }

  resetImages() {
    this.selectedImg.src = this.defaultLink;
    this.selectedMask.src = this.defaultLink;
  }

}
