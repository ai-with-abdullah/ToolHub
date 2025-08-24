import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGenerator() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState("3");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    document.title = "Lorem Ipsum Generator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate Lorem Ipsum placeholder text for designs and mockups with customizable options.');
    }
  }, []);

  useEffect(() => {
    generateText();
  }, [type, count, startWithLorem]);

  useEffect(() => {
    updateStats();
  }, [generatedText]);

  const getRandomWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = (wordCount = Math.floor(Math.random() * 15) + 5) => {
    let sentence = [];
    for (let i = 0; i < wordCount; i++) {
      sentence.push(getRandomWord());
    }
    return sentence.join(" ") + ".";
  };

  const generateParagraph = (sentenceCount = Math.floor(Math.random() * 5) + 3) => {
    let paragraph = [];
    for (let i = 0; i < sentenceCount; i++) {
      let sentence = generateSentence();
      if (i === 0 && startWithLorem && !generatedText) {
        sentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      } else {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      paragraph.push(sentence);
    }
    return paragraph.join(" ");
  };

  const generateWords = (wordCount: number) => {
    let words = [];
    for (let i = 0; i < wordCount; i++) {
      if (i === 0 && startWithLorem) {
        words.push("Lorem", "ipsum");
        i += 1;
      } else {
        words.push(getRandomWord());
      }
    }
    return words.join(" ");
  };

  const generateText = () => {
    const numCount = parseInt(count) || 1;
    let result = "";

    switch (type) {
      case "words":
        result = generateWords(numCount);
        break;
      case "sentences":
        let sentences = [];
        for (let i = 0; i < numCount; i++) {
          let sentence = generateSentence();
          if (i === 0 && startWithLorem) {
            sentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          } else {
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
          }
          sentences.push(sentence);
        }
        result = sentences.join(" ");
        break;
      case "paragraphs":
        let paragraphs = [];
        for (let i = 0; i < numCount; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join("\n\n");
        break;
    }

    setGeneratedText(result);
  };

  const updateStats = () => {
    if (generatedText) {
      const words = generatedText.trim().split(/\s+/).length;
      const characters = generatedText.length;
      setWordCount(words);
      setCharacterCount(characters);
    } else {
      setWordCount(0);
      setCharacterCount(0);
    }
  };

  const copyText = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
    }
  };

  const clearText = () => {
    setGeneratedText("");
  };

  const regenerateText = () => {
    generateText();
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-alt text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="lorem-ipsum-title">
              Lorem Ipsum Generator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="lorem-ipsum-subtitle">
              Generate Lorem Ipsum placeholder text for your designs, mockups, and layouts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-cog text-primary"></i>
                  <span>Generator Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium text-slate-700 mb-2 block">
                      Generate Type
                    </Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger data-testid="select-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="words">Words</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="count" className="text-sm font-medium text-slate-700 mb-2 block">
                      Number of {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Label>
                    <Input
                      id="count"
                      type="number"
                      min="1"
                      max="50"
                      placeholder="Enter number"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="text-lg"
                      data-testid="input-count"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="start-lorem" 
                      checked={startWithLorem}
                      onCheckedChange={(checked) => setStartWithLorem(checked as boolean)}
                      data-testid="checkbox-start-lorem"
                    />
                    <Label htmlFor="start-lorem" className="text-sm text-slate-700">
                      Start with "Lorem ipsum..."
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={regenerateText}
                    className="flex-1"
                    data-testid="button-generate"
                  >
                    <i className="fas fa-sync-alt mr-2"></i>
                    Generate New
                  </Button>
                  
                  <Button 
                    onClick={clearText} 
                    variant="outline"
                    className="px-4"
                    disabled={!generatedText}
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Quick Stats */}
                {generatedText && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <div className="text-lg font-bold text-amber-600" data-testid="word-count">
                        {wordCount.toLocaleString()}
                      </div>
                      <div className="text-xs font-medium text-amber-800">Words</div>
                    </div>
                    
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <div className="text-lg font-bold text-amber-600" data-testid="character-count">
                        {characterCount.toLocaleString()}
                      </div>
                      <div className="text-xs font-medium text-amber-800">Characters</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-file-alt text-accent"></i>
                  <span>Generated Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedText ? (
                  <div className="space-y-6" data-testid="generated-result">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2 block">
                        Lorem Ipsum Text
                      </Label>
                      <Textarea
                        value={generatedText}
                        readOnly
                        className="w-full h-64 text-base resize-none font-serif leading-relaxed"
                        data-testid="textarea-output"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={copyText}
                        className="flex-1"
                        data-testid="button-copy"
                      >
                        <i className="fas fa-copy mr-2"></i>
                        Copy Text
                      </Button>
                      
                      <Button 
                        onClick={regenerateText}
                        variant="outline"
                        data-testid="button-regenerate"
                      >
                        <i className="fas fa-sync-alt mr-2"></i>
                        New Text
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-generation">
                    <i className="fas fa-file-alt text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">Ready to generate</p>
                    <p className="text-sm">Configure options and click generate to create Lorem Ipsum text</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">About Lorem Ipsum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Origins</h5>
                      <p>Derived from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero, written in 45 BC</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Purpose</h5>
                      <p>Used as placeholder text to focus on design layout rather than content</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Standard</h5>
                      <p>Industry standard dummy text since the 1500s</p>
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
                  <p>Lorem Ipsum is commonly used in:</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-paint-brush text-blue-500 mt-1"></i>
                      <span>Web design mockups and wireframes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-file-alt text-green-500 mt-1"></i>
                      <span>Print design and typography</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-mobile-alt text-purple-500 mt-1"></i>
                      <span>App interface prototypes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-newspaper text-orange-500 mt-1"></i>
                      <span>Content management systems</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-code text-indigo-500 mt-1"></i>
                      <span>Template development</span>
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