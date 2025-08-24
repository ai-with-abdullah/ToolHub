import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MacroResult {
  totalCalories: number;
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fats: { grams: number; calories: number; percentage: number };
  fiber: number;
  water: number;
}

export default function MacroNutrientCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<MacroResult | null>(null);

  useEffect(() => {
    document.title = "Macro Nutrient Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your daily macronutrient needs (protein, carbs, fats) based on your goals and activity level. Free macro calculator.');
    }
  }, []);

  const calculateMacros = () => {
    if (!age || !weight || !height || !gender || !activityLevel) return;

    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    // Convert units if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Adjust calories based on goal
    let targetCalories: number;
    switch (goal) {
      case "lose":
        targetCalories = tdee - 500; // 500 calorie deficit for 1 lb/week loss
        break;
      case "gain":
        targetCalories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default:
        targetCalories = tdee; // maintenance
    }

    // Macro ratios based on goal
    let proteinRatio: number, carbRatio: number, fatRatio: number;
    
    switch (goal) {
      case "lose":
        proteinRatio = 0.30; // Higher protein for muscle preservation
        carbRatio = 0.35;
        fatRatio = 0.35;
        break;
      case "gain":
        proteinRatio = 0.25; // Moderate protein for muscle building
        carbRatio = 0.45;
        fatRatio = 0.30;
        break;
      default: // maintain
        proteinRatio = 0.25;
        carbRatio = 0.45;
        fatRatio = 0.30;
    }

    // Calculate macros
    const proteinCalories = targetCalories * proteinRatio;
    const carbCalories = targetCalories * carbRatio;
    const fatCalories = targetCalories * fatRatio;

    const proteinGrams = proteinCalories / 4; // 4 calories per gram
    const carbGrams = carbCalories / 4; // 4 calories per gram
    const fatGrams = fatCalories / 9; // 9 calories per gram

    // Additional recommendations
    const fiberGrams = Math.max(25, weightKg * 0.4); // 25g minimum or 0.4g per kg
    const waterLiters = weightKg * 0.035; // 35ml per kg

    setResult({
      totalCalories: Math.round(targetCalories),
      protein: {
        grams: Math.round(proteinGrams),
        calories: Math.round(proteinCalories),
        percentage: Math.round(proteinRatio * 100)
      },
      carbs: {
        grams: Math.round(carbGrams),
        calories: Math.round(carbCalories),
        percentage: Math.round(carbRatio * 100)
      },
      fats: {
        grams: Math.round(fatGrams),
        calories: Math.round(fatCalories),
        percentage: Math.round(fatRatio * 100)
      },
      fiber: Math.round(fiberGrams),
      water: Math.round(waterLiters * 100) / 100
    });
  };

  const clearCalculation = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
    setActivityLevel("");
    setGoal("maintain");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-apple-alt text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="macro-calc-title">
              Macro Nutrient Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="macro-calc-subtitle">
              Calculate your daily macronutrient needs (protein, carbs, fats) based on your goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user-cog text-primary"></i>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-slate-700 mb-2 block">
                      Age (years)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full"
                      placeholder="25"
                      min="1"
                      max="120"
                      data-testid="input-age"
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
                  <Label htmlFor="goal" className="text-sm font-medium text-slate-700 mb-2 block">
                    Goal
                  </Label>
                  <Select value={goal} onValueChange={setGoal} data-testid="select-goal">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Weight Loss</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Weight Gain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateMacros} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!age || !weight || !height || !gender || !activityLevel}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Macros
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

                {/* Macro Info */}
                <div className="bg-green-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-green-600"></i>
                    <span className="font-medium text-green-800">Macronutrients</span>
                  </div>
                  <div className="text-green-700 space-y-1 text-xs">
                    <p><strong>Protein:</strong> 4 calories/gram - muscle building & repair</p>
                    <p><strong>Carbs:</strong> 4 calories/gram - primary energy source</p>
                    <p><strong>Fats:</strong> 9 calories/gram - hormone production & absorption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-pie text-accent"></i>
                  <span>Your Daily Macros</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="macro-results">
                    {/* Total Calories */}
                    <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="total-calories">
                        {result.totalCalories} calories
                      </h2>
                      <p className="text-green-100">Daily Target</p>
                    </div>

                    {/* Macro Breakdown */}
                    <Tabs defaultValue="grams" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="grams">Grams</TabsTrigger>
                        <TabsTrigger value="percentages">Percentages</TabsTrigger>
                      </TabsList>

                      <TabsContent value="grams" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-blue-500 rounded"></div>
                              <div>
                                <div className="font-medium text-slate-800">Protein</div>
                                <div className="text-sm text-slate-600">{result.protein.calories} calories</div>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-blue-600" data-testid="protein-grams">
                              {result.protein.grams}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-orange-500 rounded"></div>
                              <div>
                                <div className="font-medium text-slate-800">Carbohydrates</div>
                                <div className="text-sm text-slate-600">{result.carbs.calories} calories</div>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-orange-600" data-testid="carbs-grams">
                              {result.carbs.grams}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-purple-500 rounded"></div>
                              <div>
                                <div className="font-medium text-slate-800">Fats</div>
                                <div className="text-sm text-slate-600">{result.fats.calories} calories</div>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-purple-600" data-testid="fats-grams">
                              {result.fats.grams}g
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="percentages" className="space-y-4">
                        <div className="space-y-4">
                          {/* Visual Bar Chart */}
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Protein</span>
                                <span>{result.protein.percentage}%</span>
                              </div>
                              <div className="h-4 rounded-full overflow-hidden bg-slate-200">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                  style={{width: `${result.protein.percentage}%`}}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Carbohydrates</span>
                                <span>{result.carbs.percentage}%</span>
                              </div>
                              <div className="h-4 rounded-full overflow-hidden bg-slate-200">
                                <div 
                                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                  style={{width: `${result.carbs.percentage}%`}}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Fats</span>
                                <span>{result.fats.percentage}%</span>
                              </div>
                              <div className="h-4 rounded-full overflow-hidden bg-slate-200">
                                <div 
                                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                  style={{width: `${result.fats.percentage}%`}}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Additional Recommendations */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                        <div className="text-xl font-bold text-cyan-600" data-testid="fiber-grams">
                          {result.fiber}g
                        </div>
                        <div className="text-sm text-cyan-700">Daily Fiber</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-xl font-bold text-blue-600" data-testid="water-liters">
                          {result.water}L
                        </div>
                        <div className="text-sm text-blue-700">Daily Water</div>
                      </div>
                    </div>

                    {/* Meal Planning Tips */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 mb-3">Meal Planning Tips</h4>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <div className="flex justify-between">
                          <span>Protein per meal:</span>
                          <span className="font-medium">{Math.round(result.protein.grams / 3)}g (3 meals)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs per meal:</span>
                          <span className="font-medium">{Math.round(result.carbs.grams / 3)}g (3 meals)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fats per meal:</span>
                          <span className="font-medium">{Math.round(result.fats.grams / 3)}g (3 meals)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-apple-alt text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your details to calculate your daily macronutrient needs
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
                <CardTitle className="text-lg">Food Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Protein Sources:</h5>
                    <p>Chicken, fish, eggs, Greek yogurt, beans, lentils, tofu, quinoa</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-800 mb-2">Carbohydrate Sources:</h5>
                    <p>Oats, brown rice, sweet potatoes, fruits, vegetables, whole grains</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Healthy Fat Sources:</h5>
                    <p>Avocados, nuts, olive oil, salmon, chia seeds, coconut oil</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Macro Timing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-sun text-yellow-500 mt-1"></i>
                    <span>Start day with protein and healthy fats</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-dumbbell text-blue-500 mt-1"></i>
                    <span>Consume carbs around workouts for energy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bed text-purple-500 mt-1"></i>
                    <span>Lighter carbs in evening, focus on protein</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-green-500 mt-1"></i>
                    <span>Spread protein intake throughout the day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-balance-scale text-orange-500 mt-1"></i>
                    <span>Balance macros in each meal when possible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Nutrition Planning Done!</h3>
                <p className="mb-4 text-yellow-100">
                  Take a break and enjoy a good laugh while you prep your meals!
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