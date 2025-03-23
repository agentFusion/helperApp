import { env } from "@huggingface/transformers";
import sharedVars from "../sharedVars.js";
import { cwd } from "node:process";
export default async function () {
    sharedVars.ort.env.wasm.simd = true;
    sharedVars.ort.env.wasm.proxy = true;
    const path = cwd() + '/';
    env.cacheDir = path + "cache/";
    env.allowRemoteModels = true;
}
