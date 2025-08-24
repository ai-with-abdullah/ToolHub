import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BACResult {
  bac: number;
  level: string;
  effects: string[];
  timeToSober: number;
  legalStatus: string;
  color: string;
}

export default function BACCalculator() {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BACResult | null>(null);

  useEffect(() => {
    document.title = "BAC Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate Blood Alcohol Content (BAC) levels for educational purposes. Understand alcohol impairment effects and safety guidelines.');
    }
  }, []);

  const calculateBAC = () => {
    if (!weight || !gender || !drinks || !hours) return;

    let weightValue = parseFloat(weight);
    const drinksValue = parseFloat(drinks);
    const hoursValue = parseFloat(hours);

    // Convert weight to grams if needed
    if (unit === "imperial") {
      weightValue = weightValue * 453.592; // pounds to grams
    } else {
      weightValue = weightValue * 1000; // kg to grams
    }

    // Widmark Formula
    // BAC = (Alcohol consumed in grams / (Body weight in grams × r)) - (0.015 × hours)
    // r = distribution ratio (0.68 for men, 0.55 for women)
    
    const alcoholConsumedGrams = drinksValue * 14; // Standard drink = 14g alcohol
    const distributionRatio = gender === "male" ? 0.68 : 0.55;
    const metabolismRate = 0.015; // 0.015% per hour

    let bac = (alcoholConsumedGrams / (weightValue * distributionRatio)) * 100;
    bac = bac - (metabolismRate * hoursValue);
    bac = Math.max(0, bac); // BAC cannot be negative

    // Determine impairment level and effects
    let level: string;
    let effects: string[];
    let legalStatus: string;
    let color: string;
    
    if (bac < 0.02) {
      level = "Minimal Impairment";
      effects = ["Little to no impairment", "Slight mood changes"];
      legalStatus = "Legal to drive in most places";
      color = "text-green-600 bg-green-50 border-green-200";
    } else if (bac < 0.05) {
      level = "Slight Impairment";
      effects = ["Relaxation", "Slight decrease in visual tracking", "Reduced coordination"];
      legalStatus = "Legal limit in some countries (0.05%)";
      color = "text-yellow-600 bg-yellow-50 border-yellow-200";
    } else if (bac < 0.08) {
      level = "Mild Impairment";
      effects = ["Reduced judgment", "Decreased reaction time", "Impaired coordination"];
      legalStatus = "Approaching legal limit (0.08%)";
      color = "text-orange-600 bg-orange-50 border-orange-200";
    } else if (bac < 0.10) {
      level = "Moderate Impairment";
      effects = ["Slurred speech", "Poor coordination", "Impaired thinking", "Reduced reaction time"];
      legalStatus = "Over legal limit - DO NOT DRIVE";
      color = "text-red-600 bg-red-50 border-red-200";
    } else if (bac < 0.15) {
      level = "High Impairment";
      effects = ["Major motor impairment", "Vomiting likely", "Loss of balance", "Serious impairment"];
      legalStatus = "Severely intoxicated - Seek help";
      color = "text-red-700 bg-red-100 border-red-300";
    } else {
      level = "Severe Intoxication";
      effects = ["Potentially life-threatening", "Loss of consciousness possible", "Medical attention needed"];
      legalStatus = "EMERGENCY - Call 911";
      color = "text-red-800 bg-red-200 border-red-400";
    }

    // Time to reach 0.00% BAC (assuming 0.015% metabolism per hour)
    const timeToSober = Math.ceil(bac / 0.015);

    setResult({
      bac: Math.round(bac * 1000) / 1000,
      level,
      effects,
      timeToSober,
      legalStatus,
      color
    });
  };

  const clearCalculation = () => {
    setWeight("");
    setGender("");
    setDrinks("");
    setHours("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-wine-glass text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="bac-title">
              Blood Alcohol Content Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="bac-subtitle">
              Calculate BAC levels for educational purposes and understand alcohol impairment effects
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium text-slate-700 mb-2 block">
                      Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                      placeholder={unit === "metric" ? "70" : "154"}
                      min="1"
                      step="0.1"
                      data-testid="input-weight"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium text-slate-700 mb-2 block">
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={setGender} data-testid="select-gender">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="drinks" className="text-sm font-medium text-slate-700 mb-2 block">
                      Standard Drinks
                    </Label>
                    <Input
                      id="drinks"
                      type="number"
                      value={drinks}
                      onChange={(e) => setDrinks(e.target.value)}
                      className="w-full"
                      placeholder="3"
                      min="0"
                      step="0.5"
                      data-testid="input-drinks"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      1 drink = 12oz beer, 5oz wine, 1.5oz spirits
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="hours" className="text-sm font-medium text-slate-700 mb-2 block">
                      Hours Since First Drink
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full"
                      placeholder="2"
                      min="0"
                      step="0.25"
                      data-testid="input-hours"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateBAC} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight || !gender || !drinks || !hours}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate BAC
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

                {/* Important Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-red-600 mt-1"></i>
                    <div>
                      <p className="text-red-800 font-medium mb-1">Important Disclaimer</p>
                      <p className="text-red-700">
                        This calculator is for educational purposes only. Do not use for determining 
                        fitness to drive. Many factors affect BAC. When in doubt, don't drive.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-line text-accent"></i>
                  <span>BAC Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="bac-results">
                    {/* BAC Level */}
                    <div className={`text-center rounded-2xl p-6 border ${result.color}`}>
                      <h2 className="text-3xl font-bold mb-2" data-testid="bac-level">
                        {result.bac}%
                      </h2>
                      <p className="mb-2">{result.level}</p>
                      <p className="text-sm font-medium">{result.legalStatus}</p>
                    </div>

                    {/* Effects */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800">Expected Effects:</h4>
                      <ul className="space-y-2">
                        {result.effects.map((effect, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <i className="fas fa-dot-circle text-slate-400 mt-1 text-xs"></i>
                            <span className="text-slate-700">{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Time to Sober */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Time to Reach 0.00% BAC</h4>
                      <div className="text-2xl font-bold text-blue-600" data-testid="time-to-sober">
                        {result.timeToSober} hour{result.timeToSober !== 1 ? 's' : ''}
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on average metabolism rate of 0.015% per hour
                      </p>
                    </div>

                    {/* BAC Scale */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">BAC Impairment Scale:</h4>
                      <div className="space-y-2 text-sm">
                        <div className={`p-2 rounded border ${result.bac < 0.02 ? 'bg-green-100 border-green-300 font-medium' : 'bg-slate-50'}`}>
                          <span className="font-medium">0.00-0.02%:</span> Minimal impairment
                        </div>
                        <div className={`p-2 rounded border ${result.bac >= 0.02 && result.bac < 0.05 ? 'bg-yellow-100 border-yellow-300 font-medium' : 'bg-slate-50'}`}>
                          <span className="font-medium">0.02-0.05%:</span> Slight impairment
                        </div>
                        <div className={`p-2 rounded border ${result.bac >= 0.05 && result.bac < 0.08 ? 'bg-orange-100 border-orange-300 font-medium' : 'bg-slate-50'}`}>
                          <span className="font-medium">0.05-0.08%:</span> Mild impairment
                        </div>
                        <div className={`p-2 rounded border ${result.bac >= 0.08 && result.bac < 0.10 ? 'bg-red-100 border-red-300 font-medium' : 'bg-slate-50'}`}>
                          <span className="font-medium">0.08-0.10%:</span> Moderate impairment
                        </div>
                        <div className={`p-2 rounded border ${result.bac >= 0.10 ? 'bg-red-200 border-red-400 font-medium' : 'bg-slate-50'}`}>
                          <span className="font-medium">0.10%+:</span> High to severe impairment
                        </div>
                      </div>
                    </div>

                    {/* Safety Reminders */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <h4 className="font-semibold text-yellow-800 mb-3">Safety Reminders</h4>
                      <ul className="space-y-2 text-yellow-700">
                        <li className="flex items-start space-x-2">
                          <i className="fas fa-car text-yellow-600 mt-1"></i>
                          <span>Never drive under the influence of alcohol</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <i className="fas fa-clock text-yellow-600 mt-1"></i>
                          <span>Time is the only way to sober up</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <i className="fas fa-water text-yellow-600 mt-1"></i>
                          <span>Stay hydrated and eat before drinking</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <i className="fas fa-phone text-yellow-600 mt-1"></i>
                          <span>Use rideshare, taxi, or designated driver</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-wine-glass text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your details to calculate Blood Alcohol Content
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
                <CardTitle className="text-lg">Standard Drink Equivalents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">One Standard Drink Contains 14g of Alcohol:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Beer (5% ABV):</span>
                        <span className="font-medium">12 fl oz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wine (12% ABV):</span>
                        <span className="font-medium">5 fl oz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spirits (40% ABV):</span>
                        <span className="font-medium">1.5 fl oz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Malt Liquor (7% ABV):</span>
                        <span className="font-medium">8-9 fl oz</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Factors Affecting BAC</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-weight text-blue-500 mt-1"></i>
                    <span>Body weight and composition</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-venus-mars text-purple-500 mt-1"></i>
                    <span>Gender (women typically have higher BAC)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-utensils text-green-500 mt-1"></i>
                    <span>Food consumption before/during drinking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-pills text-orange-500 mt-1"></i>
                    <span>Medications and health conditions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tachometer-alt text-red-500 mt-1"></i>
                    <span>Rate of alcohol consumption</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Info */}
          <div className="mt-8">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Alcohol Poisoning Emergency Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Call 911 if someone shows:</h5>
                    <ul className="space-y-1 text-red-700">
                      <li>• Unconsciousness or cannot be roused</li>
                      <li>• Vomiting while unconscious</li>
                      <li>• Slow or irregular breathing</li>
                      <li>• Blue lips or fingernails</li>
                      <li>• Low body temperature</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">While waiting for help:</h5>
                    <ul className="space-y-1 text-red-700">
                      <li>• Keep person awake and sitting up</li>
                      <li>• Give them water if conscious</li>
                      <li>• Keep them warm</li>
                      <li>• Do not leave them alone</li>
                      <li>• Be prepared to perform CPR</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Stay Safe & Have Fun!</h3>
                <p className="mb-4 text-yellow-100">
                  Enjoy a laugh while staying responsible - check out our joke generator!
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