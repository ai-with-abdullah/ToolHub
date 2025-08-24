import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const temperatureUnits = {
  celsius: { name: "Celsius (°C)", symbol: "°C" },
  fahrenheit: { name: "Fahrenheit (°F)", symbol: "°F" },
  kelvin: { name: "Kelvin (K)", symbol: "K" },
  rankine: { name: "Rankine (°R)", symbol: "°R" }
};

export default function TemperatureConverter() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");
  const [formula, setFormula] = useState("");

  useEffect(() => {
    document.title = "Temperature Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between temperature units instantly. Convert Celsius, Fahrenheit, Kelvin, and Rankine with conversion formulas.');
    }
  }, []);

  useEffect(() => {
    convertTemperature();
  }, [fromValue, fromUnit, toUnit]);

  const convertTemperature = () => {
    const value = parseFloat(fromValue);
    
    if (isNaN(value) || fromValue === '') {
      setToValue('');
      setFormula('');
      return;
    }

    let convertedValue = value;
    let formulaText = '';

    // Convert from source unit to Celsius first
    let celsius = value;
    switch(fromUnit) {
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
    }

    // Convert from Celsius to target unit
    switch(toUnit) {
      case 'celsius':
        convertedValue = celsius;
        break;
      case 'fahrenheit':
        convertedValue = celsius * 9/5 + 32;
        break;
      case 'kelvin':
        convertedValue = celsius + 273.15;
        break;
      case 'rankine':
        convertedValue = celsius * 9/5 + 491.67;
        break;
    }

    // Generate formula text
    if (fromUnit === toUnit) {
      formulaText = 'Same unit, no conversion needed';
    } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      formulaText = '°F = (°C × 9/5) + 32';
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      formulaText = '°C = (°F - 32) × 5/9';
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      formulaText = 'K = °C + 273.15';
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      formulaText = '°C = K - 273.15';
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      formulaText = 'K = (°F - 32) × 5/9 + 273.15';
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      formulaText = '°F = (K - 273.15) × 9/5 + 32';
    } else if (fromUnit === 'celsius' && toUnit === 'rankine') {
      formulaText = '°R = °C × 9/5 + 491.67';
    } else if (fromUnit === 'rankine' && toUnit === 'celsius') {
      formulaText = '°C = (°R - 491.67) × 5/9';
    } else {
      formulaText = `Convert via Celsius: ${fromUnit} → °C → ${toUnit}`;
    }
    
    setToValue(convertedValue.toFixed(2));
    setFormula(formulaText);
  };

  const resetForm = () => {
    setFromValue('');
    setToValue('');
    setFormula('');
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
    setFromValue("25");
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-thermometer-half text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="temperature-converter-title">
              Temperature Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="temperature-converter-subtitle">
              Convert between Celsius, Fahrenheit, Kelvin, and Rankine with conversion formulas
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
                      Temperature
                    </Label>
                    <Input
                      id="from-value"
                      type="number"
                      placeholder="Enter temperature"
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
                        {Object.entries(temperatureUnits).map(([key, unit]) => (
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
                    Example (25°C)
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
                            {Object.entries(temperatureUnits).map(([key, unit]) => (
                              <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                          Result
                        </Label>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                          <div className="text-3xl font-bold text-red-600 mb-2" data-testid="result-value">
                            {toValue}
                          </div>
                          <div className="text-sm font-medium text-red-800">
                            {temperatureUnits[toUnit as keyof typeof temperatureUnits].name}
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
                      <div className="text-sm text-slate-600 mb-1">Conversion Formula:</div>
                      <div className="text-sm font-mono text-slate-800" data-testid="conversion-formula">
                        {formula}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500" data-testid="no-conversion">
                    <i className="fas fa-thermometer-half text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg mb-2">Ready to convert</p>
                    <p className="text-sm">Enter a temperature to see the conversion result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Temperature Scales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>Understanding different temperature scales:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-slate-800">Celsius (°C)</h5>
                      <p>Water freezes at 0°C, boils at 100°C</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Fahrenheit (°F)</h5>
                      <p>Water freezes at 32°F, boils at 212°F</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Kelvin (K)</h5>
                      <p>Absolute zero scale, 0K = -273.15°C</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-800">Rankine (°R)</h5>
                      <p>Absolute scale based on Fahrenheit degrees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>Useful temperature reference points:</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Room temperature</span>
                      <span className="font-medium">20-22°C / 68-72°F</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Body temperature</span>
                      <span className="font-medium">37°C / 98.6°F</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Water freezes</span>
                      <span className="font-medium">0°C / 32°F</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Water boils</span>
                      <span className="font-medium">100°C / 212°F</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Absolute zero</span>
                      <span className="font-medium">-273.15°C / 0K</span>
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