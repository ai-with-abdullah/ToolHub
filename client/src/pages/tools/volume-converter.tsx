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

const volumeUnits = [
  { value: "liter", label: "Liters (L)", factor: 1 },
  { value: "ml", label: "Milliliters (mL)", factor: 1000 },
  { value: "gallon_us", label: "US Gallons (gal)", factor: 0.264172 },
  { value: "gallon_uk", label: "UK Gallons (gal)", factor: 0.219969 },
  { value: "quart_us", label: "US Quarts (qt)", factor: 1.05669 },
  { value: "pint_us", label: "US Pints (pt)", factor: 2.11338 },
  { value: "cup_us", label: "US Cups", factor: 4.22675 },
  { value: "fl_oz_us", label: "US Fluid Ounces (fl oz)", factor: 33.814 },
  { value: "fl_oz_uk", label: "UK Fluid Ounces (fl oz)", factor: 35.1951 },
  { value: "tbsp_us", label: "US Tablespoons (tbsp)", factor: 67.628 },
  { value: "tsp_us", label: "US Teaspoons (tsp)", factor: 202.884 },
  { value: "cubic_m", label: "Cubic Meters (m³)", factor: 0.001 },
  { value: "cubic_cm", label: "Cubic Centimeters (cm³)", factor: 1000 },
  { value: "cubic_ft", label: "Cubic Feet (ft³)", factor: 0.0353147 },
  { value: "cubic_in", label: "Cubic Inches (in³)", factor: 61.0237 },
  { value: "barrel", label: "Barrels (oil)", factor: 0.00628981 }
];

export default function VolumeConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("liter");
  const [results, setResults] = useState<ConversionResult[]>([]);

  useEffect(() => {
    document.title = "Volume Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different units of volume including liters, gallons, cubic meters, and more.');
    }
  }, []);

  const convertVolume = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return;

    const value = parseFloat(inputValue);
    const fromUnitData = volumeUnits.find(unit => unit.value === fromUnit);
    if (!fromUnitData) return;

    // Convert to base unit (liters) first
    const baseValue = value / fromUnitData.factor;

    // Convert to all other units
    const conversions = volumeUnits
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

  const getVolumeCategory = (volumeLiters: number): { category: string; color: string } => {
    if (volumeLiters < 0.001) return { category: "Drop", color: "text-blue-600" };
    if (volumeLiters < 0.1) return { category: "Small Amount", color: "text-green-600" };
    if (volumeLiters < 1) return { category: "Cup/Glass", color: "text-purple-600" };
    if (volumeLiters < 5) return { category: "Bottle/Jug", color: "text-orange-600" };
    if (volumeLiters < 100) return { category: "Bucket/Tank", color: "text-red-600" };
    if (volumeLiters < 1000) return { category: "Large Container", color: "text-pink-600" };
    return { category: "Industrial Volume", color: "text-gray-800" };
  };

  const getCurrentVolumeInLiters = (): number => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return 0;
    const value = parseFloat(inputValue);
    const fromUnitData = volumeUnits.find(unit => unit.value === fromUnit);
    return fromUnitData ? value / fromUnitData.factor : 0;
  };

  const volumeCategory = getVolumeCategory(getCurrentVolumeInLiters());

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
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-cube text-cyan-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="volume-converter-title">
              Volume Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="volume-converter-subtitle">
              Convert between different units of volume including liters, gallons, cubic meters, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Volume Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="inputValue" className="text-sm font-medium text-slate-700 mb-2 block">
                    Volume Value
                  </Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full text-lg"
                    placeholder="Enter volume value"
                    step="any"
                    data-testid="input-volume"
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
                      {volumeUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={convertVolume} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!inputValue || isNaN(parseFloat(inputValue))}
                    data-testid="button-convert"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Convert Volume
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

                {/* Volume Category */}
                {inputValue && !isNaN(parseFloat(inputValue)) && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fas fa-tag text-slate-600"></i>
                      <span className="font-medium text-slate-800">Volume Category</span>
                    </div>
                    <p className={`font-semibold ${volumeCategory.color}`}>
                      {volumeCategory.category}
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
                      <span>Water bottle:</span>
                      <span>0.5 L (16.9 fl oz)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Milk jug:</span>
                      <span>1 gallon (3.79 L)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Swimming pool:</span>
                      <span>50,000 L (13,208 gal)</span>
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
                      <i className="fas fa-cube text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter a Volume Value</h3>
                    <p className="text-slate-500">
                      Enter a volume value above to see conversions to all units
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
                <CardTitle className="text-lg">Volume Conversion Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Common Conversions:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• 1 L = 1,000 mL = 0.264 US gal</li>
                      <li>• 1 US gallon = 3.785 L = 4 quarts</li>
                      <li>• 1 m³ = 1,000 L = 264.2 US gal</li>
                      <li>• 1 cup = 8 fl oz = 236.6 mL</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Cooking Conversions:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• 1 tbsp = 3 tsp = 14.8 mL</li>
                      <li>• 1 cup = 16 tbsp = 240 mL</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Volume References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tint text-blue-500 mt-1"></i>
                    <span>Teaspoon: 5 mL</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-coffee text-brown-500 mt-1"></i>
                    <span>Coffee cup: 240 mL (8 fl oz)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-wine-bottle text-purple-500 mt-1"></i>
                    <span>Wine bottle: 750 mL (25.4 fl oz)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-gas-pump text-orange-500 mt-1"></i>
                    <span>Car fuel tank: 50-80 L (13-21 gal)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-swimming-pool text-cyan-500 mt-1"></i>
                    <span>Olympic pool: 2.5 million L</span>
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