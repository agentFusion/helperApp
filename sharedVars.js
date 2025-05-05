import * as ort from "onnxruntime-node";
import getConfigs from "./configs.js";
const configs = getConfigs();
export class sharedVars {
    static configs = configs;
    static passedArgs = {};
    static embedderPipe;
    static ort = ort;
    static rerankerPipe_model;
    static rerankerPipe_tokenizer;
    static imgCap = {
        model: null,
        processor: null,
        tokenizer: null,
    };
    static transcriber_wisperer_Pipe;
    static synthesizer_mms_pipe;
}
export default sharedVars;
