import http from "node:http";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { embedder, transcripter } from "./modelsFunctions.js";
import reranker from "./onnxFunctions/reranker.js";
import { imgCap } from "./onnxFunctions/imgCap.js";
import sharedVars from "./sharedVars.js";
export async function initApis() {
    const app = express();
    const port = sharedVars.configs.port;
    app.use(bodyParser.json({
        limit: '10mb',
    }));
    app.use(bodyParser.raw({
        limit: "10mb",
    }));
    app.use(bodyParser.text({
        limit: "10mb",
    }));
    app.options("*", cors());
    const expressServer = http.createServer(app);
    app.listen(port, () => {
        console.log(`done. now the AgentFusion web-app can connect. go to the AgentFusion setting(left menu) and set model providers to helperApp .`);
        app.post("/embedder", async (req, res) => {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Content-Type", "application/json");
                const result = await embedder(JSON.parse(req.body)["input"]);
                if (result)
                    return res.send(Array.from(result));
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
        app.post("/reranker", async (req, res) => {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Content-Type", "text/plain");
                const result = await reranker(JSON.parse(req.body)["input"]);
                if (result)
                    return res.send((result));
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
        app.post("/imgCap", async (req, res) => {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Content-Type", "text/plain");
                const b64Img = req.body;
                const convertedB64ToBuff = await base64ToBuff_png(b64Img);
                const finalBlob = new Blob([convertedB64ToBuff], { type: 'image/png' });
                const result = await imgCap({ imgBlob: finalBlob });
                console.log('ok', result);
                if (result)
                    return res.send('' + result);
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
        app.post("/transcripter", async (req, res) => {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                const converted = new Float32Array(req.body.buffer);
                const result = await transcripter({
                    audio: converted,
                    language: sharedVars.passedArgs['language'] ?? 'en'
                });
                console.log(result);
                if (result) {
                    if (result.text) {
                        return res.json({ output: result.text });
                    }
                    else {
                        return res.json({ output: '' });
                    }
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    });
}
export async function base64ToBuff_png(actualB64ImgFile) {
    actualB64ImgFile = actualB64ImgFile.replace('data:image/png;base64,', '');
    const fixed = Uint8Array.from(atob(actualB64ImgFile), c => c.charCodeAt(0));
    const buff = await new Blob([fixed], { type: 'image/png' }).arrayBuffer();
    return buff;
}
