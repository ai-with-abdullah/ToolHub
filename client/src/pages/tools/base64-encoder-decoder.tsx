import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    document.title = "Base64 Encoder/Decoder - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Encode text to Base64 or decode Base64 strings with instant conversion and validation.');
    }
  }, []);

  useEffect(() => {
    processText();
  }, [inputText, activeTab]);

  const encodeBase64 = (text: string) => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setIsValid(true);
      return encoded;
    } catch (error) {
      setIsValid(false);
      return "Error: Invalid input for encoding";
    }
  };

  const decodeBase64 = (text: string) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      setIsValid(true);
      return decoded;
    } catch (error) {
      setIsValid(false);
      return "Error: Invalid Base64 string";
    }
  };

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setIsValid(true);
      return;
    }

    if (activeTab === "encode") {
      const result = encodeBase64(inputText);
      setOutputText(result);
    } else {
      const result = decodeBase64(inputText);
      setOutputText(result);
    }
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setIsValid(true);
  };

  const copyOutput = () => {
    if (outputText && isValid) {
      navigator.clipboard.writeText(outputText);
    }
  };

  const swapInputOutput = () => {
    if (isValid && outputText) {
      setInputText(outputText);
      setActiveTab(activeTab === "encode" ? "decode" : "encode");
    }
  };

  const insertSampleText = () => {
    if (activeTab === "encode") {
      setInputText("Hello, World! This is a sample text for Base64 encoding.");
    } else {
      setInputText("SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=");
    }
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-code text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="base64-title">
              Base64 Encoder/Decoder
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="base64-subtitle">
              Encode text to Base64 or decode Base64 strings with instant conversion and validation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="space-y-4">
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-edit text-primary"></i>
                    <span>Input</span>
                  </CardTitle>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="encode" data-testid="tab-encode">
                        <i className="fas fa-arrow-right mr-2"></i>
                        Encode
                      </TabsTrigger>
                      <TabsTrigger value="decode" data-testid="tab-decode">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Decode
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="input-text" className="text-sm font-medium text-slate-700 mb-2 block">
                    {activeTab === "encode" ? "Plain Text" : "Base64 String"}
                  </Label>
                  <Textarea
                    id="input-text"
                    placeholder={
                      activeTab === "encode" 
                        ? "Enter plain text to encode..." 
                        : "Enter Base64 string to decode..."
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-48 text-base resize-none"
                    data-testid="textarea-input"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={insertSampleText} 
                    variant="outline"
                    className="flex-1"
                    data-testid="button-sample"
                  >
                    <i className="fas fa-magic mr-2"></i>
                    Sample Text
                  </Button>
                  
                  <Button 
                    onClick={clearText} 
                    variant="outline"
                    className="px-4"
                    disabled={!inputText}
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-magic text-accent"></i>
                  <span>Output</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {inputText ? (
                  <div className="space-y-6" data-testid="conversion-result">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2 block">
                        {activeTab === "encode" ? "Base64 Encoded" : "Decoded Text"}
                      </Label>
                      
                      <div className={`p-4 rounded-xl border ${
                        isValid 
                          ? 'bg-cyan-50 border-cyan-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className={`text-sm font-mono break-words ${
                          isValid 
                            ? 'text-cyan-900' 
                            : 'text-red-900'
                        }`} data-testid="output-text">
                          {outputText}
                        </div>
                      </div>
                    </div>

                    {isValid && (
                      <>
                        <div className="flex gap-3">
                          <Button 
                            onClick={copyOutput}
                            className="flex-1"
                            data-testid="button-copy"
                          >
                            <i className="fas fa-copy mr-2"></i>
                            Copy Result
                          </Button>
                          
                          <Button 
                            onClick={swapInputOutput}
                            variant="outline"
                            data-testid="button-swap"
                          >
                            <i className="fas fa-exchange-alt mr-2"></i>
                            Use as Input
                          </Button>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-600">Input length</span>
                            <span className="font-medium text-slate-800">{inputText.length} characters</span>
                          </div>
                          
                          <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-600">Output length</span>
                            <span className="font-medium text-slate-800">{outputText.length} characters</span>
                          </div>
                          
                          {activeTab === "encode" && (
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                              <span className="text-slate-600">Size increase</span>
                              <span className="font-medium text-slate-800">
                                {Math.round((outputText.length / inputText.length - 1) * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-conversion">
                    <i className="fas fa-code text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">Ready to {activeTab}</p>
                    <p className="text-sm">Enter text to see the {activeTab === "encode" ? "encoded" : "decoded"} result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">About Base64</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Base64 is a binary-to-text encoding scheme that represents binary data in ASCII characters.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Character Set</h5>
                      <p>A-Z, a-z, 0-9, +, / (64 characters total)</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Padding</h5>
                      <p>Uses '=' for padding when needed</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Size</h5>
                      <p>Increases data size by approximately 33%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>Base64 encoding is commonly used for:</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-envelope text-blue-500 mt-1"></i>
                      <span>Email attachments (MIME)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-image text-green-500 mt-1"></i>
                      <span>Embedding images in HTML/CSS</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-key text-purple-500 mt-1"></i>
                      <span>API authentication tokens</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-database text-orange-500 mt-1"></i>
                      <span>Storing binary data in text format</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-globe text-indigo-500 mt-1"></i>
                      <span>URL encoding for data transmission</span>
                    </li>
                  </ul>
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