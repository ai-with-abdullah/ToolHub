import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function RandomPasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts - use multiple methods to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    document.title = "Random Password Generator - ToolHub | Free Secure Password Generator";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate strong, secure passwords with customizable options for length and character types. Free password generator with security indicators.');
    }
  }, []);

  const generatePassword = () => {
    let charset = "";
    
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (charset === "") {
      alert("Please select at least one character type!");
      return;
    }
    
    let generatedPassword = "";
    for (let i = 0; i < length[0]; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(generatedPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: "None", color: "text-slate-400", score: 0 };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { strength: "Weak", color: "text-red-600", score };
    if (score <= 4) return { strength: "Medium", color: "text-yellow-600", score };
    return { strength: "Strong", color: "text-green-600", score };
  };

  const strength = getPasswordStrength();

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              <i className="fas fa-key text-primary mr-2"></i>
              Random Password Generator
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Generate strong, secure passwords with customizable options for length and character types.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative">
                      <Input
                        type="text"
                        value={password}
                        readOnly
                        className="text-lg font-mono pr-20"
                        data-testid="input-password"
                      />
                      <Button 
                        onClick={copyPassword}
                        variant="outline"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        data-testid="button-copy"
                      >
                        <i className="fas fa-copy"></i>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Password Strength:</span>
                      <span className={`font-semibold ${strength.color}`} data-testid="password-strength">
                        {strength.strength}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strength.score <= 2 ? 'bg-red-500' : 
                          strength.score <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(strength.score / 6) * 100}%` }}
                      ></div>
                    </div>

                    <Button onClick={generatePassword} className="w-full" data-testid="button-generate">
                      <i className="fas fa-refresh mr-2"></i>Generate New Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Password Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label>Length: {length[0]}</Label>
                      <Slider
                        value={length}
                        onValueChange={setLength}
                        max={50}
                        min={4}
                        step={1}
                        className="mt-2"
                        data-testid="slider-length"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="uppercase"
                          checked={includeUppercase}
                          onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                          data-testid="checkbox-uppercase"
                        />
                        <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="lowercase"
                          checked={includeLowercase}
                          onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                          data-testid="checkbox-lowercase"
                        />
                        <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="numbers"
                          checked={includeNumbers}
                          onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                          data-testid="checkbox-numbers"
                        />
                        <Label htmlFor="numbers">Numbers (0-9)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="symbols"
                          checked={includeSymbols}
                          onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                          data-testid="checkbox-symbols"
                        />
                        <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="exclude-similar"
                          checked={excludeSimilar}
                          onCheckedChange={(checked) => setExcludeSimilar(checked as boolean)}
                          data-testid="checkbox-exclude-similar"
                        />
                        <Label htmlFor="exclude-similar">Exclude similar characters</Label>
                      </div>
                    </div>
                  </div>
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