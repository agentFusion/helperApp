import { sharedVars } from "./sharedVars.js";
export async function embedder(str) {
    const { data } = await sharedVars.embedderPipe(str, {
        normalize: true,
        pooling: 'mean',
    });
    return data;
}
export async function transcripter(args) {
    const isDistilWhisper = false;
    let output = await sharedVars.transcriber_wisperer_Pipe(args.audio, {
        top_k: 0,
        do_sample: false,
        chunk_length_s: isDistilWhisper ? 20 : 30,
        stride_length_s: isDistilWhisper ? 3 : 5,
        ...args.language === 'en' ? {
            language: 'en',
        } : {
            language: args.language,
            task: 'translation',
        },
        return_timestamps: false,
        force_full_sequences: true,
    });
    const qwe = output;
    return qwe;
}
