import { Directive, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective {

  content: IonContent

  constructor(public elementRef: ElementRef) {
    this.content = elementRef.nativeElement
    let style = `
    @media(pointer: fine) {
      ::-webkit-scrollbar {
        width: 12px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }
      ::-webkit-scrollbar-thumb {
        background: #ccc;
        cursor: pointer
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #888; 
      }
    }
    `
    let styleElement = document.createElement("style")
    styleElement.innerHTML = style

    this.content.getScrollElement().then(mainContent => {
      mainContent.appendChild(styleElement)
      //console.log(mainContent)
    })
  }

}
