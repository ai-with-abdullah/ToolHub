import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    document.title = "Word Counter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Count words, characters, paragraphs, and sentences in your text with detailed statistics and analysis.');
    }
  }, []);

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText: string) => {
    if (!inputText.trim()) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
      });
      return;
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Count words (split by whitespace and filter empty strings)
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    
    // Count sentences (basic sentence detection)
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Count paragraphs (split by double line breaks or single line breaks)
    const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Calculate speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });
  };

  const clearText = () => {
    setText("");
  };

  const insertSampleText = () => {
    const sample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`;
    setText(sample);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-word text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="word-counter-title">
              Word Counter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="word-counter-subtitle">
              Count words, characters, paragraphs, and sentences with detailed text analysis
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
                  <span>Text Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" data-testid="text-stats">
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1" data-testid="word-count">
                        {stats.words.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-blue-800">Words</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-1" data-testid="character-count">
                        {stats.characters.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-green-800">Characters</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-1" data-testid="sentence-count">
                        {stats.sentences.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-purple-800">Sentences</div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600 mb-1" data-testid="paragraph-count">
                        {stats.paragraphs.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-orange-800">Paragraphs</div>
                    </div>
                  </div>

                  {/* Detailed Stats */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-800">Detailed Analysis</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Characters (no spaces)</span>
                        <span className="font-medium text-slate-800" data-testid="chars-no-spaces">
                          {stats.charactersNoSpaces.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Reading time</span>
                        <span className="font-medium text-slate-800" data-testid="reading-time">
                          {stats.readingTime} min
                        </span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Speaking time</span>
                        <span className="font-medium text-slate-800" data-testid="speaking-time">
                          {stats.speakingTime} min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Average Stats */}
                  {stats.words > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800">Averages</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Words per sentence</span>
                          <span className="font-medium text-slate-800">
                            {stats.sentences > 0 ? Math.round((stats.words / stats.sentences) * 10) / 10 : 0}
                          </span>
                        </div>
                        
                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Characters per word</span>
                          <span className="font-medium text-slate-800">
                            {Math.round((stats.characters / stats.words) * 10) / 10}
                          </span>
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
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Our word counter analyzes your text in real-time to provide accurate counts and statistics.
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-800">What We Count:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Words: Separated by spaces</li>
                      <li>• Characters: All characters including spaces</li>
                      <li>• Sentences: Ending with . ! or ?</li>
                      <li>• Paragraphs: Separated by line breaks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Reading Time Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Reading and speaking times are calculated based on average speeds:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-book text-blue-500 mt-1"></i>
                      <span><strong>Reading:</strong> 200 words per minute</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-microphone text-green-500 mt-1"></i>
                      <span><strong>Speaking:</strong> 150 words per minute</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-4">
                    Times may vary based on complexity and individual reading/speaking speed.
                  </p>
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