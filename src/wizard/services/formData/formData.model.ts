// import { ICustomFile } from "file-input-accessor";

export class Project {
    name: string;
    cid: string;
}

export class Platform {
    framework: string;
}

export class Model {
    name: string;
    models: string[] = [];
    files: File[] = [];
}

export class Algorithm {
    name: string;
    algorithm: string;
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

export interface MqttSendData {
    cid:            String;
    cname:          String;
    model:          String;
    modelFiles:     String[];
    algorithmName:  String;
    algorithmType:  String;
    algorithmFiles: String[];
    framework:      String;
    mlSetting:      any;
}
