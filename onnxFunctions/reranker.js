import sharedVars from "../sharedVars.js";
export default async function (args) {
    const inputs = sharedVars.rerankerPipe_tokenizer(new Array(args.documents.length).fill(args.query), { text_pair: args.documents, padding: true, truncation: true });
    const { logits } = await sharedVars.rerankerPipe_model(inputs);
    return logits.sigmoid().tolist()
        .map(([score], i) => ({
        corpus_index: i,
        score,
        ...(args.return_documents ? { text: args.documents[i] } : {})
    })).sort((a, b) => b.score - a.score).slice(0, args.top_k);
}
