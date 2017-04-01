export class Content {
    constructor(
        public name: string,
        public username: string,
        public contentId?: string,
        public userId?: string,
        public created?: Date,
        public updated?: Date,
        public file?: any
    ) {}
}