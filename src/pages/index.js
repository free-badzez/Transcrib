"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var use_toast_1 = require("@/components/ui/use-toast");
var FileUpload_1 = require("@/components/FileUpload");
var TranscriptionResult_1 = require("@/components/TranscriptionResult");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var Index = function () {
    var _a = (0, react_1.useState)(null), selectedFile = _a[0], setSelectedFile = _a[1];
    var _b = (0, react_1.useState)(''), transcription = _b[0], setTranscription = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)('en'), language = _d[0], setLanguage = _d[1];
    var toast = (0, use_toast_1.useToast)().toast;
    // Hardcoded Deepgram API key
    var apiKey = "e90d9ae004d7d5716498b3f706af63931e6a40bc";
    var handleFileSelect = function (file) {
        setSelectedFile(file);
        setTranscription('');
        toast({
            title: "File selected",
            description: file.name,
        });
    };
    var handleTranscribe = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fileBuffer, response, errorData, data, transcriptionText, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!selectedFile) {
                        toast({
                            title: "No file selected",
                            description: "Please select an audio file first.",
                            variant: "destructive",
                        });
                        return [2 /*return*/];
                    }
                    if (!apiKey) {
                        toast({
                            title: "API Key Missing",
                            description: "Please hardcode your Deepgram API key in the code.",
                            variant: "destructive",
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, selectedFile.arrayBuffer()];
                case 2:
                    fileBuffer = _d.sent();
                    return [4 /*yield*/, fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&language=".concat(language), {
                            method: 'POST',
                            headers: {
                                'Authorization': "Token ".concat(apiKey),
                                'Content-Type': selectedFile.type,
                            },
                            body: fileBuffer,
                        })];
                case 3:
                    response = _d.sent();
                    if (!!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 4:
                    errorData = _d.sent();
                    throw new Error("HTTP error! status: ".concat(response.status, ", message: ").concat(JSON.stringify(errorData)));
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    data = _d.sent();
                    transcriptionText = ((_c = (_b = (_a = data.results) === null || _a === void 0 ? void 0 : _a.channels[0]) === null || _b === void 0 ? void 0 : _b.alternatives[0]) === null || _c === void 0 ? void 0 : _c.transcript) || '';
                    setTranscription(transcriptionText);
                    toast({
                        title: "Success",
                        description: "Audio transcribed successfully!",
                    });
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _d.sent();
                    console.error('Transcription error:', error_1);
                    toast({
                        title: "Error",
                        description: "Failed to transcribe the audio file. Please check your API key and try again.",
                        variant: "destructive",
                    });
                    return [3 /*break*/, 9];
                case 8:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">Audio Transcription</h1>
        <p className="text-gray-600 text-center mb-8">Upload your audio file and get accurate transcriptions using Deepgram AI</p>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select_1.Select value={language} onValueChange={setLanguage}>
            <select_1.SelectTrigger className="w-full">
              <select_1.SelectValue placeholder="Select a language"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="en">English</select_1.SelectItem>
              <select_1.SelectItem value="hi">Hindi</select_1.SelectItem>
              <select_1.SelectItem value="es">Spanish</select_1.SelectItem>
              <select_1.SelectItem value="fr">French</select_1.SelectItem>
              <select_1.SelectItem value="de">German</select_1.SelectItem>
              <select_1.SelectItem value="ja">Japanese</select_1.SelectItem>
              <select_1.SelectItem value="ko">Korean</select_1.SelectItem>
              <select_1.SelectItem value="zh">Chinese</select_1.SelectItem>
              <select_1.SelectItem value="ru">Russian</select_1.SelectItem>
              <select_1.SelectItem value="pt">Portuguese</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        
        <FileUpload_1.default onFileSelect={handleFileSelect} isLoading={isLoading}/>
        
        {selectedFile && (<div className="mt-6 text-center animate-fade-in">
            <p className="text-sm text-gray-600 mb-4">
              Selected file: {selectedFile.name}
            </p>
            <button_1.Button onClick={handleTranscribe} disabled={isLoading} className="bg-primary hover:bg-primary-hover text-white">
              {isLoading ? "Transcribing..." : "Start Transcription"}
            </button_1.Button>
          </div>)}

        <TranscriptionResult_1.default text={transcription}/>
      </div>
    </div>);
};
exports.default = Index;
