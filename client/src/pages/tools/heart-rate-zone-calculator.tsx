import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeartRateZone {
  name: string;
  range: { min: number; max: number };
  percentage: string;
  description: string;
  benefits: string;
  color: string;
}

interface HeartRateResult {
  maxHeartRate: number;
  restingHeartRate: number;
  zones: HeartRateZone[];
}

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [method, setMethod] = useState("karvonen");
  const [result, setResult] = useState<HeartRateResult | null>(null);

  useEffect(() => {
    document.title = "Heart Rate Zone Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your heart rate training zones for optimal workout intensity. Free heart rate zone calculator with Karvonen and age-based methods.');
    }
  }, []);

  const calculateHeartRateZones = () => {
    if (!age) return;

    const ageNum = parseInt(age);
    const restingHRNum = restingHR ? parseInt(restingHR) : 60; // Default resting HR if not provided
    
    // Calculate Maximum Heart Rate
    const maxHR = 220 - ageNum;

    let zones: HeartRateZone[] = [];

    if (method === "karvonen" && restingHR) {
      // Karvonen Formula: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR
      const hrReserve = maxHR - restingHRNum;
      
      zones = [
        {
          name: "Recovery Zone",
          range: {
            min: Math.round(hrReserve * 0.50 + restingHRNum),
            max: Math.round(hrReserve * 0.60 + restingHRNum)
          },
          percentage: "50-60%",
          description: "Very light activity",
          benefits: "Active recovery, warm-up, cool-down",
          color: "bg-blue-500"
        },
        {
          name: "Base Endurance",
          range: {
            min: Math.round(hrReserve * 0.60 + restingHRNum),
            max: Math.round(hrReserve * 0.70 + restingHRNum)
          },
          percentage: "60-70%",
          description: "Light aerobic exercise",
          benefits: "Fat burning, basic endurance building",
          color: "bg-green-500"
        },
        {
          name: "Aerobic Zone",
          range: {
            min: Math.round(hrReserve * 0.70 + restingHRNum),
            max: Math.round(hrReserve * 0.80 + restingHRNum)
          },
          percentage: "70-80%",
          description: "Moderate aerobic exercise",
          benefits: "Cardiovascular fitness, endurance improvement",
          color: "bg-yellow-500"
        },
        {
          name: "Lactate Threshold",
          range: {
            min: Math.round(hrReserve * 0.80 + restingHRNum),
            max: Math.round(hrReserve * 0.90 + restingHRNum)
          },
          percentage: "80-90%",
          description: "Hard aerobic exercise",
          benefits: "Lactate threshold improvement, race pace training",
          color: "bg-orange-500"
        },
        {
          name: "VO2 Max Zone",
          range: {
            min: Math.round(hrReserve * 0.90 + restingHRNum),
            max: Math.round(hrReserve * 1.00 + restingHRNum)
          },
          percentage: "90-100%",
          description: "Maximum effort",
          benefits: "Maximum oxygen uptake, anaerobic capacity",
          color: "bg-red-500"
        }
      ];
    } else {
      // Age-based formula (simpler method)
      zones = [
        {
          name: "Recovery Zone",
          range: {
            min: Math.round(maxHR * 0.50),
            max: Math.round(maxHR * 0.60)
          },
          percentage: "50-60%",
          description: "Very light activity",
          benefits: "Active recovery, warm-up, cool-down",
          color: "bg-blue-500"
        },
        {
          name: "Fat Burn Zone",
          range: {
            min: Math.round(maxHR * 0.60),
            max: Math.round(maxHR * 0.70)
          },
          percentage: "60-70%",
          description: "Light aerobic exercise",
          benefits: "Fat burning, basic endurance building",
          color: "bg-green-500"
        },
        {
          name: "Cardio Zone",
          range: {
            min: Math.round(maxHR * 0.70),
            max: Math.round(maxHR * 0.80)
          },
          percentage: "70-80%",
          description: "Moderate aerobic exercise",
          benefits: "Cardiovascular fitness improvement",
          color: "bg-yellow-500"
        },
        {
          name: "Anaerobic Zone",
          range: {
            min: Math.round(maxHR * 0.80),
            max: Math.round(maxHR * 0.90)
          },
          percentage: "80-90%",
          description: "Hard anaerobic exercise",
          benefits: "Performance improvement, lactate tolerance",
          color: "bg-orange-500"
        },
        {
          name: "Red Line Zone",
          range: {
            min: Math.round(maxHR * 0.90),
            max: Math.round(maxHR * 1.00)
          },
          percentage: "90-100%",
          description: "Maximum effort",
          benefits: "Maximum capacity, short burst training",
          color: "bg-red-500"
        }
      ];
    }

    setResult({
      maxHeartRate: maxHR,
      restingHeartRate: restingHRNum,
      zones
    });
  };

  const clearCalculation = () => {
    setAge("");
    setRestingHR("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-heartbeat text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="hr-zone-title">
              Heart Rate Zone Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="hr-zone-subtitle">
              Calculate your heart rate training zones for optimal workout intensity and performance
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
                  <Label htmlFor="restingHR" className="text-sm font-medium text-slate-700 mb-2 block">
                    Resting Heart Rate (BPM) <span className="text-gray-500">[Optional for better accuracy]</span>
                  </Label>
                  <Input
                    id="restingHR"
                    type="number"
                    value={restingHR}
                    onChange={(e) => setRestingHR(e.target.value)}
                    className="w-full text-lg"
                    placeholder="60"
                    min="30"
                    max="120"
                    data-testid="input-resting-hr"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Measure your resting HR first thing in the morning while still lying down
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Calculation Method
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="karvonen"
                        value="karvonen"
                        checked={method === "karvonen"}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-4 h-4"
                        data-testid="radio-karvonen"
                      />
                      <Label htmlFor="karvonen" className="text-sm">
                        Karvonen Formula (More Accurate - requires resting HR)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="age-based"
                        value="age-based"
                        checked={method === "age-based"}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-4 h-4"
                        data-testid="radio-age-based"
                      />
                      <Label htmlFor="age-based" className="text-sm">
                        Age-Based Formula (Simple method)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateHeartRateZones} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!age || (method === "karvonen" && !restingHR)}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Zones
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

                {/* How to Measure Resting HR */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">How to Measure Resting Heart Rate</span>
                  </div>
                  <ul className="text-blue-700 space-y-1 text-xs">
                    <li>• Measure first thing in the morning before getting up</li>
                    <li>• Use your index and middle fingers on your wrist or neck</li>
                    <li>• Count beats for 60 seconds (or 15 seconds × 4)</li>
                    <li>• Take measurements for 3-5 days and use the average</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Your Heart Rate Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="hr-zone-results">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="text-2xl font-bold text-red-600" data-testid="max-hr">
                          {result.maxHeartRate} BPM
                        </div>
                        <div className="text-sm text-red-700">Max Heart Rate</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600" data-testid="resting-hr">
                          {result.restingHeartRate} BPM
                        </div>
                        <div className="text-sm text-blue-700">Resting Heart Rate</div>
                      </div>
                    </div>

                    {/* Heart Rate Zones */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800">Training Zones:</h4>
                      
                      <div className="space-y-3">
                        {result.zones.map((zone, index) => (
                          <div key={index} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 ${zone.color} rounded`}></div>
                                <div>
                                  <h5 className="font-medium text-slate-800">{zone.name}</h5>
                                  <p className="text-sm text-slate-600">{zone.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-slate-800" data-testid={`zone-${index}-range`}>
                                  {zone.range.min}-{zone.range.max} BPM
                                </div>
                                <div className="text-sm text-slate-600">{zone.percentage} Max HR</div>
                              </div>
                            </div>
                            <div className="text-sm text-slate-600 mt-2">
                              <strong>Benefits:</strong> {zone.benefits}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Training Recommendations */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Training Recommendations</h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <div><strong>Beginners:</strong> Focus on zones 1-3 (50-80% max HR)</div>
                        <div><strong>Intermediate:</strong> 80% time in zones 1-3, 20% in zones 4-5</div>
                        <div><strong>Advanced:</strong> Use all zones based on training periodization</div>
                        <div><strong>Fat Loss:</strong> Spend more time in zones 2-3 (60-80% max HR)</div>
                      </div>
                    </div>

                    {/* Important Safety Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Safety Guidelines</p>
                          <ul className="text-yellow-700 space-y-1 text-xs">
                            <li>• Always warm up before reaching higher heart rate zones</li>
                            <li>• If you feel dizzy, chest pain, or excessive fatigue, stop immediately</li>
                            <li>• Consider consulting a doctor before starting high-intensity training</li>
                            <li>• Medications can affect heart rate - consult healthcare providers</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-heartbeat text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Information</h3>
                    <p className="text-slate-500">
                      Fill in your age to calculate your heart rate training zones
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
                <CardTitle className="text-lg">Understanding Heart Rate Zones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Zone Training Benefits:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Optimizes workout intensity for specific goals</li>
                      <li>• Prevents overtraining and undertraining</li>
                      <li>• Improves cardiovascular efficiency</li>
                      <li>• Helps track fitness improvements over time</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Monitoring Tools:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Heart rate monitors (chest strap most accurate)</li>
                      <li>• Fitness watches and smartwatches</li>
                      <li>• Gym equipment with built-in HR sensors</li>
                      <li>• Smartphone apps with camera-based detection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Factors Affecting Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-thermometer-half text-red-500 mt-1"></i>
                    <span>Temperature and humidity levels</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-pills text-blue-500 mt-1"></i>
                    <span>Medications (beta-blockers, stimulants)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-coffee text-orange-500 mt-1"></i>
                    <span>Caffeine and alcohol consumption</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bed text-purple-500 mt-1"></i>
                    <span>Sleep quality and stress levels</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mountain text-green-500 mt-1"></i>
                    <span>Altitude and fitness level</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Heart Rate Training Planned!</h3>
                <p className="mb-4 text-yellow-100">
                  Time for a quick laugh before your next workout session!
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