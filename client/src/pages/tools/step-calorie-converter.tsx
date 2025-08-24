import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StepCalorieResult {
  steps: number;
  calories: number;
  distance: number;
  duration: number;
  caloriesPerStep: number;
  weeklyGoal: number;
  monthlyGoal: number;
}

export default function StepCalorieConverter() {
  const [inputType, setInputType] = useState("steps");
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [pace, setPace] = useState("moderate");
  const [result, setResult] = useState<StepCalorieResult | null>(null);

  useEffect(() => {
    document.title = "Step to Calorie Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert steps to calories burned or calories to steps needed. Free step counter and calorie converter with distance calculations.');
    }
  }, []);

  const calculateStepsCalories = () => {
    if (!weight || !height) return;

    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    // Convert units if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    // Calculate stride length based on height
    const strideLength = heightCm * 0.43; // cm, approximate formula

    // Pace multipliers for calories burned
    const paceMultipliers = {
      slow: 0.04,      // 2 mph
      moderate: 0.045, // 3 mph
      brisk: 0.05,     // 3.5 mph
      fast: 0.055      // 4+ mph
    };

    // Base calories per step calculation
    // Formula: weight(kg) × pace multiplier
    const caloriesPerStep = weightKg * paceMultipliers[pace as keyof typeof paceMultipliers];

    let calculatedSteps: number;
    let calculatedCalories: number;

    if (inputType === "steps") {
      calculatedSteps = parseFloat(steps);
      calculatedCalories = calculatedSteps * caloriesPerStep;
    } else {
      calculatedCalories = parseFloat(calories);
      calculatedSteps = calculatedCalories / caloriesPerStep;
    }

    // Calculate distance
    const distanceMeters = calculatedSteps * (strideLength / 100); // Convert cm to meters
    const distanceKm = distanceMeters / 1000;

    // Calculate duration (assuming average pace)
    const paceMinutesPerKm = {
      slow: 20,      // 3 km/h
      moderate: 16,  // 3.75 km/h
      brisk: 13,     // 4.6 km/h
      fast: 11       // 5.5 km/h
    };

    const duration = distanceKm * paceMinutesPerKm[pace as keyof typeof paceMinutesPerKm];

    // Weekly and monthly goals
    const weeklyGoal = calculatedCalories * 7;
    const monthlyGoal = calculatedCalories * 30;

    setResult({
      steps: Math.round(calculatedSteps),
      calories: Math.round(calculatedCalories * 100) / 100,
      distance: Math.round(distanceKm * 100) / 100,
      duration: Math.round(duration),
      caloriesPerStep: Math.round(caloriesPerStep * 10000) / 10000,
      weeklyGoal: Math.round(weeklyGoal),
      monthlyGoal: Math.round(monthlyGoal)
    });
  };

  const clearCalculation = () => {
    setSteps("");
    setCalories("");
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-walking text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="step-converter-title">
              Step to Calorie Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="step-converter-subtitle">
              Convert steps to calories burned or find how many steps you need for a calorie goal
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user-cog text-primary"></i>
                  <span>Conversion Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="inputType" className="text-sm font-medium text-slate-700 mb-2 block">
                    What would you like to calculate?
                  </Label>
                  <Select value={inputType} onValueChange={setInputType} data-testid="select-input-type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select conversion type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steps">Steps → Calories (I have steps, want calories)</SelectItem>
                      <SelectItem value="calories">Calories → Steps (I have calorie goal, want steps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                    <Label htmlFor="height" className="text-sm font-medium text-slate-700 mb-2 block">
                      Height {unit === "metric" ? "(cm)" : "(inches)"}
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
                      placeholder={unit === "metric" ? "170" : "67"}
                      min="1"
                      step="0.1"
                      data-testid="input-height"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pace" className="text-sm font-medium text-slate-700 mb-2 block">
                    Walking Pace
                  </Label>
                  <Select value={pace} onValueChange={setPace} data-testid="select-pace">
                    <SelectTrigger>
                      <SelectValue placeholder="Select walking pace" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow (2 mph / 3.2 km/h)</SelectItem>
                      <SelectItem value="moderate">Moderate (3 mph / 4.8 km/h)</SelectItem>
                      <SelectItem value="brisk">Brisk (3.5 mph / 5.6 km/h)</SelectItem>
                      <SelectItem value="fast">Fast (4+ mph / 6.4+ km/h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {inputType === "steps" ? (
                  <div>
                    <Label htmlFor="steps" className="text-sm font-medium text-slate-700 mb-2 block">
                      Number of Steps
                    </Label>
                    <Input
                      id="steps"
                      type="number"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      className="w-full text-lg"
                      placeholder="10000"
                      min="1"
                      data-testid="input-steps"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="calories" className="text-sm font-medium text-slate-700 mb-2 block">
                      Target Calories to Burn
                    </Label>
                    <Input
                      id="calories"
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full text-lg"
                      placeholder="300"
                      min="1"
                      step="0.1"
                      data-testid="input-calories"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateStepsCalories} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight || !height || (inputType === "steps" ? !steps : !calories)}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate
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

                {/* Quick Tips */}
                <div className="bg-green-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-lightbulb text-green-600"></i>
                    <span className="font-medium text-green-800">Daily Step Goals</span>
                  </div>
                  <div className="text-green-700 space-y-1 text-xs">
                    <p><strong>Sedentary:</strong> 5,000 steps/day</p>
                    <p><strong>Somewhat Active:</strong> 7,500 steps/day</p>
                    <p><strong>Active:</strong> 10,000 steps/day</p>
                    <p><strong>Highly Active:</strong> 12,500+ steps/day</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-line text-accent"></i>
                  <span>Conversion Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="step-calorie-results">
                    {/* Main Results */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2" data-testid="result-steps">
                          {result.steps.toLocaleString()}
                        </h2>
                        <p className="text-green-100">Steps</p>
                      </div>
                      
                      <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2" data-testid="result-calories">
                          {result.calories}
                        </h2>
                        <p className="text-orange-100">Calories</p>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <Tabs defaultValue="details" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Activity Details</TabsTrigger>
                        <TabsTrigger value="goals">Goals & Projections</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="text-xl font-bold text-blue-600" data-testid="result-distance">
                              {result.distance} km
                            </div>
                            <div className="text-sm text-blue-700">Distance Walked</div>
                          </div>
                          
                          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="text-xl font-bold text-purple-600" data-testid="result-duration">
                              {result.duration} min
                            </div>
                            <div className="text-sm text-purple-700">Estimated Duration</div>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-800 mb-3">Activity Breakdown:</h4>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex justify-between">
                              <span>Calories per step:</span>
                              <span className="font-medium" data-testid="calories-per-step">
                                {result.caloriesPerStep}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Steps per minute:</span>
                              <span className="font-medium">
                                {Math.round(result.steps / result.duration)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Calories per minute:</span>
                              <span className="font-medium">
                                {Math.round((result.calories / result.duration) * 100) / 100}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="goals" className="space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                              <div className="text-xl font-bold text-indigo-600" data-testid="weekly-goal">
                                {result.weeklyGoal}
                              </div>
                              <div className="text-sm text-indigo-700">Weekly Calories</div>
                            </div>
                            
                            <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200">
                              <div className="text-xl font-bold text-pink-600" data-testid="monthly-goal">
                                {result.monthlyGoal}
                              </div>
                              <div className="text-sm text-pink-700">Monthly Calories</div>
                            </div>
                          </div>

                          {/* Weight Loss Potential */}
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-semibold text-green-800 mb-3">Weight Loss Potential</h4>
                            <div className="space-y-2 text-sm text-green-700">
                              <div className="flex justify-between">
                                <span>Weekly (at this daily rate):</span>
                                <span className="font-medium">
                                  {Math.round((result.weeklyGoal / 7700) * 100) / 100} kg
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Monthly (at this daily rate):</span>
                                <span className="font-medium">
                                  {Math.round((result.monthlyGoal / 7700) * 100) / 100} kg
                                </span>
                              </div>
                              <p className="text-xs text-green-600 mt-2">
                                *Based on 7,700 calories = 1 kg fat. Results may vary based on diet and metabolism.
                              </p>
                            </div>
                          </div>

                          {/* Fitness Goals */}
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-800 mb-3">Fitness Milestones</h4>
                            <div className="space-y-2 text-sm text-blue-700">
                              <div className="flex justify-between">
                                <span>Steps to burn 100 calories:</span>
                                <span className="font-medium">
                                  {Math.round(100 / result.caloriesPerStep).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Steps to walk 5km:</span>
                                <span className="font-medium">
                                  {Math.round((5 / result.distance) * result.steps).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Steps for 30-min workout:</span>
                                <span className="font-medium">
                                  {Math.round((30 / result.duration) * result.steps).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Health Benefits */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-heart text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Health Benefits of Walking</p>
                          <ul className="text-yellow-700 space-y-1 text-xs">
                            <li>• Improves cardiovascular health and reduces disease risk</li>
                            <li>• Strengthens bones and muscles, improves balance</li>
                            <li>• Boosts mood and mental health, reduces stress</li>
                            <li>• Helps with weight management and metabolism</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-walking text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your details to convert between steps and calories
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
                <CardTitle className="text-lg">Step Counting Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mobile-alt text-blue-500 mt-1"></i>
                    <span>Use smartphone apps or fitness trackers for accurate counting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-green-500 mt-1"></i>
                    <span>Take regular walking breaks throughout the day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-stairs text-orange-500 mt-1"></i>
                    <span>Take stairs instead of elevators when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-parking text-purple-500 mt-1"></i>
                    <span>Park farther away to add extra steps</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-users text-red-500 mt-1"></i>
                    <span>Walk with friends or family for motivation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Walking for Different Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Weight Loss:</h5>
                    <p>Aim for 10,000+ steps daily with brisk pace (3.5+ mph)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">General Health:</h5>
                    <p>7,500-10,000 steps daily at moderate pace</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Maintenance:</h5>
                    <p>5,000-7,500 steps daily with regular activity</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Athletic Training:</h5>
                    <p>12,500+ steps with varied intensity and pace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Steps Calculated!</h3>
                <p className="mb-4 text-yellow-100">
                  Time for a walking break? Or maybe a quick laugh first!
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