import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BMRResult {
  bmr: number;
  maintenanceCalories: number;
  lightActivity: number;
  moderateActivity: number;
  heavyActivity: number;
  extremeActivity: number;
}

export default function BmrCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BMRResult | null>(null);

  useEffect(() => {
    document.title = "BMR Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs. Free BMR calculator with activity level multipliers.');
    }
  }, []);

  const calculateBMR = () => {
    if (!age || !weight || !height || !gender) return;

    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    // Convert units if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    let bmr: number;

    // Mifflin-St Jeor Equation
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
    }

    // Activity level multipliers
    const sedentary = bmr * 1.2; // Little or no exercise
    const lightActivity = bmr * 1.375; // Light exercise 1-3 days/week
    const moderateActivity = bmr * 1.55; // Moderate exercise 3-5 days/week
    const heavyActivity = bmr * 1.725; // Heavy exercise 6-7 days/week
    const extremeActivity = bmr * 1.9; // Very heavy exercise, physical job

    setResult({
      bmr: Math.round(bmr),
      maintenanceCalories: Math.round(sedentary),
      lightActivity: Math.round(lightActivity),
      moderateActivity: Math.round(moderateActivity),
      heavyActivity: Math.round(heavyActivity),
      extremeActivity: Math.round(extremeActivity)
    });
  };

  const clearCalculation = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-fire text-orange-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="bmr-calc-title">
              BMR Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="bmr-calc-subtitle">
              Calculate your Basal Metabolic Rate and daily calorie needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user-cog text-primary"></i>
                  <span>Enter Your Details</span>
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
                  <Label htmlFor="age" className="text-sm font-medium text-slate-700 mb-2 block">
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full text-lg"
                    placeholder="25"
                    min="1"
                    max="120"
                    data-testid="input-age"
                  />
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
                    onClick={calculateBMR} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!age || !weight || !height || !gender}
                    data-testid="button-calculate-bmr"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate BMR
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-bmr"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Formula Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Formula Used</span>
                  </div>
                  <p className="text-blue-700">
                    Mifflin-St Jeor Equation: Most accurate for modern lifestyles.<br/>
                    <strong>Men:</strong> BMR = 10×weight + 6.25×height - 5×age + 5<br/>
                    <strong>Women:</strong> BMR = 10×weight + 6.25×height - 5×age - 161
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Your BMR Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="bmr-results">
                    {/* Main BMR Display */}
                    <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="bmr-value">
                        {result.bmr} calories/day
                      </h2>
                      <p className="text-orange-100">Your Basal Metabolic Rate</p>
                    </div>

                    {/* Activity Level Breakdown */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Daily Calorie Needs by Activity Level:</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Sedentary</div>
                            <div className="text-sm text-slate-600">Little or no exercise</div>
                          </div>
                          <div className="text-lg font-bold text-primary" data-testid="sedentary-calories">
                            {result.maintenanceCalories} cal
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Light Activity</div>
                            <div className="text-sm text-slate-600">Light exercise 1-3 days/week</div>
                          </div>
                          <div className="text-lg font-bold text-green-600" data-testid="light-calories">
                            {result.lightActivity} cal
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Moderate Activity</div>
                            <div className="text-sm text-slate-600">Moderate exercise 3-5 days/week</div>
                          </div>
                          <div className="text-lg font-bold text-orange-600" data-testid="moderate-calories">
                            {result.moderateActivity} cal
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Heavy Activity</div>
                            <div className="text-sm text-slate-600">Heavy exercise 6-7 days/week</div>
                          </div>
                          <div className="text-lg font-bold text-red-600" data-testid="heavy-calories">
                            {result.heavyActivity} cal
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-800">Extreme Activity</div>
                            <div className="text-sm text-slate-600">Very heavy exercise, physical job</div>
                          </div>
                          <div className="text-lg font-bold text-purple-600" data-testid="extreme-calories">
                            {result.extremeActivity} cal
                          </div>
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
                            BMR represents calories burned at rest. Add activity calories for total daily needs. 
                            Consult healthcare professionals for personalized nutrition advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-fire text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Details</h3>
                    <p className="text-slate-500">
                      Fill in your information above to calculate your BMR
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
                <CardTitle className="text-lg">What is BMR?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic physiological functions while at rest.
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-800">BMR includes energy for:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Breathing and circulation</li>
                      <li>• Cell production and repair</li>
                      <li>• Brain and nerve functions</li>
                      <li>• Protein synthesis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Factors Affecting BMR</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-user text-blue-500 mt-1"></i>
                    <span>Age, gender, and genetics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-dumbbell text-green-500 mt-1"></i>
                    <span>Muscle mass and body composition</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-thermometer-half text-red-500 mt-1"></i>
                    <span>Climate and body temperature</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-pills text-purple-500 mt-1"></i>
                    <span>Hormones and medications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-utensils text-orange-500 mt-1"></i>
                    <span>Diet and eating patterns</span>
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