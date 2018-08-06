export class Project {
    name: String = '';
}

export class Input {
    name: String = '';
    topic: String = '';
}

export class Platform {
    name: String = '';
}

export class Model {
    name: String = '';
    path: String = '';
}

export class Algorithm {
    name: String = '';
    path: String = '';
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
