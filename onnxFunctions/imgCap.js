import { Florence2ForConditionalGeneration } from "@huggingface/transformers";
import { AutoProcessor } from "@huggingface/transformers";
import { AutoTokenizer } from "@huggingface/transformers";
import { RawImage } from "@huggingface/transformers";
import sharedVars from "../sharedVars.js";
export async function imgCapInit() {
    const model_id = 'onnx-community/Florence-2-base/';
    sharedVars.imgCap.model = await Florence2ForConditionalGeneration.from_pretrained(model_id, {
        dtype: 'fp32',
    });
    sharedVars.imgCap.processor = await AutoProcessor.from_pretrained(model_id, {});
    sharedVars.imgCap.tokenizer = await AutoTokenizer.from_pretrained(model_id, {});
}
export async function imgCap(args) {
    const image = args.url ?
        await RawImage.fromURL(args.url) :
        await RawImage.fromBlob(args.imgBlob);
    const vision_inputs = await sharedVars.imgCap.processor(image);
    const task = '<CAPTION>';
    const prompts = sharedVars.imgCap.processor.construct_prompts(task);
    const text_inputs = sharedVars.imgCap.tokenizer(prompts);
    const generated_ids = await sharedVars.imgCap.model.generate({
        ...text_inputs,
        ...vision_inputs,
        max_new_tokens: 100,
    });
    const generated_text = await sharedVars.imgCap.tokenizer.batch_decode(generated_ids, { skip_special_tokens: false })[0];
    const result = await sharedVars.imgCap.processor.post_process_generation(generated_text, task, image.size);
    console.log(result);
    return result['<CAPTION>'];
}
