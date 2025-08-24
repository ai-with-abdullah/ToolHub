import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReverseResults {
  entireText: string;
  wordOrder: string;
  eachWord: string;
  mirrorText: string;
}

export default function ReverseTextGenerator() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<ReverseResults | null>(null);

  useEffect(() => {
    document.title = "Reverse Text Generator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reverse text in multiple ways: reverse entire text, words, word order, or create mirror text.');
    }
  }, []);

  const reverseText = () => {
    if (!inputText.trim()) return;

    const text = inputText.trim();

    // Reverse entire text (character by character)
    const entireText = text.split('').reverse().join('');

    // Reverse word order (keep words intact, reverse their order)
    const wordOrder = text.split(/(\s+)/).reverse().join('');

    // Reverse each word individually (keep word positions, reverse each word)
    const eachWord = text.split(/(\s+)/).map(part => {
      // Only reverse non-whitespace parts
      return /\S/.test(part) ? part.split('').reverse().join('') : part;
    }).join('');

    // Create mirror text (flip characters horizontally - approximation)
    const mirrorMap: { [key: string]: string } = {
      'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ꟻ', 'g': 'ϱ', 'h': 'ʜ',
      'i': 'i', 'j': 'į', 'k': 'ʞ', 'l': '|', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
      'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'υ', 'v': 'v', 'w': 'w', 'x': 'x',
      'y': 'ʏ', 'z': 'z', 'A': 'A', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ',
      'G': 'Ϲ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '⅃', 'M': 'M', 'N': 'N',
      'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'Я', 'S': 'Ƨ', 'T': 'T', 'U': 'U', 'V': 'V',
      'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', '1': '⇂', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
      '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '?': '¿', '!': '¡',
      '.': '˙', ',': "'", ';': '؛', ':': ':', '(': ')', ')': '(', '[': ']', ']': '[',
      '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '"': '"'
    };

    const mirrorText = text.split('').map(char => mirrorMap[char] || char).reverse().join('');

    setResults({
      entireText,
      wordOrder,
      eachWord,
      mirrorText
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setInputText("");
    setResults(null);
  };

  const getSampleText = () => {
    setInputText("Hello World! This is a sample text to demonstrate reverse operations.");
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-exchange-alt text-indigo-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="reverse-text-title">
              Reverse Text Generator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="reverse-text-subtitle">
              Reverse text in multiple ways: reverse entire text, words, word order, or create mirror text
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Input Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="inputText" className="text-sm font-medium text-slate-700 mb-2 block">
                    Enter your text to reverse
                  </Label>
                  <Textarea
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="min-h-[150px]"
                    data-testid="input-text"
                  />
                  <div className="mt-2 text-sm text-slate-500">
                    Characters: {inputText.length}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={reverseText} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!inputText.trim()}
                    data-testid="button-reverse"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Reverse Text
                  </Button>
                  
                  <Button 
                    onClick={getSampleText} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-sample"
                  >
                    <i className="fas fa-file-text"></i>
                  </Button>

                  <Button 
                    onClick={clearAll} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* How it works */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Reverse Types</span>
                  </div>
                  <ul className="text-blue-700 space-y-1">
                    <li>• <strong>Entire Text:</strong> Reverses every character</li>
                    <li>• <strong>Word Order:</strong> Reverses order of words</li>
                    <li>• <strong>Each Word:</strong> Reverses letters in each word</li>
                    <li>• <strong>Mirror Text:</strong> Creates horizontally flipped text</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-magic text-accent"></i>
                  <span>Reversed Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <Tabs defaultValue="entire" className="space-y-4" data-testid="results-tabs">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                      <TabsTrigger value="entire" className="text-xs">Entire</TabsTrigger>
                      <TabsTrigger value="words" className="text-xs">Word Order</TabsTrigger>
                      <TabsTrigger value="each" className="text-xs">Each Word</TabsTrigger>
                      <TabsTrigger value="mirror" className="text-xs">Mirror</TabsTrigger>
                    </TabsList>

                    <TabsContent value="entire">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">Entire Text Reversed</h4>
                          <Button
                            onClick={() => copyToClipboard(results.entireText, "Entire text")}
                            size="sm"
                            variant="outline"
                            data-testid="copy-entire"
                          >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                          </Button>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm break-words" data-testid="result-entire">
                          {results.entireText}
                        </div>
                        <p className="text-sm text-slate-600">
                          Every character is reversed from end to beginning
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="words">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">Word Order Reversed</h4>
                          <Button
                            onClick={() => copyToClipboard(results.wordOrder, "Word order")}
                            size="sm"
                            variant="outline"
                            data-testid="copy-words"
                          >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                          </Button>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm break-words" data-testid="result-words">
                          {results.wordOrder}
                        </div>
                        <p className="text-sm text-slate-600">
                          Words are in reverse order but each word remains intact
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="each">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">Each Word Reversed</h4>
                          <Button
                            onClick={() => copyToClipboard(results.eachWord, "Each word")}
                            size="sm"
                            variant="outline"
                            data-testid="copy-each"
                          >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                          </Button>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm break-words" data-testid="result-each">
                          {results.eachWord}
                        </div>
                        <p className="text-sm text-slate-600">
                          Each word is individually reversed while maintaining word positions
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="mirror">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">Mirror Text</h4>
                          <Button
                            onClick={() => copyToClipboard(results.mirrorText, "Mirror text")}
                            size="sm"
                            variant="outline"
                            data-testid="copy-mirror"
                          >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                          </Button>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm break-words" data-testid="result-mirror">
                          {results.mirrorText}
                        </div>
                        <p className="text-sm text-slate-600">
                          Text appears as if viewed in a mirror (horizontally flipped)
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-exchange-alt text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Text to Reverse</h3>
                    <p className="text-slate-500">
                      Type some text above to see all the different reverse options
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-gamepad text-purple-500 mt-1"></i>
                    <span>Creating puzzles and word games</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-eye text-blue-500 mt-1"></i>
                    <span>Making text harder to read casually</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-code text-green-500 mt-1"></i>
                    <span>Creating stylized text for design</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-magic text-pink-500 mt-1"></i>
                    <span>Fun text transformations for social media</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-brain text-orange-500 mt-1"></i>
                    <span>Brain training and cognitive exercises</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Original:</h5>
                    <p className="bg-slate-50 p-2 rounded font-mono">"Hello World"</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-slate-700">Entire:</span>
                      <span className="ml-2 font-mono">"dlroW olleH"</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Word Order:</span>
                      <span className="ml-2 font-mono">"World Hello"</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Each Word:</span>
                      <span className="ml-2 font-mono">"olleH dlroW"</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Mirror:</span>
                      <span className="ml-2 font-mono">"bloɿW oᴅɘH"</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}