import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProteinResult {
  rda: number;
  activeLifestyle: number;
  athleticTraining: number;
  muscleBuilding: number;
  weightLoss: number;
  recommended: number;
  perKg: number;
  mealDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
}

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [age, setAge] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<ProteinResult | null>(null);

  useEffect(() => {
    document.title = "Protein Intake Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your daily protein intake needs based on weight, activity level, and fitness goals. Free protein calculator for optimal nutrition.');
    }
  }, []);

  const calculateProteinIntake = () => {
    if (!weight || !activityLevel || !goal || !age) return;

    let weightKg = parseFloat(weight);
    const ageNum = parseInt(age);

    // Convert weight to kg if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592;
    }

    // RDA (Recommended Dietary Allowance) - minimum for health
    let rda = weightKg * 0.8; // 0.8g per kg body weight

    // Adjust RDA for older adults (higher protein needs)
    if (ageNum >= 65) {
      rda = weightKg * 1.0; // 1.0g per kg for older adults
    }

    // Activity-based recommendations
    let activeLifestyle: number;
    let athleticTraining: number;
    let muscleBuilding: number;
    let weightLoss: number;
    let recommended: number;

    switch (activityLevel) {
      case "sedentary":
        activeLifestyle = weightKg * 1.0;
        athleticTraining = weightKg * 1.2;
        muscleBuilding = weightKg * 1.4;
        weightLoss = weightKg * 1.2;
        break;
      case "light":
        activeLifestyle = weightKg * 1.2;
        athleticTraining = weightKg * 1.4;
        muscleBuilding = weightKg * 1.6;
        weightLoss = weightKg * 1.4;
        break;
      case "moderate":
        activeLifestyle = weightKg * 1.4;
        athleticTraining = weightKg * 1.6;
        muscleBuilding = weightKg * 1.8;
        weightLoss = weightKg * 1.6;
        break;
      case "active":
        activeLifestyle = weightKg * 1.6;
        athleticTraining = weightKg * 1.8;
        muscleBuilding = weightKg * 2.0;
        weightLoss = weightKg * 1.8;
        break;
      case "very_active":
        activeLifestyle = weightKg * 1.8;
        athleticTraining = weightKg * 2.0;
        muscleBuilding = weightKg * 2.2;
        weightLoss = weightKg * 2.0;
        break;
      default:
        activeLifestyle = weightKg * 1.2;
        athleticTraining = weightKg * 1.6;
        muscleBuilding = weightKg * 1.8;
        weightLoss = weightKg * 1.4;
    }

    // Select recommended intake based on goal
    switch (goal) {
      case "general_health":
        recommended = activeLifestyle;
        break;
      case "weight_loss":
        recommended = weightLoss;
        break;
      case "muscle_gain":
        recommended = muscleBuilding;
        break;
      case "athletic_performance":
        recommended = athleticTraining;
        break;
      default:
        recommended = activeLifestyle;
    }

    // Meal distribution (based on optimal protein synthesis)
    const mealDistribution = {
      breakfast: Math.round(recommended * 0.25),
      lunch: Math.round(recommended * 0.30),
      dinner: Math.round(recommended * 0.30),
      snacks: Math.round(recommended * 0.15)
    };

    setResult({
      rda: Math.round(rda),
      activeLifestyle: Math.round(activeLifestyle),
      athleticTraining: Math.round(athleticTraining),
      muscleBuilding: Math.round(muscleBuilding),
      weightLoss: Math.round(weightLoss),
      recommended: Math.round(recommended),
      perKg: Math.round((recommended / weightKg) * 100) / 100,
      mealDistribution
    });
  };

  const clearCalculation = () => {
    setWeight("");
    setActivityLevel("");
    setGoal("");
    setAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-drumstick-bite text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="protein-calc-title">
              Protein Intake Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="protein-calc-subtitle">
              Calculate your daily protein needs based on weight, activity level, and fitness goals
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
                    Primary Goal
                  </Label>
                  <Select value={goal} onValueChange={setGoal} data-testid="select-goal">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general_health">General Health & Maintenance</SelectItem>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle_gain">Muscle Building</SelectItem>
                      <SelectItem value="athletic_performance">Athletic Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateProteinIntake} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight || !activityLevel || !goal || !age}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Protein Needs
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

                {/* Protein Benefits */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Why Protein Matters</span>
                  </div>
                  <ul className="text-blue-700 space-y-1 text-xs">
                    <li>• Builds and repairs muscle tissue</li>
                    <li>• Supports immune system function</li>
                    <li>• Helps maintain healthy weight</li>
                    <li>• Provides sustained energy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Your Protein Needs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="protein-results">
                    {/* Recommended Intake */}
                    <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="recommended-protein">
                        {result.recommended}g
                      </h2>
                      <p className="text-blue-100 mb-1">Daily Protein Goal</p>
                      <p className="text-sm text-blue-200">{result.perKg}g per kg body weight</p>
                    </div>

                    {/* Different Scenarios */}
                    <Tabs defaultValue="scenarios" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="scenarios">By Goal</TabsTrigger>
                        <TabsTrigger value="meals">Meal Distribution</TabsTrigger>
                      </TabsList>

                      <TabsContent value="scenarios" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">RDA Minimum</div>
                              <div className="text-sm text-slate-600">Basic health requirements</div>
                            </div>
                            <div className="text-lg font-bold text-slate-600" data-testid="rda-protein">
                              {result.rda}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Active Lifestyle</div>
                              <div className="text-sm text-slate-600">Regular exercise routine</div>
                            </div>
                            <div className="text-lg font-bold text-green-600" data-testid="active-protein">
                              {result.activeLifestyle}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Weight Loss</div>
                              <div className="text-sm text-slate-600">Preserve muscle while losing fat</div>
                            </div>
                            <div className="text-lg font-bold text-orange-600" data-testid="weightloss-protein">
                              {result.weightLoss}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Muscle Building</div>
                              <div className="text-sm text-slate-600">Maximum muscle protein synthesis</div>
                            </div>
                            <div className="text-lg font-bold text-purple-600" data-testid="muscle-protein">
                              {result.muscleBuilding}g
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <div>
                              <div className="font-medium text-slate-800">Athletic Training</div>
                              <div className="text-sm text-slate-600">High performance athletes</div>
                            </div>
                            <div className="text-lg font-bold text-red-600" data-testid="athletic-protein">
                              {result.athleticTraining}g
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="meals" className="space-y-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-800">Optimal Distribution:</h4>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                              <div className="text-xl font-bold text-yellow-600" data-testid="breakfast-protein">
                                {result.mealDistribution.breakfast}g
                              </div>
                              <div className="text-sm text-yellow-700">Breakfast (25%)</div>
                            </div>
                            
                            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                              <div className="text-xl font-bold text-green-600" data-testid="lunch-protein">
                                {result.mealDistribution.lunch}g
                              </div>
                              <div className="text-sm text-green-700">Lunch (30%)</div>
                            </div>
                            
                            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                              <div className="text-xl font-bold text-blue-600" data-testid="dinner-protein">
                                {result.mealDistribution.dinner}g
                              </div>
                              <div className="text-sm text-blue-700">Dinner (30%)</div>
                            </div>
                            
                            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                              <div className="text-xl font-bold text-purple-600" data-testid="snacks-protein">
                                {result.mealDistribution.snacks}g
                              </div>
                              <div className="text-sm text-purple-700">Snacks (15%)</div>
                            </div>
                          </div>

                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-semibold text-green-800 mb-3">Protein Timing Tips</h4>
                            <ul className="space-y-2 text-sm text-green-700">
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-sun text-green-600 mt-1"></i>
                                <span>Start day with protein-rich breakfast</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-dumbbell text-green-600 mt-1"></i>
                                <span>Consume 20-30g protein within 2 hours post-workout</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-bed text-green-600 mt-1"></i>
                                <span>Include protein in evening meal for overnight recovery</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-clock text-green-600 mt-1"></i>
                                <span>Space protein intake evenly throughout the day</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Important Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Individual Needs May Vary</p>
                          <p className="text-yellow-700">
                            These are general recommendations. Factors like genetics, health conditions, 
                            and specific training goals may affect your protein needs. Consult a 
                            nutritionist for personalized advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-drumstick-bite text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your details to calculate your daily protein needs
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
                <CardTitle className="text-lg">High-Quality Protein Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Complete Proteins (all essential amino acids):</h5>
                    <ul className="space-y-1 ml-4">
                      <li><strong>Animal:</strong> Chicken, fish, eggs, dairy, beef</li>
                      <li><strong>Plant:</strong> Quinoa, soy, chia seeds, hemp seeds</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">High-Protein Foods (per serving):</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Chicken breast (100g):</span>
                        <span className="font-medium">31g protein</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Greek yogurt (1 cup):</span>
                        <span className="font-medium">20g protein</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eggs (2 large):</span>
                        <span className="font-medium">12g protein</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lentils (1 cup cooked):</span>
                        <span className="font-medium">18g protein</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Protein Myths vs Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ Myth:</h5>
                    <p className="mb-2">More protein is always better</p>
                    <h5 className="font-medium text-green-600 mb-1">✅ Fact:</h5>
                    <p>Excess protein doesn't provide additional benefits and may stress kidneys</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ Myth:</h5>
                    <p className="mb-2">Plant proteins are incomplete</p>
                    <h5 className="font-medium text-green-600 mb-1">✅ Fact:</h5>
                    <p>Many plant foods contain all essential amino acids</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ Myth:</h5>
                    <p className="mb-2">You must eat protein immediately after workout</p>
                    <h5 className="font-medium text-green-600 mb-1">✅ Fact:</h5>
                    <p>The "anabolic window" is 24+ hours, not 30 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Protein Goals Set!</h3>
                <p className="mb-4 text-yellow-100">
                  Ready to fuel your body? Take a quick laugh break first!
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