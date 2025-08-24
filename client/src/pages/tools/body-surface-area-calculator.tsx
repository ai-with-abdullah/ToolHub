import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BSAResult {
  mosteller: number;
  dubois: number;
  haycock: number;
  gehan: number;
  boyd: number;
  average: number;
}

export default function BodySurfaceAreaCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BSAResult | null>(null);

  useEffect(() => {
    document.title = "Body Surface Area Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate body surface area using multiple medical formulas (Mosteller, DuBois, Haycock). Free BSA calculator for medical dosing.');
    }
  }, []);

  const calculateBSA = () => {
    if (!weight || !height) return;

    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    // Convert units if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    // Mosteller Formula (most widely used)
    const mosteller = Math.sqrt((weightKg * heightCm) / 3600);

    // DuBois Formula (original, 1916)
    const dubois = 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);

    // Haycock Formula (1978)
    const haycock = 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964);

    // Gehan and George Formula (1970)
    const gehan = 0.0235 * Math.pow(weightKg, 0.51456) * Math.pow(heightCm, 0.42246);

    // Boyd Formula (1935)
    const boyd = 0.0333 * Math.pow(weightKg, (0.6157 - 0.0188 * Math.log10(weightKg))) * Math.pow(heightCm, 0.3);

    // Average of all formulas
    const average = (mosteller + dubois + haycock + gehan + boyd) / 5;

    setResult({
      mosteller: Math.round(mosteller * 1000) / 1000,
      dubois: Math.round(dubois * 1000) / 1000,
      haycock: Math.round(haycock * 1000) / 1000,
      gehan: Math.round(gehan * 1000) / 1000,
      boyd: Math.round(boyd * 1000) / 1000,
      average: Math.round(average * 1000) / 1000
    });
  };

  const clearCalculation = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-user-cog text-purple-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="bsa-title">
              Body Surface Area Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="bsa-subtitle">
              Calculate body surface area using multiple medical formulas for accurate medication dosing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user-md text-primary"></i>
                  <span>Patient Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="unit" className="text-sm font-medium text-slate-700 mb-2 block">
                    Unit System
                  </Label>
                  <Select value={unit} onValueChange={setUnit} data-testid="select-unit">
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="weight" className="text-sm font-medium text-slate-700 mb-2 block">
                    Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full text-lg"
                    placeholder={unit === "metric" ? "70" : "154"}
                    min="1"
                    step="0.1"
                    data-testid="input-weight"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-sm font-medium text-slate-700 mb-2 block">
                    Height {unit === "metric" ? "(cm)" : "(inches)"}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full text-lg"
                    placeholder={unit === "metric" ? "170" : "67"}
                    min="1"
                    step="0.1"
                    data-testid="input-height"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateBSA} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight || !height}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate BSA
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* BSA Info */}
                <div className="bg-purple-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-purple-600"></i>
                    <span className="font-medium text-purple-800">About Body Surface Area</span>
                  </div>
                  <p className="text-purple-700">
                    BSA is used in medical settings for calculating medication dosages, 
                    determining cardiac index, and various medical procedures. 
                    Normal adult BSA ranges from 1.5 to 2.0 m².
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-area text-accent"></i>
                  <span>BSA Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="bsa-results">
                    {/* Average Result */}
                    <div className="text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="average-bsa">
                        {result.average} m²
                      </h2>
                      <p className="text-purple-100">Average Body Surface Area</p>
                    </div>

                    {/* Formula Results */}
                    <Tabs defaultValue="formulas" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="formulas">All Formulas</TabsTrigger>
                        <TabsTrigger value="clinical">Clinical Info</TabsTrigger>
                      </TabsList>

                      <TabsContent value="formulas" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Mosteller Formula</div>
                              <div className="text-sm text-slate-600">Most widely used (1987)</div>
                            </div>
                            <div className="text-lg font-bold text-primary" data-testid="mosteller-bsa">
                              {result.mosteller} m²
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">DuBois Formula</div>
                              <div className="text-sm text-slate-600">Original BSA formula (1916)</div>
                            </div>
                            <div className="text-lg font-bold text-green-600" data-testid="dubois-bsa">
                              {result.dubois} m²
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Haycock Formula</div>
                              <div className="text-sm text-slate-600">Pediatric applications (1978)</div>
                            </div>
                            <div className="text-lg font-bold text-orange-600" data-testid="haycock-bsa">
                              {result.haycock} m²
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Gehan Formula</div>
                              <div className="text-sm text-slate-600">Oncology applications (1970)</div>
                            </div>
                            <div className="text-lg font-bold text-purple-600" data-testid="gehan-bsa">
                              {result.gehan} m²
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Boyd Formula</div>
                              <div className="text-sm text-slate-600">Historical formula (1935)</div>
                            </div>
                            <div className="text-lg font-bold text-indigo-600" data-testid="boyd-bsa">
                              {result.boyd} m²
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="clinical" className="space-y-4">
                        <div className="space-y-4">
                          {/* BSA Categories */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-slate-800">BSA Categories:</h4>
                            <div className="space-y-2 text-sm">
                              <div className={`p-2 rounded ${result.average < 1.5 ? 'bg-blue-100 border border-blue-300' : 'bg-slate-100'}`}>
                                <strong>Small Adult:</strong> &lt; 1.5 m² (requires dose adjustment)
                              </div>
                              <div className={`p-2 rounded ${result.average >= 1.5 && result.average <= 2.0 ? 'bg-green-100 border border-green-300' : 'bg-slate-100'}`}>
                                <strong>Average Adult:</strong> 1.5 - 2.0 m² (normal range)
                              </div>
                              <div className={`p-2 rounded ${result.average > 2.0 ? 'bg-orange-100 border border-orange-300' : 'bg-slate-100'}`}>
                                <strong>Large Adult:</strong> &gt; 2.0 m² (may need dose adjustment)
                              </div>
                            </div>
                          </div>

                          {/* Clinical Applications */}
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-800 mb-3">Clinical Applications</h4>
                            <ul className="space-y-2 text-sm text-blue-700">
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-pills text-blue-600 mt-1"></i>
                                <span>Chemotherapy dosing calculations</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-heart text-blue-600 mt-1"></i>
                                <span>Cardiac index determination</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-kidneys text-blue-600 mt-1"></i>
                                <span>Renal function assessment</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-burn text-blue-600 mt-1"></i>
                                <span>Burn injury treatment planning</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-syringe text-blue-600 mt-1"></i>
                                <span>Pediatric medication dosing</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Important Medical Note */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-red-600 mt-1"></i>
                        <div>
                          <p className="text-red-800 font-medium mb-1">Medical Use Only</p>
                          <p className="text-red-700">
                            BSA calculations are for healthcare professionals only. Never use this for 
                            self-medication or dosing without proper medical supervision. Always 
                            consult qualified healthcare providers for medical decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-user-cog text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Patient Information</h3>
                    <p className="text-slate-500">
                      Fill in weight and height to calculate body surface area
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
                <CardTitle className="text-lg">Formula Accuracy & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Most Accurate Formulas:</h5>
                    <ul className="space-y-1 ml-4">
                      <li><strong>Mosteller:</strong> Simplest and most widely used</li>
                      <li><strong>DuBois:</strong> Classic, well-validated formula</li>
                      <li><strong>Haycock:</strong> Best for children and small adults</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Clinical Standards:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Mosteller formula is FDA recommended</li>
                      <li>• DuBois used in cardiac index calculations</li>
                      <li>• Haycock preferred for pediatric oncology</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">BSA Reference Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Average BSA by Age:</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Newborn:</span>
                        <span className="font-medium">0.25 m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Child (2 years):</span>
                        <span className="font-medium">0.5 m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Child (9 years):</span>
                        <span className="font-medium">1.07 m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Adult (average):</span>
                        <span className="font-medium">1.7 m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Adult (large):</span>
                        <span className="font-medium">2.0+ m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Medical Calculations Complete!</h3>
                <p className="mb-4 text-yellow-100">
                  Time for some lighter content - enjoy a random joke!
                </p>
                <a 
                  href="/tools/random-joke-generator" 
                  className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                  data-testid="button-fun-tool"
                >
                  <i className="fas fa-laugh mr-2"></i>
                  Get a Random Joke
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}