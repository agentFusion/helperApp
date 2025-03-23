import { initApis } from "./apis.js";
import configTransformerJsPipes from "./onnxFunctions/configTransformerJsPipes.js";
import { tjs20LoadModels } from "./onnxFunctions/tjs20LoadModels.js";
export async function init() {
    await configTransformerJsPipes();
    await tjs20LoadModels();
    await initApis();
    console.log("ok");
}
