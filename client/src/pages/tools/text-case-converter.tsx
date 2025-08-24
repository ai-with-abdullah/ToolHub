import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [conversionType, setConversionType] = useState("");

  useEffect(() => {
    document.title = "Text Case Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more text formatting options.');
    }
  }, []);

  const convertToUppercase = () => {
    const result = inputText.toUpperCase();
    setOutputText(result);
    setConversionType("UPPERCASE");
  };

  const convertToLowercase = () => {
    const result = inputText.toLowerCase();
    setOutputText(result);
    setConversionType("lowercase");
  };

  const convertToTitleCase = () => {
    const result = inputText.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setOutputText(result);
    setConversionType("Title Case");
  };

  const convertToSentenceCase = () => {
    const result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/g, (txt) => 
      txt.toUpperCase()
    );
    setOutputText(result);
    setConversionType("Sentence case");
  };

  const convertToCamelCase = () => {
    const result = inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
    setOutputText(result);
    setConversionType("camelCase");
  };

  const convertToPascalCase = () => {
    const result = inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '');
    setOutputText(result);
    setConversionType("PascalCase");
  };

  const convertToSnakeCase = () => {
    const result = inputText
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
    setOutputText(result);
    setConversionType("snake_case");
  };

  const convertToKebabCase = () => {
    const result = inputText
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
    setOutputText(result);
    setConversionType("kebab-case");
  };

  const convertToAlternatingCase = () => {
    const result = inputText
      .split('')
      .map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
    setOutputText(result);
    setConversionType("aLtErNaTiNg CaSe");
  };

  const convertToInverseCase = () => {
    const result = inputText
      .split('')
      .map(char => 
        char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');
    setOutputText(result);
    setConversionType("iNVERSE cASE");
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setConversionType("");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  const insertSampleText = () => {
    const sample = "hello world! this is a SAMPLE text with Mixed CasE formatting. It includes different types of text formatting examples.";
    setInputText(sample);
    setOutputText("");
    setConversionType("");
  };

  const conversionOptions = [
    { label: "UPPERCASE", action: convertToUppercase, icon: "fas fa-font", description: "Convert all letters to uppercase" },
    { label: "lowercase", action: convertToLowercase, icon: "fas fa-font", description: "Convert all letters to lowercase" },
    { label: "Title Case", action: convertToTitleCase, icon: "fas fa-heading", description: "Capitalize first letter of each word" },
    { label: "Sentence case", action: convertToSentenceCase, icon: "fas fa-paragraph", description: "Capitalize first letter of sentences" },
    { label: "camelCase", action: convertToCamelCase, icon: "fas fa-code", description: "Remove spaces, capitalize words except first" },
    { label: "PascalCase", action: convertToPascalCase, icon: "fas fa-code", description: "Remove spaces, capitalize all words" },
    { label: "snake_case", action: convertToSnakeCase, icon: "fas fa-code", description: "Replace spaces with underscores" },
    { label: "kebab-case", action: convertToKebabCase, icon: "fas fa-code", description: "Replace spaces with hyphens" },
    { label: "aLtErNaTiNg", action: convertToAlternatingCase, icon: "fas fa-exchange-alt", description: "Alternate between upper and lowercase" },
    { label: "iNVERSE", action: convertToInverseCase, icon: "fas fa-exchange-alt", description: "Invert the case of each character" }
  ];

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-font text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-case-converter-title">
              Text Case Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="text-case-converter-subtitle">
              Convert text between different cases: uppercase, lowercase, title case, camel case, and more
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
                  <Label htmlFor="input-text" className="text-sm font-medium text-slate-700 mb-2 block">
                    Text to Convert
                  </Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-48 text-base resize-none"
                    placeholder="Enter your text here..."
                    data-testid="textarea-input"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={insertSampleText} 
                    variant="outline"
                    className="flex-1"
                    data-testid="button-sample-text"
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

                {/* Conversion Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Choose Conversion Type
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {conversionOptions.map((option, index) => (
                      <Button
                        key={index}
                        onClick={option.action}
                        variant={conversionType === option.label ? "default" : "outline"}
                        size="sm"
                        className="justify-start text-xs"
                        disabled={!inputText}
                        data-testid={`button-${option.label.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <i className={`${option.icon} mr-2`}></i>
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-magic text-accent"></i>
                  <span>Converted Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {outputText ? (
                  <div className="space-y-6" data-testid="conversion-result">
                    {/* Current Conversion Display */}
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-sm font-medium text-blue-800 mb-2">
                        Current format: {conversionType}
                      </div>
                      <div className="text-lg font-mono text-blue-900 break-words">
                        {outputText}
                      </div>
                    </div>

                    {/* Output Options */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">
                        Output Actions
                      </Label>
                      <div className="flex gap-3">
                        <Button 
                          onClick={copyOutput}
                          className="flex-1"
                          data-testid="button-copy-output"
                        >
                          <i className="fas fa-copy mr-2"></i>
                          Copy Result
                        </Button>
                        <Button 
                          onClick={() => setInputText(outputText)}
                          variant="outline"
                          data-testid="button-use-as-input"
                        >
                          <i className="fas fa-arrow-left mr-2"></i>
                          Use as Input
                        </Button>
                      </div>
                    </div>

                    {/* Character Count */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Output Length:</span>
                        <span className="font-medium text-slate-800">{outputText.length} characters</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-conversion">
                    <i className="fas fa-font text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">No conversion selected</p>
                    <p className="text-sm">Enter text and choose a conversion type to see the result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Conversion Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Our text case converter supports multiple formatting options:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Standard Cases</h5>
                      <p>UPPERCASE, lowercase, Title Case, Sentence case</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Programming Cases</h5>
                      <p>camelCase, PascalCase, snake_case, kebab-case</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Special Cases</h5>
                      <p>aLtErNaTiNg CaSe, iNVERSE cASE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Text case conversion is useful for various applications:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-code text-blue-500 mt-1"></i>
                      <span>Programming variable names</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-heading text-green-500 mt-1"></i>
                      <span>Formatting titles and headers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-file-alt text-purple-500 mt-1"></i>
                      <span>Document formatting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-database text-orange-500 mt-1"></i>
                      <span>Database field naming</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-globe text-indigo-500 mt-1"></i>
                      <span>URL slug generation</span>
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