import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardContent } from "src/models/cardcontent.model";
import { map } from "rxjs/operators";

@Injectable()
export class UnsplashService {

    favourites: CardContent[] = [];

    constructor(private httpClient: HttpClient) { }

    //Method to get home content from unsplash API:
    getHomeContent(page): Observable<CardContent[]> {
        let url = 'https://api.unsplash.com/photos?page='
        let orderBy = '&per_page=30&order_by=latest'
        let key = '&client_id=gxNCsWoxQjSyxiHLppkxHe2GTa2RWPTOXHzam7VBgLM'
        let fullAddress = url + page + orderBy + key;

        return this.httpClient.get(fullAddress)
            .pipe(map((resp) => {
                return this.convertContent(resp);
            }));
    }

    //Method to get content from one image ID on unsplash API:
    getDetails(image_id): Observable<CardContent> {
        let url = 'https://api.unsplash.com/photos/';
        let key = '?client_id=gxNCsWoxQjSyxiHLppkxHe2GTa2RWPTOXHzam7VBgLM';
        let fullAddress = url + image_id + key;

        return this.httpClient.get(fullAddress)
            .pipe(map((resp) => {
                return this.convertDetail(resp);
            }));
    }

    //Method to get search content on unsplash API:
    getSearchContent(searchKeyword, page): Observable<CardContent[]> {
        let fullAddress = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${searchKeyword}&client_id=gxNCsWoxQjSyxiHLppkxHe2GTa2RWPTOXHzam7VBgLM`;
        return this.httpClient.get(fullAddress)
            .pipe(map((resp) => {
                return this.convertContent(resp);
            }));
    }

    //Method to convert json data for home and search:
    convertContent(httpResponse): CardContent[] {
        let contentResponse = httpResponse.results;
        let Cards = [];

        if (contentResponse !== undefined) {
            for (let i = 0; i < contentResponse.length; i++) {

                let title = contentResponse[i].description;
                if (title != null) {
                    title = contentResponse[i].description;
                }
                else {
                    title = contentResponse[i].alt_description;
                }
                let id = contentResponse[i].id;
                let homeImage = contentResponse[i].urls.raw + "&fit=crop&w=500&h=500";
                let detailImage = contentResponse[i].urls.regular + "&fit=crop&w=500&h=500";
                let date = contentResponse[i].created_at;
                let fullDate = date.slice(0, -15);
                let day = fullDate.slice(8);
                let month = fullDate.slice(5, -3);
                let year = fullDate.slice(0, -6);
                let formatedDate = `${day}/${month}/${year}`;
                let author = contentResponse[i].user.name;
                let likes = contentResponse[i].likes;
                let downloads = contentResponse[i].likes;
                let tags = [''];

                Cards.push(new CardContent(id, homeImage, detailImage, title, formatedDate, author, likes, downloads, tags));
            }
            return Cards;
        } else {
            for (let i = 0; i < httpResponse.length; i++) {

                let title = httpResponse[i].description;
                if (title != null) {
                    title = httpResponse[i].description;
                }
                else {
                    title = httpResponse[i].alt_description;
                }
                let id = httpResponse[i].id;
                let homeImage = httpResponse[i].urls.raw + "&fit=crop&w=500&h=500";
                let detailImage = httpResponse[i].urls.regular + "&fit=crop&w=500&h=500";
                let date = httpResponse[i].created_at;
                let fullDate = date.slice(0, -15);
                let day = fullDate.slice(8);
                let month = fullDate.slice(5, -3);
                let year = fullDate.slice(0, -6);
                let formatedDate = `${day}/${month}/${year}`;
                let author = httpResponse[i].user.name;
                let likes = httpResponse[i].likes;
                let downloads = httpResponse[i].likes;
                let tags = [''];

                Cards.push(new CardContent(id, homeImage, detailImage, title, formatedDate, author, likes, downloads, tags));
            }
            return Cards;
        }
    }

    //Method to convert json data for details:
    convertDetail(httpResponse): CardContent {
        let title = httpResponse.description;
        let tags = [];
        if (title != null) {
            title = httpResponse.description;
        }
        else {
            title = httpResponse.alt_description;
        }
        let id = httpResponse.id;
        let homeImage = httpResponse.urls.raw + "&fit=crop&w=500&h=500";
        let detailImage = httpResponse.urls.regular + "&fit=crop&w=500&h=500";
        let date = httpResponse.created_at;
        let fullDate = date.slice(0, -15);
        let day = fullDate.slice(8);
        let month = fullDate.slice(5, -3);
        let year = fullDate.slice(0, -6);
        let formatedDate = `${day}/${month}/${year}`;
        let author = httpResponse.user.name;
        let likes = httpResponse.likes;
        let downloads = httpResponse.downloads;
        for (let i = 0; i < httpResponse.tags.length; i++) {
            let oneTag = httpResponse.tags[i].title;
            tags.push(oneTag);
        }
        return httpResponse = (new CardContent(id, homeImage, detailImage, title, formatedDate, author, likes, downloads, tags));
    }

    //Method to add cards to the favourites array:
    addToFavourites(favourite: CardContent) {
        this.favourites.push(favourite);
    }


    //Method to remove cards to the favourites array:
    revomeFromFavourites(favouritesIndex: number) {
        this.favourites.splice(favouritesIndex, 1);
    }
}