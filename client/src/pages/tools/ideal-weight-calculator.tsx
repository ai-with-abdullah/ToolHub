import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  healthy_bmi_range: { min: number; max: number };
  average: number;
}

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<IdealWeightResult | null>(null);

  useEffect(() => {
    document.title = "Ideal Weight Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your ideal weight using multiple medical formulas. Free ideal weight calculator with Robinson, Miller, Devine, and Hamwi formulas.');
    }
  }, []);

  const calculateIdealWeight = () => {
    if (!height || !gender) return;

    let heightCm = parseFloat(height);
    
    // Convert to cm if needed
    if (unit === "imperial") {
      heightCm = heightCm * 2.54; // inches to cm
    }

    const heightM = heightCm / 100;

    // Robinson Formula (1983)
    let robinson: number;
    if (gender === "male") {
      robinson = 52 + 1.9 * (heightCm - 152.4) / 2.54;
    } else {
      robinson = 49 + 1.7 * (heightCm - 152.4) / 2.54;
    }

    // Miller Formula (1983)
    let miller: number;
    if (gender === "male") {
      miller = 56.2 + 1.41 * (heightCm - 152.4) / 2.54;
    } else {
      miller = 53.1 + 1.36 * (heightCm - 152.4) / 2.54;
    }

    // Devine Formula (1974)
    let devine: number;
    if (gender === "male") {
      devine = 50 + 2.3 * (heightCm - 152.4) / 2.54;
    } else {
      devine = 45.5 + 2.3 * (heightCm - 152.4) / 2.54;
    }

    // Hamwi Formula (1964)
    let hamwi: number;
    if (gender === "male") {
      hamwi = 48 + 2.7 * (heightCm - 152.4) / 2.54;
    } else {
      hamwi = 45.5 + 2.2 * (heightCm - 152.4) / 2.54;
    }

    // Healthy BMI Range (18.5 - 24.9)
    const bmi_min_weight = 18.5 * heightM * heightM;
    const bmi_max_weight = 24.9 * heightM * heightM;

    // Average of all formulas
    const average = (robinson + miller + devine + hamwi) / 4;

    setResult({
      robinson: Math.round(robinson * 100) / 100,
      miller: Math.round(miller * 100) / 100,
      devine: Math.round(devine * 100) / 100,
      hamwi: Math.round(hamwi * 100) / 100,
      healthy_bmi_range: {
        min: Math.round(bmi_min_weight * 100) / 100,
        max: Math.round(bmi_max_weight * 100) / 100
      },
      average: Math.round(average * 100) / 100
    });
  };

  const clearCalculation = () => {
    setHeight("");
    setGender("");
    setResult(null);
  };

  const convertWeight = (weightKg: number) => {
    return unit === "imperial" ? Math.round(weightKg * 2.20462 * 100) / 100 : weightKg;
  };

  const weightUnit = unit === "imperial" ? "lbs" : "kg";

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-balance-scale text-teal-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="ideal-weight-title">
              Ideal Weight Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="ideal-weight-subtitle">
              Calculate your ideal weight using multiple medical formulas and healthy BMI ranges
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user-md text-primary"></i>
                  <span>Your Information</span>
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
                  <Label htmlFor="gender" className="text-sm font-medium text-slate-700 mb-2 block">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender} data-testid="select-gender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
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
                    onClick={calculateIdealWeight} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!height || !gender}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Ideal Weight
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

                {/* Formula Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">About Ideal Weight</span>
                  </div>
                  <p className="text-blue-700">
                    Ideal weight formulas provide estimates based on height and gender. 
                    They don't account for muscle mass, bone density, or body composition.
                    Consult healthcare professionals for personalized advice.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Ideal Weight Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="ideal-weight-results">
                    {/* Average Result */}
                    <div className="text-center bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="average-weight">
                        {convertWeight(result.average)} {weightUnit}
                      </h2>
                      <p className="text-teal-100">Average Ideal Weight</p>
                    </div>

                    {/* Formula Results */}
                    <Tabs defaultValue="formulas" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="formulas">Medical Formulas</TabsTrigger>
                        <TabsTrigger value="bmi">BMI Range</TabsTrigger>
                      </TabsList>

                      <TabsContent value="formulas" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Robinson Formula</div>
                              <div className="text-sm text-slate-600">Most widely used (1983)</div>
                            </div>
                            <div className="text-lg font-bold text-primary" data-testid="robinson-weight">
                              {convertWeight(result.robinson)} {weightUnit}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Miller Formula</div>
                              <div className="text-sm text-slate-600">Adjusted for modern populations</div>
                            </div>
                            <div className="text-lg font-bold text-green-600" data-testid="miller-weight">
                              {convertWeight(result.miller)} {weightUnit}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Devine Formula</div>
                              <div className="text-sm text-slate-600">Classic medical standard</div>
                            </div>
                            <div className="text-lg font-bold text-orange-600" data-testid="devine-weight">
                              {convertWeight(result.devine)} {weightUnit}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Hamwi Formula</div>
                              <div className="text-sm text-slate-600">Conservative estimate</div>
                            </div>
                            <div className="text-lg font-bold text-purple-600" data-testid="hamwi-weight">
                              {convertWeight(result.hamwi)} {weightUnit}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bmi" className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <h4 className="font-semibold text-green-800 mb-3">Healthy BMI Range (18.5-24.9)</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-green-700">Minimum Weight:</span>
                              <span className="font-bold text-green-600" data-testid="bmi-min-weight">
                                {convertWeight(result.healthy_bmi_range.min)} {weightUnit}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-700">Maximum Weight:</span>
                              <span className="font-bold text-green-600" data-testid="bmi-max-weight">
                                {convertWeight(result.healthy_bmi_range.max)} {weightUnit}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-green-600 mt-3">
                            This range represents weights that correspond to a healthy BMI for your height.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Important Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Important Considerations</p>
                          <ul className="text-yellow-700 space-y-1 text-xs">
                            <li>• These formulas don't account for muscle mass or body composition</li>
                            <li>• Athletes and very muscular individuals may weigh more than "ideal"</li>
                            <li>• Age, ethnicity, and health conditions affect ideal weight</li>
                            <li>• Consult healthcare professionals for personalized guidance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-balance-scale text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your height and gender to calculate ideal weight
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
                <CardTitle className="text-lg">Understanding the Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Robinson Formula (1983):</h5>
                    <p>Most commonly used in medical practice. Based on large population studies.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Miller Formula (1983):</h5>
                    <p>Slightly modified version accounting for modern population changes.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Devine Formula (1974):</h5>
                    <p>Classic medical standard, often used for medication dosing calculations.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Hamwi Formula (1964):</h5>
                    <p>Conservative estimate, tends to suggest lower weights.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Healthy Weight Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-apple-alt text-green-500 mt-1"></i>
                    <span>Focus on balanced nutrition and whole foods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-running text-blue-500 mt-1"></i>
                    <span>Include regular physical activity and exercise</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bed text-purple-500 mt-1"></i>
                    <span>Maintain adequate sleep (7-9 hours per night)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tint text-cyan-500 mt-1"></i>
                    <span>Stay hydrated with adequate water intake</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Manage stress and prioritize mental health</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Need a Break?</h3>
                <p className="mb-4 text-yellow-100">
                  Take a moment to brighten your day with a random joke!
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