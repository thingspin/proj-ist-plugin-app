export interface InferenceConfig {
    cid:            String;
    cname:          String;
    model:          String;
    modelFiles:     String[];
    algorithmName:  String;
    algorithmType:  String;
    algorithmFiles: String[];
    framework:      String;
    inputInfo:      String;
    outputInfo:     String;
    running:        any;
    error:          String;
}

export interface AppModel {
    name: string;
    defaultNavUrl: string;
    enabled: boolean;
    hasUpdate: boolean;
    id: string;
    inlcudes: any[];
    info: any;
    jsonData: any;
    latestVersion: string;
    module: string;
    pinned: boolean;
    state: string;
    type: string;
    dependencies: any;
}
