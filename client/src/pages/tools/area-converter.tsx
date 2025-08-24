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

const areaUnits = [
  { value: "sqm", label: "Square meters (m²)", factor: 1 },
  { value: "sqkm", label: "Square kilometers (km²)", factor: 1e-6 },
  { value: "sqcm", label: "Square centimeters (cm²)", factor: 10000 },
  { value: "sqmm", label: "Square millimeters (mm²)", factor: 1000000 },
  { value: "sqft", label: "Square feet (ft²)", factor: 10.764 },
  { value: "sqin", label: "Square inches (in²)", factor: 1550 },
  { value: "sqyd", label: "Square yards (yd²)", factor: 1.196 },
  { value: "sqmi", label: "Square miles (mi²)", factor: 3.861e-7 },
  { value: "hectare", label: "Hectares (ha)", factor: 0.0001 },
  { value: "acre", label: "Acres (ac)", factor: 0.000247 }
];

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("sqm");
  const [results, setResults] = useState<ConversionResult[]>([]);

  useEffect(() => {
    document.title = "Area Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different units of area including square meters, acres, hectares, and more.');
    }
  }, []);

  const convertArea = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return;

    const value = parseFloat(inputValue);
    const fromUnitData = areaUnits.find(unit => unit.value === fromUnit);
    if (!fromUnitData) return;

    // Convert to base unit (square meters) first
    const baseValue = value / fromUnitData.factor;

    // Convert to all other units
    const conversions = areaUnits
      .filter(unit => unit.value !== fromUnit)
      .map(unit => ({
        value: parseFloat((baseValue * unit.factor).toFixed(10)),
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

  const getAreaCategory = (areaSqm: number): { category: string; color: string } => {
    if (areaSqm < 1) return { category: "Very Small", color: "text-green-600" };
    if (areaSqm < 100) return { category: "Room Size", color: "text-blue-600" };
    if (areaSqm < 1000) return { category: "House Size", color: "text-purple-600" };
    if (areaSqm < 10000) return { category: "Building Size", color: "text-orange-600" };
    if (areaSqm < 1000000) return { category: "Large Property", color: "text-red-600" };
    return { category: "Massive Area", color: "text-gray-800" };
  };

  const getCurrentAreaInSqm = (): number => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return 0;
    const value = parseFloat(inputValue);
    const fromUnitData = areaUnits.find(unit => unit.value === fromUnit);
    return fromUnitData ? value / fromUnitData.factor : 0;
  };

  const areaCategory = getAreaCategory(getCurrentAreaInSqm());

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    if (num < 0.000001) return num.toExponential(3);
    if (num < 0.01) return num.toFixed(6);
    if (num < 1) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-expand-arrows-alt text-orange-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="area-converter-title">
              Area Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="area-converter-subtitle">
              Convert between different units of area including square meters, acres, hectares, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Area Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="inputValue" className="text-sm font-medium text-slate-700 mb-2 block">
                    Area Value
                  </Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full text-lg"
                    placeholder="Enter area value"
                    step="any"
                    data-testid="input-area"
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
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={convertArea} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!inputValue || isNaN(parseFloat(inputValue))}
                    data-testid="button-convert"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Convert Area
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

                {/* Area Category */}
                {inputValue && !isNaN(parseFloat(inputValue)) && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fas fa-tag text-slate-600"></i>
                      <span className="font-medium text-slate-800">Area Category</span>
                    </div>
                    <p className={`font-semibold ${areaCategory.color}`}>
                      {areaCategory.category}
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
                      <span>Average room:</span>
                      <span>20 m² (215 ft²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Football field:</span>
                      <span>7,140 m² (1.76 acres)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average house:</span>
                      <span>200 m² (2,153 ft²)</span>
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
                          <div className="font-mono text-xl font-bold text-slate-800">
                            {formatNumber(result.value)}
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
                      <i className="fas fa-expand-arrows-alt text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter an Area Value</h3>
                    <p className="text-slate-500">
                      Enter an area value above to see conversions to all units
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
                <CardTitle className="text-lg">Area Conversion Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Common Conversions:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• 1 m² = 10.764 ft² = 1.196 yd²</li>
                      <li>• 1 hectare = 10,000 m² = 2.471 acres</li>
                      <li>• 1 acre = 4,047 m² = 43,560 ft²</li>
                      <li>• 1 km² = 100 hectares = 247.1 acres</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Formula:</h5>
                    <p className="bg-slate-50 p-2 rounded font-mono text-xs">
                      Area = Length × Width (for rectangles)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Area References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-home text-blue-500 mt-1"></i>
                    <span>Average bedroom: 12 m² (130 ft²)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-building text-green-500 mt-1"></i>
                    <span>Tennis court: 261 m² (0.06 acres)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tree text-orange-500 mt-1"></i>
                    <span>City block: 2 hectares (5 acres)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-map text-purple-500 mt-1"></i>
                    <span>Central Park NYC: 341 hectares (843 acres)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-globe text-red-500 mt-1"></i>
                    <span>Monaco: 2.02 km² (0.78 mi²)</span>
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