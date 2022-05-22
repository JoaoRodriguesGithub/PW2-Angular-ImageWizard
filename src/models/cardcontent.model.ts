export class CardContent {

    constructor(public id: string,
        public homeImage: string,
        public detailImage: string,
        public title: string,
        public date: string,
        public author: string,
        public likes: number,
        public downloads: number,
        public tags: Array<string>
        ) { }
}
