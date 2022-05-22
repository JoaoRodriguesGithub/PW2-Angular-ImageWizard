import { Component } from '@angular/core';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title: string = 'Image Wizzard';

  faHatWizard = faHatWizard;

  public isMenuCollapsed = true;

  searchKeyword: string = '';

  constructor(private modalService: NgbModal) { }

  //this method fires the modal if the variable searchKeyword is empty:
  fireModal() {
    if (this.searchKeyword == '') {
      this.modalService.open(ModalComponent);    
    }
  }

}