import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const lengthUnits = {
  meter: { name: "Meter (m)", factor: 1, symbol: "m" },
  kilometer: { name: "Kilometer (km)", factor: 1000, symbol: "km" },
  centimeter: { name: "Centimeter (cm)", factor: 0.01, symbol: "cm" },
  millimeter: { name: "Millimeter (mm)", factor: 0.001, symbol: "mm" },
  inch: { name: "Inch (in)", factor: 0.0254, symbol: "in" },
  foot: { name: "Foot (ft)", factor: 0.3048, symbol: "ft" },
  yard: { name: "Yard (yd)", factor: 0.9144, symbol: "yd" },
  mile: { name: "Mile (mi)", factor: 1609.344, symbol: "mi" },
  nauticalMile: { name: "Nautical Mile", factor: 1852, symbol: "nmi" }
};

export default function LengthConverter() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");

  useEffect(() => {
    document.title = "Length Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between length units instantly. Convert meters, feet, inches, kilometers, miles, yards, centimeters and more.');
    }
  }, []);

  useEffect(() => {
    convertLength();
  }, [fromValue, fromUnit, toUnit]);

  const convertLength = () => {
    const value = parseFloat(fromValue);
    
    if (isNaN(value) || fromValue === '') {
      setToValue('');
      return;
    }

    // Convert to meters first, then to target unit
    const meters = value * lengthUnits[fromUnit as keyof typeof lengthUnits].factor;
    const convertedValue = meters / lengthUnits[toUnit as keyof typeof lengthUnits].factor;
    
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
    setFromValue("100");
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-ruler text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="length-converter-title">
              Length Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="length-converter-subtitle">
              Convert between different length units instantly and accurately
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
                      Value
                    </Label>
                    <Input
                      id="from-value"
                      type="number"
                      placeholder="Enter value"
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
                        {Object.entries(lengthUnits).map(([key, unit]) => (
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
                    Example (100)
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
                            {Object.entries(lengthUnits).map(([key, unit]) => (
                              <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                          Result
                        </Label>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="result-value">
                            {toValue}
                          </div>
                          <div className="text-sm font-medium text-blue-800">
                            {lengthUnits[toUnit as keyof typeof lengthUnits].name}
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
                        {fromValue} {lengthUnits[fromUnit as keyof typeof lengthUnits].symbol} = {toValue} {lengthUnits[toUnit as keyof typeof lengthUnits].symbol}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-conversion">
                    <i className="fas fa-ruler text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">Ready to convert</p>
                    <p className="text-sm">Enter a value to see the conversion result</p>
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
                  <p>Our length converter supports all common length units:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Metric System</h5>
                      <p>Meter, Kilometer, Centimeter, Millimeter</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Imperial System</h5>
                      <p>Inch, Foot, Yard, Mile</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Special Units</h5>
                      <p>Nautical Mile</p>
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
                  <p>Common length conversions:</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 meter</span>
                      <span className="font-medium">3.28 feet</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 kilometer</span>
                      <span className="font-medium">0.62 miles</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 inch</span>
                      <span className="font-medium">2.54 cm</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 foot</span>
                      <span className="font-medium">12 inches</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>1 yard</span>
                      <span className="font-medium">3 feet</span>
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