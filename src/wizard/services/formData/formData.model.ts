export class Project {
    name: String = '';
    cid: String;
    inputInfo: String;
    outputInfo: String;
}

export class Platform {
    name: String = '';
}

export class Model {
    name: String = '';
    models: String[];
    files: FileList;
}

export class Algorithm {
    name: String = '';
    algorithms: String[];
    files: FileList;
}

export class FormData {

    project: Project = new Project();
    platform: Platform = new Platform();
    model: Model = new Model();
    algorithm: Algorithm = new Algorithm();

    clear() {
        delete this.project;
        delete this.platform;
        delete this.model;
        delete this.algorithm;

        this.project = new Project();
        this.platform = new Platform();
        this.model = new Model();
        this.algorithm = new Algorithm();
    }
}
