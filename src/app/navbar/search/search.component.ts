import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CardContent } from 'src/models/cardcontent.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UnsplashService } from 'src/services/unsplash.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchResultCards: CardContent[];

  searches: { searchKeyword: string };

  faEye = faEye;

  page = 1;
  pageSize = 24;

  constructor(private unsplashService: UnsplashService, private activatedRoute: ActivatedRoute, private router: Router) { }

  //this makes the subscription to the API by looking for the variable searchkeyword:
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.searches = {
          searchKeyword: params['searchKeyword']
        },
          this.unsplashService.getSearchContent(this.searches.searchKeyword, this.page).subscribe(
            (resp) => {
              if (resp.length == 0) {
                this.router.navigate(['not-found']);
              } else {
                this.loadSearchedCards(resp);
              }
            })
      });
  }

  loadSearchedCards(searchResultCards) {
    this.searchResultCards = searchResultCards;
  }
}