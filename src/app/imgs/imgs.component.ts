import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imgs',
  templateUrl: './imgs.component.html',
  styleUrls: ['./imgs.component.css']
})

export class ImgsComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  defaultLink: string = "https://www.arab-security.com/wp-content/uploads/2015/09/default-placeholder-600x600.png";

  fileImg;
  selectedImg = new Image();
  selectedMask = new Image();
  readerImg = new FileReader();
  readerBackground = new FileReader();
  
  downloadUrl: string;

  constructor() { }

  ngOnInit() {
    this.selectedImg.src = this.defaultLink;
    this.selectedMask.src = this.defaultLink;

    this.readerImg.onload = (event: any) => {
      this.selectedImg.src = event.target.result;
    }
    this.readerBackground.onload = (event: any) => {
      this.selectedMask.src = event.target.result;
    }
  }

  uploadImg(file: FileList) {
    this.readerImg.readAsDataURL(file.item(0));
  }

  uploadMask(file: FileList) {
    this.readerBackground.readAsDataURL(file.item(0));
  }

  mergeImgs() {

    if (this.validateSelection()) {
      alert("Both background and mask must be selected");
    }

    let canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let context = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 600;
    context.globalAlpha = 1.0;

    context.drawImage(this.selectedImg, 0, 0, 600, 600);
    context.drawImage(this.selectedMask, 0, 0);
    this.downloadUrl = canvas.toDataURL();

  }

  validateSelection(): boolean {

    return this.selectedImg.src === this.defaultLink || this.selectedMask.src === this.defaultLink;

  }

  resetImages() {
    this.selectedImg.src = this.defaultLink;
    this.selectedMask.src = this.defaultLink;
  }

}
