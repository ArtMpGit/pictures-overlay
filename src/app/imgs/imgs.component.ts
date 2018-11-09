import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imgs',
  templateUrl: './imgs.component.html',
  styleUrls: ['./imgs.component.css']
})

export class ImgsComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  selectedImg: string = "http://www.ferramentaslp.com.br/wp-content/uploads/2014/12/MACHADO-COM-CABO-4-600x600.jpg";

  selectedMask: string = "../../assets/mascara.png";
  
  background: boolean = false;

  images: Array<any> = new Array<any>();
  downloadUrl: string;
  reader = new FileReader();

  constructor() { }

  ngOnInit() {
    this.reader.onload = (event: any) => {
      let image = new Image();
      image.src = event.target.result;
      this.images.push(image);

      if(this.background) {
        this.selectedImg = event.target.result;
        this.background = false;
      }
      else this.selectedMask = event.target.result;
    }
  }

 

  uploadImg(file: FileList) {
  
    this.reader.readAsDataURL(file.item(0));

  }

  mergeImgs() {

    let canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let context = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 600;
    context.globalAlpha = 1.0;
    
    context.drawImage(this.images[0], 0, 0, 600, 600);
    context.drawImage(this.images[1], 0, 0);
    context.save();
    this.downloadUrl = canvas.toDataURL();    // img1.src = this.selectedImg;
    
  }

}
