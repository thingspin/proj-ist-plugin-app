// import { ICustomFile } from "file-input-accessor";

export class Project {
    name: String = '';
    cid: String;
    inputInfo: String;
    outputInfo: String;
}

export class Platform {
    name: String = 'TensorFlow';
}

export class Model {
    name: String = '';
    models: String[] = [];
    files: File[] = [];
}

export class Algorithm {
    name: String = '';
    algorithm: String;
    files: File[] = [];
}

export class FormData {

    settings: any;
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
