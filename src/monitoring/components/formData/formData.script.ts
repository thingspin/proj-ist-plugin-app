export class ScriptInfo {
    constructor(
        public cid: string,
        public cname: string,
        public model: string,
        public framework: string,
        public inputInfo: string,
        public outputInfo: string,
        public algorithmType: string,
        public algorithmName: string) {
    }
}