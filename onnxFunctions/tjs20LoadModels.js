import { pipeline } from "@huggingface/transformers";
import { AutoTokenizer, XLMRobertaModel } from '@huggingface/transformers';
import sharedVars from "../sharedVars.js";
import { imgCapInit } from "./imgCap.js";
export async function tjs20LoadModels() {
    console.log('loading embedder model');
    sharedVars.embedderPipe = await pipeline("embeddings", "Xenova/all-MiniLM-L6-v2", {
        dtype: 'q8',
    });
    console.log('loading reranker model');
    const model_id = 'jinaai/jina-reranker-v2-base-multilingual';
    sharedVars.rerankerPipe_model = await XLMRobertaModel.from_pretrained(model_id, { dtype: 'fp32' });
    sharedVars.rerankerPipe_tokenizer = await AutoTokenizer.from_pretrained(model_id);
    console.log('loading img captioner model');
    await imgCapInit();
    console.log('loading transcriber model');
    sharedVars.transcriber_wisperer_Pipe = await pipeline("automatic-speech-recognition", "onnx-community/whisper-turbo", {
        dtype: 'q8'
    });
    return true;
}
