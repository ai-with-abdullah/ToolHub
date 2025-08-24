import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversionResult {
  value: number;
  unit: string;
  label: string;
}

const speedUnits = [
  { value: "mps", label: "Meters per second (m/s)", factor: 1 },
  { value: "kph", label: "Kilometers per hour (km/h)", factor: 3.6 },
  { value: "mph", label: "Miles per hour (mph)", factor: 2.237 },
  { value: "fps", label: "Feet per second (ft/s)", factor: 3.281 },
  { value: "knots", label: "Knots (kn)", factor: 1.944 },
  { value: "mach", label: "Mach (at sea level)", factor: 0.002915 },
  { value: "lightspeed", label: "Speed of light (c)", factor: 3.336e-9 }
];

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kph");
  const [results, setResults] = useState<ConversionResult[]>([]);

  useEffect(() => {
    document.title = "Speed Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different units of speed including mph, km/h, m/s, and more.');
    }
  }, []);

  const convertSpeed = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return;

    const value = parseFloat(inputValue);
    const fromUnitData = speedUnits.find(unit => unit.value === fromUnit);
    if (!fromUnitData) return;

    // Convert to base unit (m/s) first
    const baseValue = value / fromUnitData.factor;

    // Convert to all other units
    const conversions = speedUnits
      .filter(unit => unit.value !== fromUnit)
      .map(unit => ({
        value: parseFloat((baseValue * unit.factor).toFixed(6)),
        unit: unit.value,
        label: unit.label
      }));

    setResults(conversions);
  };

  const clearConversion = () => {
    setInputValue("");
    setResults([]);
  };

  const swapToUnit = (unit: string) => {
    const result = results.find(r => r.unit === unit);
    if (result) {
      setInputValue(result.value.toString());
      setFromUnit(unit);
      setResults([]);
    }
  };

  const getSpeedCategory = (speedMps: number): { category: string; color: string } => {
    if (speedMps < 1) return { category: "Very Slow", color: "text-green-600" };
    if (speedMps < 5) return { category: "Walking Speed", color: "text-blue-600" };
    if (speedMps < 15) return { category: "Cycling Speed", color: "text-purple-600" };
    if (speedMps < 30) return { category: "Vehicle Speed", color: "text-orange-600" };
    if (speedMps < 100) return { category: "High Speed", color: "text-red-600" };
    if (speedMps < 340) return { category: "Supersonic", color: "text-pink-600" };
    return { category: "Extreme Speed", color: "text-gray-800" };
  };

  const getCurrentSpeedInMps = (): number => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return 0;
    const value = parseFloat(inputValue);
    const fromUnitData = speedUnits.find(unit => unit.value === fromUnit);
    return fromUnitData ? value / fromUnitData.factor : 0;
  };

  const speedCategory = getSpeedCategory(getCurrentSpeedInMps());

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-tachometer-alt text-purple-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="speed-converter-title">
              Speed Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="speed-converter-subtitle">
              Convert between different units of speed including mph, km/h, m/s, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Speed Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="inputValue" className="text-sm font-medium text-slate-700 mb-2 block">
                    Speed Value
                  </Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full text-lg"
                    placeholder="Enter speed value"
                    step="any"
                    data-testid="input-speed"
                  />
                </div>

                <div>
                  <Label htmlFor="fromUnit" className="text-sm font-medium text-slate-700 mb-2 block">
                    From Unit
                  </Label>
                  <Select value={fromUnit} onValueChange={setFromUnit} data-testid="select-from-unit">
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {speedUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={convertSpeed} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!inputValue || isNaN(parseFloat(inputValue))}
                    data-testid="button-convert"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Convert Speed
                  </Button>
                  
                  <Button 
                    onClick={clearConversion} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Speed Category */}
                {inputValue && !isNaN(parseFloat(inputValue)) && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fas fa-tag text-slate-600"></i>
                      <span className="font-medium text-slate-800">Speed Category</span>
                    </div>
                    <p className={`font-semibold ${speedCategory.color}`}>
                      {speedCategory.category}
                    </p>
                  </div>
                )}

                {/* Common Examples */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <i className="fas fa-lightbulb text-blue-600"></i>
                    <span className="font-medium text-blue-800">Quick Examples</span>
                  </div>
                  <div className="space-y-2 text-blue-700">
                    <div className="flex justify-between">
                      <span>Walking pace:</span>
                      <span>5 km/h (3.1 mph)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highway speed:</span>
                      <span>100 km/h (62 mph)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sound speed:</span>
                      <span>343 m/s (1,235 km/h)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-list text-accent"></i>
                  <span>Conversion Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="space-y-4" data-testid="conversion-results">
                    {results.map((result, index) => (
                      <div 
                        key={result.unit} 
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                        onClick={() => swapToUnit(result.unit)}
                        data-testid={`result-${result.unit}`}
                      >
                        <div className="flex-1">
                          <div className="font-mono text-2xl font-bold text-slate-800">
                            {result.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">
                            {result.label}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="fas fa-exchange-alt text-primary"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-tachometer-alt text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter a Speed Value</h3>
                    <p className="text-slate-500">
                      Enter a speed value above to see conversions to all units
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Speed Conversion Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Common Conversions:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• 1 m/s = 3.6 km/h = 2.237 mph</li>
                      <li>• 1 km/h = 0.278 m/s = 0.621 mph</li>
                      <li>• 1 mph = 0.447 m/s = 1.609 km/h</li>
                      <li>• 1 knot = 0.514 m/s = 1.852 km/h</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Speed of Sound:</h5>
                    <p>Mach 1 ≈ 343 m/s (at 20°C, sea level)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Speed References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-walking text-green-500 mt-1"></i>
                    <span>Human walking: 1.4 m/s (5 km/h)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-running text-blue-500 mt-1"></i>
                    <span>Human running: 6 m/s (22 km/h)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-car text-purple-500 mt-1"></i>
                    <span>City driving: 14 m/s (50 km/h)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-plane text-orange-500 mt-1"></i>
                    <span>Commercial airliner: 250 m/s (900 km/h)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-rocket text-red-500 mt-1"></i>
                    <span>Escape velocity: 11,200 m/s</span>
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