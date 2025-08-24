import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weightUnits = {
  kilogram: { name: "Kilogram (kg)", factor: 1, symbol: "kg" },
  gram: { name: "Gram (g)", factor: 0.001, symbol: "g" },
  pound: { name: "Pound (lb)", factor: 0.453592, symbol: "lb" },
  ounce: { name: "Ounce (oz)", factor: 0.0283495, symbol: "oz" },
  stone: { name: "Stone (st)", factor: 6.35029, symbol: "st" },
  ton: { name: "Metric Ton (t)", factor: 1000, symbol: "t" },
  shortTon: { name: "Short Ton", factor: 907.185, symbol: "ton" },
  longTon: { name: "Long Ton", factor: 1016.05, symbol: "long ton" }
};

export default function WeightConverter() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");

  useEffect(() => {
    document.title = "Weight Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between weight units instantly. Convert kilograms, pounds, ounces, grams, stones and more.');
    }
  }, []);

  useEffect(() => {
    convertWeight();
  }, [fromValue, fromUnit, toUnit]);

  const convertWeight = () => {
    const value = parseFloat(fromValue);
    
    if (isNaN(value) || fromValue === '') {
      setToValue('');
      return;
    }

    // Convert to kilograms first, then to target unit
    const kilograms = value * weightUnits[fromUnit as keyof typeof weightUnits].factor;
    const convertedValue = kilograms / weightUnits[toUnit as keyof typeof weightUnits].factor;
    
    setToValue(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
  };

  const resetForm = () => {
    setFromValue('');
    setToValue('');
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const insertExampleValue = () => {
    setFromValue("70");
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-weight-hanging text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="weight-converter-title">
              Weight Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="weight-converter-subtitle">
              Convert between different weight units instantly and accurately
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Convert From</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from-value" className="text-sm font-medium text-slate-700 mb-2 block">
                      Weight
                    </Label>
                    <Input
                      id="from-value"
                      type="number"
                      placeholder="Enter weight"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      className="text-lg"
                      data-testid="input-from-value"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="from-unit" className="text-sm font-medium text-slate-700 mb-2 block">
                      Unit
                    </Label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger data-testid="select-from-unit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(weightUnits).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={insertExampleValue} 
                    variant="outline"
                    className="flex-1"
                    data-testid="button-example"
                  >
                    <i className="fas fa-magic mr-2"></i>
                    Example (70kg)
                  </Button>
                  
                  <Button 
                    onClick={resetForm} 
                    variant="outline"
                    className="px-4"
                    disabled={!fromValue}
                    data-testid="button-reset"
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
                  <i className="fas fa-calculator text-accent"></i>
                  <span>Convert To</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fromValue ? (
                  <div className="space-y-6" data-testid="conversion-result">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="to-unit" className="text-sm font-medium text-slate-700 mb-2 block">
                          Target Unit
                        </Label>
                        <Select value={toUnit} onValueChange={setToUnit}>
                          <SelectTrigger data-testid="select-to-unit">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(weightUnits).map(([key, unit]) => (
                              <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                          Result
                        </Label>
                        <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                          <div className="text-3xl font-bold text-teal-600 mb-2" data-testid="result-value">
                            {toValue}
                          </div>
                          <div className="text-sm font-medium text-teal-800">
                            {weightUnits[toUnit as keyof typeof weightUnits].name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => navigator.clipboard.writeText(toValue)}
                        className="flex-1"
                        disabled={!toValue}
                        data-testid="button-copy"
                      >
                        <i className="fas fa-copy mr-2"></i>
                        Copy Result
                      </Button>
                      
                      <Button 
                        onClick={swapUnits}
                        variant="outline"
                        data-testid="button-swap"
                      >
                        <i className="fas fa-exchange-alt mr-2"></i>
                        Swap
                      </Button>
                    </div>

                    {/* Conversion Formula */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Formula:</div>
                      <div className="text-sm font-mono text-slate-800">
                        {fromValue} {weightUnits[fromUnit as keyof typeof weightUnits].symbol} = {toValue} {weightUnits[toUnit as keyof typeof weightUnits].symbol}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-conversion">
                    <i className="fas fa-weight-hanging text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">Ready to convert</p>
                    <p className="text-sm">Enter a weight to see the conversion result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Supported Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>Our weight converter supports all common weight units:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Metric System</h5>
                      <p>Kilogram, Gram, Metric Ton</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Imperial System</h5>
                      <p>Pound, Ounce, Stone</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">US/UK Tons</h5>
                      <p>Short Ton, Long Ton</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>Common weight conversions:</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 kilogram</span>
                      <span className="font-medium">2.20 pounds</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 pound</span>
                      <span className="font-medium">16 ounces</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 stone</span>
                      <span className="font-medium">14 pounds</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 metric ton</span>
                      <span className="font-medium">1000 kg</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 short ton</span>
                      <span className="font-medium">2000 lbs</span>
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