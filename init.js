import { initApis } from "./apis.js";
import configTransformerJsPipes from "./onnxFunctions/configTransformerJsPipes.js";
import { tjs20LoadModels } from "./onnxFunctions/tjs20LoadModels.js";
import sharedVars from "./sharedVars.js";
import { extractArgs } from "./utils.js";
export async function init() {
    sharedVars.passedArgs = extractArgs();
    await configTransformerJsPipes();
    await tjs20LoadModels();
    await initApis();
    console.log("ok");
}
