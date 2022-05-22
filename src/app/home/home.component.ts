import { Component, OnInit } from '@angular/core';
import { CardContent } from 'src/models/cardcontent.model';
import { UnsplashService } from 'src/services/unsplash.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: CardContent[];

  page = 1;
  pageSize = 24;

  faEye = faEye;

  constructor(private unsplashService: UnsplashService) { }

  //this makes the subscription of home content by using the API request:
  ngOnInit(): void {
    this.unsplashService.getHomeContent(this.page).subscribe(
      (resp) => {
        this.loadCards(resp);
        console.log(resp);
      });
  }

  loadCards(cards) {
    this.cards = cards;
  }

}
