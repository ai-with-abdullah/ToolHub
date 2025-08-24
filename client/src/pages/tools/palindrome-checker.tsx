import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PalindromeChecker() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    cleanedText: string;
    reversedText: string;
  } | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts - use multiple methods to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    document.title = "Palindrome Checker - ToolHub | Free Online Palindrome Checker Tool";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Check if words, phrases, or sentences are palindromes with detailed analysis and examples. Free palindrome checker tool.');
    }
  }, []);

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }

    // Clean the text: remove spaces, punctuation, and convert to lowercase
    const cleanedText = inputText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversedText;

    setResult({
      isPalindrome,
      cleanedText,
      reversedText
    });
  };

  const clearText = () => {
    setInputText("");
    setResult(null);
  };

  const examplePalindromes = [
    "racecar",
    "A man a plan a canal Panama",
    "race a car",
    "Was it a car or a cat I saw?",
    "Madam",
    "No 'x' in Nixon",
    "Mr. Owl ate my metal worm"
  ];

  const tryExample = (example: string) => {
    setInputText(example);
    setTimeout(() => {
      checkPalindrome();
    }, 100);
  };

  useEffect(() => {
    if (inputText) {
      checkPalindrome();
    } else {
      setResult(null);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              <i className="fas fa-exchange-alt text-primary mr-2"></i>
              Palindrome Checker
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Check if words, phrases, or sentences are palindromes with detailed analysis and examples.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Palindrome Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="palindrome-input">Enter text to check</Label>
                      <Input
                        id="palindrome-input"
                        type="text"
                        placeholder="Enter a word, phrase, or sentence..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="mt-2"
                        data-testid="input-text"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={checkPalindrome} disabled={!inputText} data-testid="button-check">
                        <i className="fas fa-search mr-2"></i>Check Palindrome
                      </Button>
                      <Button onClick={clearText} variant="secondary" data-testid="button-clear">
                        <i className="fas fa-trash mr-2"></i>Clear
                      </Button>
                    </div>

                    {result && (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg border-2 ${
                          result.isPalindrome 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center mb-2">
                            <i className={`fas ${
                              result.isPalindrome ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'
                            } mr-2`}></i>
                            <span className={`font-semibold ${
                              result.isPalindrome ? 'text-green-800' : 'text-red-800'
                            }`} data-testid="result-status">
                              {result.isPalindrome ? "Yes, it's a palindrome!" : "No, it's not a palindrome."}
                            </span>
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="text-slate-600">
                              <strong>Cleaned text:</strong> <span data-testid="cleaned-text">{result.cleanedText}</span>
                            </p>
                            <p className="text-slate-600">
                              <strong>Reversed text:</strong> <span data-testid="reversed-text">{result.reversedText}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Example Palindromes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {examplePalindromes.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => tryExample(example)}
                        className="w-full text-left p-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                        data-testid={`example-${index}`}
                      >
                        "{example}"
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>What is a Palindrome?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward. 
                    Spaces, punctuation, and capitalization are typically ignored when checking for palindromes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}