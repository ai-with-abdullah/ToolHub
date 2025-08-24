import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterStats {
  total: number;
  noSpaces: number;
  letters: number;
  numbers: number;
  special: number;
  spaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<CharacterStats>({
    total: 0,
    noSpaces: 0,
    letters: 0,
    numbers: 0,
    special: 0,
    spaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0
  });

  useEffect(() => {
    document.title = "Character Counter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Count characters in your text with detailed character analysis including letters, numbers, and special characters.');
    }
  }, []);

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  const analyzeText = (inputText: string) => {
    if (!inputText) {
      setStats({
        total: 0,
        noSpaces: 0,
        letters: 0,
        numbers: 0,
        special: 0,
        spaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0
      });
      return;
    }

    const total = inputText.length;
    const noSpaces = inputText.replace(/\s/g, '').length;
    const letters = (inputText.match(/[a-zA-Z]/g) || []).length;
    const numbers = (inputText.match(/[0-9]/g) || []).length;
    const spaces = total - noSpaces;
    const special = total - letters - numbers - spaces;
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    setStats({
      total,
      noSpaces,
      letters,
      numbers,
      special,
      spaces,
      words,
      sentences,
      paragraphs
    });
  };

  const clearText = () => {
    setText("");
  };

  const insertSampleText = () => {
    const sample = `Hello World! This is a sample text with 123 numbers and special characters: @#$%^&*()
    
It contains multiple paragraphs, sentences, and various character types for testing the character counter tool.

Email: test@example.com
Phone: (555) 123-4567`;
    setText(sample);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-font text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="character-counter-title">
              Character Counter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="character-counter-subtitle">
              Count and analyze characters in your text with detailed breakdown by type
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Enter Your Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="text" className="text-sm font-medium text-slate-700 mb-2 block">
                    Text to Analyze
                  </Label>
                  <Textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-64 text-base resize-none"
                    placeholder="Type or paste your text here..."
                    data-testid="textarea-text"
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
                    disabled={!text}
                    data-testid="button-clear-text"
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
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Character Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" data-testid="character-stats">
                  {/* Main Character Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1" data-testid="total-characters">
                        {stats.total.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-blue-800">Total Characters</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-1" data-testid="no-spaces">
                        {stats.noSpaces.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-green-800">No Spaces</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-1" data-testid="letters">
                        {stats.letters.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-purple-800">Letters</div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600 mb-1" data-testid="numbers">
                        {stats.numbers.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-orange-800">Numbers</div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-800">Character Breakdown</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Spaces</span>
                        <span className="font-medium text-slate-800" data-testid="spaces">
                          {stats.spaces.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Special characters</span>
                        <span className="font-medium text-slate-800" data-testid="special">
                          {stats.special.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Words</span>
                        <span className="font-medium text-slate-800" data-testid="words">
                          {stats.words.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Sentences</span>
                        <span className="font-medium text-slate-800" data-testid="sentences">
                          {stats.sentences.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Paragraphs</span>
                        <span className="font-medium text-slate-800" data-testid="paragraphs">
                          {stats.paragraphs.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Percentages */}
                  {stats.total > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800">Character Distribution</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Letters</span>
                          <span className="font-medium text-slate-800">
                            {Math.round((stats.letters / stats.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(stats.letters / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Numbers</span>
                          <span className="font-medium text-slate-800">
                            {Math.round((stats.numbers / stats.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(stats.numbers / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Spaces</span>
                          <span className="font-medium text-slate-800">
                            {Math.round((stats.spaces / stats.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(stats.spaces / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Special</span>
                          <span className="font-medium text-slate-800">
                            {Math.round((stats.special / stats.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(stats.special / stats.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Character Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Our character counter analyzes text and categorizes each character by type:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                      <div>
                        <h5 className="font-medium text-slate-800">Letters</h5>
                        <p>Alphabetic characters (A-Z, a-z)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                      <div>
                        <h5 className="font-medium text-slate-800">Numbers</h5>
                        <p>Numeric characters (0-9)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                      <div>
                        <h5 className="font-medium text-slate-800">Spaces</h5>
                        <p>Whitespace characters</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                      <div>
                        <h5 className="font-medium text-slate-800">Special</h5>
                        <p>Punctuation and symbols</p>
                      </div>
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
                    Character counting is useful for many applications:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Social media post length limits</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>SMS message character limits</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Meta descriptions for SEO</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Content length optimization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Data validation and analysis</span>
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