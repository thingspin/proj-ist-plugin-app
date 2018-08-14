export interface ScriptInfo {
    cid:            string;
    cname:          string;
    model:          string;
    framework:      string;
    inputInfo:      string;
    outputInfo:     string;
    algorithmType:  string;
    algorithmName:  string;
}

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
}
