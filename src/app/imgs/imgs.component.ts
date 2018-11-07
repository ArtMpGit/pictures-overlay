import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import mergeImages from 'merge-images';

@Component({
  selector: 'app-imgs',
  templateUrl: './imgs.component.html',
  styleUrls: ['./imgs.component.css']
})

export class ImgsComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  selectedImg: string = "http://www.ferramentaslp.com.br/wp-content/uploads/2014/12/MACHADO-COM-CABO-4-600x600.jpg";
  selectedToUpload

  selectedMask: string = "../../assets/mascara.png";

  background: boolean = false;
  mask: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  uploadImg(file: FileList, selection) {
    this.selectedToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) =>{

      if(this.background) {
        this.selectedImg = event.target.result;
        this.background = false;
      }

      if(this.mask) {
        this.selectedMask = event.target.result;
        this.mask = false;
      }
    }
    reader.readAsDataURL(this.selectedToUpload);
  }

  mergeImgs() {

      let canvas: HTMLCanvasElement = this.canvas.nativeElement;
      let context = canvas.getContext('2d');

      let img1 = new Image();
      let img2 = new Image();

      img1.onload = () => {
        canvas.width = img1.width;
        canvas.height = img1.height;
        img2.src = this.selectedMask;
      };
      img2.onload = () => {
        context.globalAlpha = 1.0;
        context.drawImage(img1, 0, 0);
        context.globalAlpha = 1.0;
        context.drawImage(img2, 0, 0);
      };
        img1.src = this.selectedImg;
  }
}
