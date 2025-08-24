import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface WaterIntakeResult {
  baseline: number;
  withActivity: number;
  withClimate: number;
  final: number;
  cups: number;
  bottles: number;
}

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [climate, setClimate] = useState("temperate");
  const [isPregnant, setIsPregnant] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);
  const [result, setResult] = useState<WaterIntakeResult | null>(null);

  useEffect(() => {
    document.title = "Water Intake Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your daily water intake needs based on weight, activity level, and environmental factors. Free hydration calculator.');
    }
  }, []);

  const calculateWaterIntake = () => {
    if (!weight) return;

    let weightKg = parseFloat(weight);
    
    // Convert to kg if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
    }

    // Base calculation: 35ml per kg body weight
    let waterIntakeMl = weightKg * 35;

    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 1.0,        // Little to no exercise
      light: 1.2,            // Light exercise 1-3 days/week
      moderate: 1.4,         // Moderate exercise 3-5 days/week
      active: 1.6,           // Heavy exercise 6-7 days/week
      very_active: 1.8       // Very heavy exercise, physical job
    };

    // Climate adjustments
    const climateAdjustments = {
      cold: -200,            // Cold climate
      temperate: 0,          // Temperate climate
      hot: 400,              // Hot climate
      very_hot: 800          // Very hot/humid climate
    };

    const baseline = waterIntakeMl;
    const withActivity = waterIntakeMl * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const withClimate = withActivity + climateAdjustments[climate as keyof typeof climateAdjustments];

    let finalIntake = withClimate;

    // Special conditions
    if (isPregnant) {
      finalIntake += 300; // Additional 300ml for pregnancy
    }
    if (isBreastfeeding) {
      finalIntake += 600; // Additional 600ml for breastfeeding
    }

    // Convert to other units
    const cups = finalIntake / 240; // 1 cup = 240ml
    const bottles = finalIntake / 500; // 1 standard bottle = 500ml

    setResult({
      baseline: Math.round(baseline),
      withActivity: Math.round(withActivity),
      withClimate: Math.round(withClimate),
      final: Math.round(finalIntake),
      cups: Math.round(cups * 10) / 10,
      bottles: Math.round(bottles * 10) / 10
    });
  };

  const clearCalculation = () => {
    setWeight("");
    setActivityLevel("sedentary");
    setClimate("temperate");
    setIsPregnant(false);
    setIsBreastfeeding(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-tint text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="water-intake-title">
              Water Intake Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="water-intake-subtitle">
              Calculate your daily water intake needs based on weight, activity, and environmental factors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user text-primary"></i>
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
                      <SelectItem value="metric">Metric (kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs)</SelectItem>
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
                  <Label htmlFor="activityLevel" className="text-sm font-medium text-slate-700 mb-2 block">
                    Activity Level
                  </Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel} data-testid="select-activity">
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (2x/day, intense)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="climate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Climate/Environment
                  </Label>
                  <Select value={climate} onValueChange={setClimate} data-testid="select-climate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select climate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold">Cold climate</SelectItem>
                      <SelectItem value="temperate">Temperate climate</SelectItem>
                      <SelectItem value="hot">Hot climate</SelectItem>
                      <SelectItem value="very_hot">Very hot/humid climate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Special Conditions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pregnant"
                        checked={isPregnant}
                        onCheckedChange={(checked) => setIsPregnant(checked === true)}
                        data-testid="checkbox-pregnant"
                      />
                      <Label htmlFor="pregnant" className="text-sm">Pregnant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="breastfeeding"
                        checked={isBreastfeeding}
                        onCheckedChange={(checked) => setIsBreastfeeding(checked === true)}
                        data-testid="checkbox-breastfeeding"
                      />
                      <Label htmlFor="breastfeeding" className="text-sm">Breastfeeding</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateWaterIntake} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Water Intake
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

                {/* Hydration Tips */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-lightbulb text-blue-600"></i>
                    <span className="font-medium text-blue-800">Hydration Tips</span>
                  </div>
                  <ul className="text-blue-700 space-y-1 text-xs">
                    <li>• Start your day with a glass of water</li>
                    <li>• Drink water before, during, and after exercise</li>
                    <li>• Monitor urine color - pale yellow is ideal</li>
                    <li>• Increase intake in hot weather or high altitudes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-line text-accent"></i>
                  <span>Daily Water Intake</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="water-intake-results">
                    {/* Main Result */}
                    <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="total-water-intake">
                        {result.final} ml
                      </h2>
                      <p className="text-blue-100 mb-2">Daily Water Intake</p>
                      <div className="text-sm text-blue-100">
                        That's {result.cups} cups or {result.bottles} bottles
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800">Calculation Breakdown:</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Base Requirement</div>
                            <div className="text-sm text-slate-600">35ml per kg body weight</div>
                          </div>
                          <div className="text-lg font-bold text-slate-600" data-testid="baseline-intake">
                            {result.baseline} ml
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">With Activity</div>
                            <div className="text-sm text-slate-600">Adjusted for {activityLevel} lifestyle</div>
                          </div>
                          <div className="text-lg font-bold text-green-600" data-testid="activity-adjusted">
                            {result.withActivity} ml
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">With Climate</div>
                            <div className="text-sm text-slate-600">Adjusted for {climate} conditions</div>
                          </div>
                          <div className="text-lg font-bold text-orange-600" data-testid="climate-adjusted">
                            {result.withClimate} ml
                          </div>
                        </div>

                        {(isPregnant || isBreastfeeding) && (
                          <div className="flex justify-between items-center p-3 bg-pink-50 border border-pink-200 rounded-xl">
                            <div>
                              <div className="font-medium text-pink-800">Special Conditions</div>
                              <div className="text-sm text-pink-700">
                                {isPregnant && "Pregnancy: +300ml"}
                                {isPregnant && isBreastfeeding && ", "}
                                {isBreastfeeding && "Breastfeeding: +600ml"}
                              </div>
                            </div>
                            <div className="text-lg font-bold text-pink-600">
                              +{(isPregnant ? 300 : 0) + (isBreastfeeding ? 600 : 0)} ml
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Alternative Measurements */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                        <div className="text-2xl font-bold text-cyan-600" data-testid="cups-count">
                          {result.cups}
                        </div>
                        <div className="text-sm text-cyan-700">Cups (240ml each)</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600" data-testid="bottles-count">
                          {result.bottles}
                        </div>
                        <div className="text-sm text-blue-700">Bottles (500ml each)</div>
                      </div>
                    </div>

                    {/* Hydration Schedule */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Suggested Daily Schedule</h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex justify-between">
                          <span>Wake up:</span>
                          <span className="font-medium">1-2 cups (240-480ml)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Before meals:</span>
                          <span className="font-medium">1 cup each (3x240ml)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>During exercise:</span>
                          <span className="font-medium">150-250ml every 15-20 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Throughout day:</span>
                          <span className="font-medium">Sip regularly</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Before bed:</span>
                          <span className="font-medium">1 cup (240ml)</span>
                        </div>
                      </div>
                    </div>

                    {/* Important Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Important Note</p>
                          <p className="text-yellow-700">
                            These are general recommendations. Individual needs may vary based on health conditions, 
                            medications, and other factors. Consult your healthcare provider for personalized advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-tint text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your weight and activity details to calculate water intake
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
                <CardTitle className="text-lg">Signs of Proper Hydration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Light yellow or clear urine</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Minimal thirst throughout the day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Good energy levels and mental clarity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Moist lips and mouth</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Elastic skin (quick rebound when pinched)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Dehydration Warning Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <span>Dark yellow or amber colored urine</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <span>Persistent thirst or dry mouth</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <span>Headache or dizziness</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <span>Fatigue or decreased concentration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <span>Constipation or decreased urination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Stay Hydrated & Happy!</h3>
                <p className="mb-4 text-yellow-100">
                  Need a laugh while you sip your water? Check out our joke generator!
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