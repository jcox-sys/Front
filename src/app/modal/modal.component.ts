import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor( public  modalService: ModalService) {
  
  }



 openModal() {
  this.modalService.openModal();
}
closeModal() {
  this.modalService.closeModal();
}

}
