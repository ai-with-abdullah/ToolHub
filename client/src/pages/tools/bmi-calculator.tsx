import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
  healthyMin: number;
  healthyMax: number;
  weightStatus: string;
}

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BMIResult | null>(null);

  useEffect(() => {
    document.title = "BMI Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your Body Mass Index (BMI) and get health insights. Free BMI calculator with metric and imperial units. Understand your weight status.');
    }
  }, []);

  const getBMICategory = (bmi: number): { category: string; color: string; status: string } => {
    if (bmi < 18.5) {
      return { category: "Underweight", color: "text-blue-600 bg-blue-50 border-blue-200", status: "Below normal weight" };
    } else if (bmi >= 18.5 && bmi < 25) {
      return { category: "Normal weight", color: "text-green-600 bg-green-50 border-green-200", status: "Healthy weight range" };
    } else if (bmi >= 25 && bmi < 30) {
      return { category: "Overweight", color: "text-orange-600 bg-orange-50 border-orange-200", status: "Above normal weight" };
    } else {
      return { category: "Obese", color: "text-red-600 bg-red-50 border-red-200", status: "Significantly above normal weight" };
    }
  };

  const calculateBMI = () => {
    if (!weight || !height) return;

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    // Convert units if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightM = heightM * 0.0254; // inches to meters
    } else {
      heightM = heightM / 100; // cm to meters
    }

    const bmi = weightKg / (heightM * heightM);
    const categoryInfo = getBMICategory(bmi);
    
    // Calculate healthy weight range
    const healthyMinWeight = unit === "imperial" 
      ? Math.round((18.5 * heightM * heightM) / 0.453592) 
      : Math.round(18.5 * heightM * heightM);
    const healthyMaxWeight = unit === "imperial" 
      ? Math.round((24.9 * heightM * heightM) / 0.453592) 
      : Math.round(24.9 * heightM * heightM);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category: categoryInfo.category,
      categoryColor: categoryInfo.color,
      healthyMin: healthyMinWeight,
      healthyMax: healthyMaxWeight,
      weightStatus: categoryInfo.status
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-weight text-accent text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="bmi-calc-title">
              BMI Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="bmi-calc-subtitle">
              Calculate your Body Mass Index and get health insights based on your measurements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-ruler-combined text-primary"></i>
                  <span>Enter Your Measurements</span>
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
                    onClick={calculateBMI} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!weight || !height}
                    data-testid="button-calculate-bmi"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate BMI
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-bmi"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* BMI Scale Info */}
                <div className="bg-slate-50 rounded-xl p-4 text-sm">
                  <h4 className="font-medium text-slate-800 mb-3">BMI Categories:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Underweight</span>
                      <span className="text-slate-600">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Normal weight</span>
                      <span className="text-slate-600">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">Overweight</span>
                      <span className="text-slate-600">25 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Obese</span>
                      <span className="text-slate-600">&ge; 30</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-pie text-accent"></i>
                  <span>Your BMI Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="bmi-results">
                    {/* Main BMI Display */}
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-2" data-testid="bmi-value">
                        {result.bmi}
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-xl border font-semibold ${result.categoryColor}`} data-testid="bmi-category">
                        {result.category}
                      </div>
                    </div>

                    {/* Status Description */}
                    <div className="text-center p-4 bg-slate-50 rounded-xl">
                      <p className="text-slate-700" data-testid="bmi-status">
                        <strong>Status:</strong> {result.weightStatus}
                      </p>
                    </div>

                    {/* Healthy Weight Range */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-heart text-green-600"></i>
                        <span className="font-medium text-green-800">Healthy Weight Range</span>
                      </div>
                      <p className="text-green-700" data-testid="healthy-range">
                        For your height, a healthy weight range is{" "}
                        <strong>
                          {result.healthyMin} - {result.healthyMax} {unit === "metric" ? "kg" : "lbs"}
                        </strong>
                      </p>
                    </div>

                    {/* BMI Scale Visualization */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800">BMI Scale</h4>
                      <div className="relative">
                        <div className="h-6 rounded-full overflow-hidden flex">
                          <div className="bg-blue-400 flex-1"></div>
                          <div className="bg-green-400 flex-1"></div>
                          <div className="bg-orange-400 flex-1"></div>
                          <div className="bg-red-400 flex-1"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mt-1">
                          <span>18.5</span>
                          <span>25</span>
                          <span>30</span>
                          <span>35+</span>
                        </div>
                        <div 
                          className="absolute top-0 w-2 h-6 bg-slate-800 rounded-sm"
                          style={{
                            left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 95)}%`
                          }}
                          data-testid="bmi-indicator"
                        ></div>
                      </div>
                    </div>

                    {/* Health Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Important Note</p>
                          <p className="text-yellow-700">
                            BMI is a general indicator and doesn't account for muscle mass, bone density, or overall body composition. 
                            Consult healthcare professionals for comprehensive health assessment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-weight text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Measurements</h3>
                    <p className="text-slate-500">
                      Enter your weight and height above to calculate your BMI
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
                <CardTitle className="text-lg">Understanding BMI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Body Mass Index (BMI) is a measure that uses height and weight to determine if weight is healthy. 
                    It's calculated by dividing weight by height squared.
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-800">BMI Limitations:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Doesn't distinguish between muscle and fat</li>
                      <li>• May not be accurate for athletes or elderly</li>
                      <li>• Doesn't consider body fat distribution</li>
                      <li>• Age and gender differences not accounted</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Healthy Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-utensils text-green-500 mt-1"></i>
                    <span>Maintain a balanced, nutritious diet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-running text-blue-500 mt-1"></i>
                    <span>Get regular physical activity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bed text-purple-500 mt-1"></i>
                    <span>Ensure adequate sleep</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tint text-cyan-500 mt-1"></i>
                    <span>Stay properly hydrated</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-user-md text-red-500 mt-1"></i>
                    <span>Consult healthcare professionals</span>
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
