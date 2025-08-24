import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CleaningOptions {
  removeExtraSpaces: boolean;
  removeLineBreaks: boolean;
  removeTabs: boolean;
  trimLines: boolean;
  removeEmptyLines: boolean;
}

interface TextStats {
  originalLength: number;
  cleanedLength: number;
  spacesRemoved: number;
  linesRemoved: number;
}

export default function RemoveExtraSpaces() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [options, setOptions] = useState<CleaningOptions>({
    removeExtraSpaces: true,
    removeLineBreaks: false,
    removeTabs: true,
    trimLines: true,
    removeEmptyLines: true
  });
  const [stats, setStats] = useState<TextStats | null>(null);

  useEffect(() => {
    document.title = "Remove Extra Spaces - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Clean up text by removing extra spaces, duplicate spaces, and formatting issues instantly.');
    }
  }, []);

  const cleanText = () => {
    if (!inputText.trim()) return;

    let cleanedText = inputText;
    const originalLength = inputText.length;
    const originalLines = inputText.split('\n').length;

    // Remove extra spaces between words
    if (options.removeExtraSpaces) {
      cleanedText = cleanedText.replace(/\s+/g, ' ');
    }

    // Remove line breaks
    if (options.removeLineBreaks) {
      cleanedText = cleanedText.replace(/\n/g, ' ');
    }

    // Remove tabs
    if (options.removeTabs) {
      cleanedText = cleanedText.replace(/\t/g, ' ');
    }

    // Process line by line for trimming and empty line removal
    if (options.trimLines || options.removeEmptyLines) {
      const lines = cleanedText.split('\n');
      let processedLines = lines;

      if (options.trimLines) {
        processedLines = processedLines.map(line => line.trim());
      }

      if (options.removeEmptyLines) {
        processedLines = processedLines.filter(line => line.length > 0);
      }

      cleanedText = processedLines.join('\n');
    }

    // Remove any remaining multiple spaces
    if (options.removeExtraSpaces) {
      cleanedText = cleanedText.replace(/  +/g, ' ');
    }

    // Final trim
    cleanedText = cleanedText.trim();

    setOutputText(cleanedText);

    // Calculate stats
    const cleanedLength = cleanedText.length;
    const cleanedLines = cleanedText.split('\n').length;

    setStats({
      originalLength,
      cleanedLength,
      spacesRemoved: originalLength - cleanedLength,
      linesRemoved: originalLines - cleanedLines
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert("Cleaned text copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setStats(null);
  };

  const updateOption = (key: keyof CleaningOptions, value: boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const getSampleText = () => {
    const sample = `This    is   a    sample    text    with     extra    spaces.


There are   multiple    empty lines    above.

	And some	tabs	here.

  Lines with leading and trailing spaces  

More    unnecessary    spacing    everywhere.`;
    setInputText(sample);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-eraser text-cyan-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="remove-spaces-title">
              Remove Extra Spaces
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="remove-spaces-subtitle">
              Clean up text by removing extra spaces, duplicate spaces, and formatting issues instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Options Panel */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-cogs text-primary"></i>
                  <span>Cleaning Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeExtraSpaces"
                      checked={options.removeExtraSpaces}
                      onCheckedChange={(checked) => updateOption('removeExtraSpaces', !!checked)}
                      data-testid="option-extra-spaces"
                    />
                    <Label htmlFor="removeExtraSpaces" className="text-sm">
                      Remove extra spaces between words
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="trimLines"
                      checked={options.trimLines}
                      onCheckedChange={(checked) => updateOption('trimLines', !!checked)}
                      data-testid="option-trim-lines"
                    />
                    <Label htmlFor="trimLines" className="text-sm">
                      Remove leading/trailing spaces from lines
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeTabs"
                      checked={options.removeTabs}
                      onCheckedChange={(checked) => updateOption('removeTabs', !!checked)}
                      data-testid="option-remove-tabs"
                    />
                    <Label htmlFor="removeTabs" className="text-sm">
                      Replace tabs with spaces
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeEmptyLines"
                      checked={options.removeEmptyLines}
                      onCheckedChange={(checked) => updateOption('removeEmptyLines', !!checked)}
                      data-testid="option-empty-lines"
                    />
                    <Label htmlFor="removeEmptyLines" className="text-sm">
                      Remove empty lines
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeLineBreaks"
                      checked={options.removeLineBreaks}
                      onCheckedChange={(checked) => updateOption('removeLineBreaks', !!checked)}
                      data-testid="option-line-breaks"
                    />
                    <Label htmlFor="removeLineBreaks" className="text-sm">
                      Remove all line breaks
                    </Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={cleanText} 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={!inputText.trim()}
                    data-testid="button-clean"
                  >
                    <i className="fas fa-broom mr-2"></i>
                    Clean Text
                  </Button>

                  <Button 
                    onClick={getSampleText} 
                    variant="outline"
                    className="w-full"
                    data-testid="button-sample"
                  >
                    <i className="fas fa-file-text mr-2"></i>
                    Load Sample Text
                  </Button>

                  <Button 
                    onClick={clearAll} 
                    variant="outline"
                    className="w-full"
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt mr-2"></i>
                    Clear All
                  </Button>
                </div>

                {/* Stats */}
                {stats && (
                  <div className="bg-green-50 rounded-xl p-4 text-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="fas fa-chart-bar text-green-600"></i>
                      <span className="font-medium text-green-800">Cleaning Stats</span>
                    </div>
                    <div className="space-y-2 text-green-700">
                      <div className="flex justify-between">
                        <span>Characters removed:</span>
                        <span className="font-semibold">{stats.spacesRemoved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Original length:</span>
                        <span>{stats.originalLength}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaned length:</span>
                        <span>{stats.cleanedLength}</span>
                      </div>
                      {stats.linesRemoved > 0 && (
                        <div className="flex justify-between">
                          <span>Lines removed:</span>
                          <span>{stats.linesRemoved}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Input/Output Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Text */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-edit text-orange-600"></i>
                    <span>Input Text</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here that contains extra spaces, tabs, or line breaks..."
                    className="min-h-[200px] font-mono text-sm"
                    data-testid="input-text"
                  />
                  <div className="mt-2 text-sm text-slate-500">
                    Characters: {inputText.length} | Lines: {inputText.split('\n').length}
                  </div>
                </CardContent>
              </Card>

              {/* Output Text */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-check-circle text-green-600"></i>
                      <span>Cleaned Text</span>
                    </div>
                    {outputText && (
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                        data-testid="button-copy"
                      >
                        <i className="fas fa-copy mr-2"></i>
                        Copy
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {outputText ? (
                    <>
                      <Textarea
                        value={outputText}
                        readOnly
                        className="min-h-[200px] font-mono text-sm bg-slate-50"
                        data-testid="output-text"
                      />
                      <div className="mt-2 text-sm text-slate-500">
                        Characters: {outputText.length} | Lines: {outputText.split('\n').length}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16 text-slate-500" data-testid="no-output">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-broom text-slate-400 text-2xl"></i>
                      </div>
                      <p>Cleaned text will appear here after processing</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">What This Tool Does</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Removes multiple consecutive spaces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Cleans up leading and trailing whitespace</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Removes empty lines and unnecessary breaks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Converts tabs to single spaces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Provides detailed cleaning statistics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-file-word text-blue-500 mt-1"></i>
                    <span>Cleaning up copied text from PDFs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-code text-green-500 mt-1"></i>
                    <span>Formatting code and text files</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-envelope text-purple-500 mt-1"></i>
                    <span>Preparing email content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-database text-orange-500 mt-1"></i>
                    <span>Data preparation and cleaning</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-edit text-red-500 mt-1"></i>
                    <span>Content editing and proofreading</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}