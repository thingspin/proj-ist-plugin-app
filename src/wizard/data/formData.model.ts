export class Project {
    name: string = '';
}

export class Input {
    name: string = '';
    topic: string = '';
}

export class Platform {
    name: string = '';
}

export class Model {
    name: string = '';
    path: string = '';
}

export class Algorithm {
    name: string = '';
    path: string = '';
}

export class FormData {

    project: Project = new Project();
    input: Input = new Input();
    platform: Platform = new Platform();
    model: Model = new Model();
    algorithm: Algorithm = new Algorithm();

    clear() {
        delete this.project;
        delete this.input;
        delete this.platform;
        delete this.model;
        delete this.algorithm;

        this.project = new Project();
        this.input = new Input();
        this.platform = new Platform();
        this.model = new Model();
        this.algorithm = new Algorithm();
    }
}