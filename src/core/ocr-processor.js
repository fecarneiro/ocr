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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.optimizeImageMetrics = exports.regexMatch = exports.createTesseractWorker = exports.recognizeImage = exports.optimizeImage = exports.pdfToImage = exports.tryOCRExtraction = void 0;
var pdf_to_img_1 = require("pdf-to-img");
var tesseract_js_1 = require("tesseract.js");
var promises_1 = require("node:fs/promises");
var dta_service_js_1 = require("../services/dta-service.js");
var sharp_1 = require("sharp");
function createTesseractWorker() {
    return __awaiter(this, void 0, void 0, function () {
        var worker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, tesseract_js_1.createWorker)('por', 1, {
                        cachePath: './tessdata',
                        cacheMethod: 'write'
                    })];
                case 1:
                    worker = _a.sent();
                    return [4 /*yield*/, worker.setParameters({
                            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÃÂÇÉÊÍÓÔÕÚàáãâçéêíóôõú .:/-,()',
                            tessedit_pageseg_mode: tesseract_js_1.PSM.SINGLE_BLOCK
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, worker];
            }
        });
    });
}
exports.createTesseractWorker = createTesseractWorker;
function pdfToImage(pdfFile) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var counter, pages, document, document_1, document_1_1, image, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    counter = 1;
                    pages = [];
                    return [4 /*yield*/, (0, pdf_to_img_1.pdf)(pdfFile, { scale: 4 })];
                case 1:
                    document = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, 9, 14]);
                    document_1 = __asyncValues(document);
                    _b.label = 3;
                case 3: return [4 /*yield*/, document_1.next()];
                case 4:
                    if (!(document_1_1 = _b.sent(), !document_1_1.done)) return [3 /*break*/, 7];
                    image = document_1_1.value;
                    return [4 /*yield*/, promises_1["default"].writeFile("./data/output/page".concat(counter, ".png"), image)];
                case 5:
                    _b.sent();
                    pages.push(image);
                    counter++;
                    _b.label = 6;
                case 6: return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(document_1_1 && !document_1_1.done && (_a = document_1["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(document_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/, pages];
            }
        });
    });
}
exports.pdfToImage = pdfToImage;
function optimizeImage(pages) {
    var pages_1, pages_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var counter, optimizedPages, page, optmizedPage, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('[sharp]buffer length ', pages.length);
                    counter = 1;
                    optimizedPages = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 14]);
                    pages_1 = __asyncValues(pages);
                    _b.label = 2;
                case 2: return [4 /*yield*/, pages_1.next()];
                case 3:
                    if (!(pages_1_1 = _b.sent(), !pages_1_1.done)) return [3 /*break*/, 7];
                    page = pages_1_1.value;
                    return [4 /*yield*/, (0, sharp_1["default"])(page)
                            .greyscale()
                            .normalise()
                            .linear(1.6, 0)
                            .sharpen()
                            .png()
                            .toBuffer()];
                case 4:
                    optmizedPage = _b.sent();
                    return [4 /*yield*/, promises_1["default"].writeFile("./data/output/opt-page".concat(counter, ".png"), optmizedPage)];
                case 5:
                    _b.sent();
                    optimizedPages.push(optmizedPage);
                    counter++;
                    _b.label = 6;
                case 6: return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(pages_1_1 && !pages_1_1.done && (_a = pages_1["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(pages_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/, optimizedPages];
            }
        });
    });
}
exports.optimizeImage = optimizeImage;
function optimizeImageMetrics(pages) {
    var pages_2, pages_2_1;
    var e_3, _a;
    return __awaiter(this, void 0, void 0, function () {
        var counter, optimizedPages, page, image, imageSpecs, optmizedPage, e_3_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('[sharp]buffer length ', pages.length);
                    counter = 1;
                    optimizedPages = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, 11, 16]);
                    pages_2 = __asyncValues(pages);
                    _b.label = 2;
                case 2: return [4 /*yield*/, pages_2.next()];
                case 3:
                    if (!(pages_2_1 = _b.sent(), !pages_2_1.done)) return [3 /*break*/, 9];
                    page = pages_2_1.value;
                    return [4 /*yield*/, (0, sharp_1["default"])(page).greyscale().normalise().sharpen().png()];
                case 4:
                    image = _b.sent();
                    return [4 /*yield*/, image.stats()];
                case 5:
                    imageSpecs = _b.sent();
                    console.log('sharpness: ', imageSpecs.sharpness);
                    console.log('entropy: ', imageSpecs.entropy);
                    return [4 /*yield*/, image.toBuffer()];
                case 6:
                    optmizedPage = _b.sent();
                    return [4 /*yield*/, promises_1["default"].writeFile("./data/output/opt-page".concat(counter, ".png"), optmizedPage)];
                case 7:
                    _b.sent();
                    optimizedPages.push(optmizedPage);
                    counter++;
                    _b.label = 8;
                case 8: return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _b.trys.push([11, , 14, 15]);
                    if (!(pages_2_1 && !pages_2_1.done && (_a = pages_2["return"]))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _a.call(pages_2)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/, optimizedPages];
            }
        });
    });
}
exports.optimizeImageMetrics = optimizeImageMetrics;
function recognizeImage(worker, images) {
    var images_1, images_1_1;
    var e_4, _a;
    return __awaiter(this, void 0, void 0, function () {
        var extractedText, image, _b, text, confidence, e_4_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    extractedText = '';
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, 8, 13]);
                    images_1 = __asyncValues(images);
                    _c.label = 2;
                case 2: return [4 /*yield*/, images_1.next()];
                case 3:
                    if (!(images_1_1 = _c.sent(), !images_1_1.done)) return [3 /*break*/, 6];
                    image = images_1_1.value;
                    return [4 /*yield*/, worker.recognize(image)];
                case 4:
                    _b = (_c.sent()).data, text = _b.text, confidence = _b.confidence;
                    extractedText += text;
                    console.log('[tesseract]confidence: ', confidence);
                    _c.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_4_1 = _c.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _c.trys.push([8, , 11, 12]);
                    if (!(images_1_1 && !images_1_1.done && (_a = images_1["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(images_1)];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/, extractedText];
            }
        });
    });
}
exports.recognizeImage = recognizeImage;
function regexMatch(text) {
    var regexObjectResult = (0, dta_service_js_1.matchFieldsWithRegex)(text);
    return regexObjectResult;
}
exports.regexMatch = regexMatch;
function tryOCRExtraction(pdfFile) {
    return __awaiter(this, void 0, void 0, function () {
        var worker, images, optimizedImages, extractedText, ocrExtractionResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('iniciando OCR para: ', pdfFile);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, createTesseractWorker()];
                case 2:
                    worker = _a.sent();
                    return [4 /*yield*/, pdfToImage(pdfFile)];
                case 3:
                    images = _a.sent();
                    return [4 /*yield*/, optimizeImage(images)];
                case 4:
                    optimizedImages = _a.sent();
                    return [4 /*yield*/, recognizeImage(worker, optimizedImages)];
                case 5:
                    extractedText = _a.sent();
                    ocrExtractionResult = regexMatch(extractedText);
                    return [4 /*yield*/, worker.terminate()];
                case 6:
                    _a.sent();
                    return [2 /*return*/, { success: true, data: ocrExtractionResult }];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error extracting text with OCR', error_1);
                    return [2 /*return*/, { success: false }];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.tryOCRExtraction = tryOCRExtraction;
