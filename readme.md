## Installation

- copy:
    - git clone https://github.com/AgentFusion/helperApp
- install:
    - npm install
- run:
    - node index.js --language=en


----------

<!-- - note: if you see this message in your terminal  "done. now open  http://localhost:port from your browser" it means the AgentFusion webapp now can connect to the helperApp. -->
- note: if you see this message in your terminal  "done. now the AgentFusion web-app can connect ..." it means the AgentFusion web-app now can connect to the helperApp .
- * just remember to set providers to the helperApp in the setting(leftMenu)

----------
- note: currently supported languages are :
{
    en: 'english',
    de: 'German(Deutsch)',
    fa: 'Farsi(فارسی)',
    ar: 'Arabic(العربية)',
    tr: 'Turkish(Türkçe)',
    es: 'spanish(spanish)',
    zh: 'Chinese(简体中文)',
}
---------------
- note: wait for  models to download or download them manually and put them in "cache/"
    - jinaai/jina-reranker-v2-base-multilingual/  (q8)
    - onnx-community/Florence-2-base/ (fp32)
    - sentence-transformers/all-MiniLM-L6-v2/ (q8)
    - onnx-community/whisper-turbo/  (q8)
---------------
- *note: the helperApp(this app) is a quick/temporary solution to improve speed and compability of models for the AgentFusion web-app till we migrate to socket/webgpu
