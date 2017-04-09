export class Content {
    constructor(
        public name: string,
        public username: string,
        public contentId?: string,
        public userId?: string,
        public file?: string,
        public tags?: string,
        public created?: Date,
        public updated?: Date
    ) {}
}