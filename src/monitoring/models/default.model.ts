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
    running:       any;
}
