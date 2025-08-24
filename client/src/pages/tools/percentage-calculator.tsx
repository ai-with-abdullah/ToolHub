import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PercentageCalculator() {
  // Basic percentage calculation
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [percentResult, setPercentResult] = useState<number | null>(null);

  // Percentage increase/decrease
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [changeResult, setChangeResult] = useState<{percentage: number, change: number, type: string} | null>(null);

  // Find value from percentage
  const [wholeValue, setWholeValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [partResult, setPartResult] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Percentage Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free percentage calculator. Calculate percentages, percentage increase/decrease, and find values from percentages.');
    }
  }, []);

  const calculateBasicPercentage = () => {
    if (!value1 || !value2) return;
    const result = (parseFloat(value1) / parseFloat(value2)) * 100;
    setPercentResult(Math.round(result * 100) / 100);
  };

  const calculatePercentageChange = () => {
    if (!originalValue || !newValue) return;
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    const change = newVal - original;
    const percentChange = (change / original) * 100;
    const type = change >= 0 ? "increase" : "decrease";
    
    setChangeResult({
      percentage: Math.round(Math.abs(percentChange) * 100) / 100,
      change: Math.round(Math.abs(change) * 100) / 100,
      type
    });
  };

  const calculatePartFromPercentage = () => {
    if (!wholeValue || !percentage) return;
    const result = (parseFloat(percentage) / 100) * parseFloat(wholeValue);
    setPartResult(Math.round(result * 100) / 100);
  };

  const clearAll = () => {
    setValue1("");
    setValue2("");
    setOriginalValue("");
    setNewValue("");
    setWholeValue("");
    setPercentage("");
    setPercentResult(null);
    setChangeResult(null);
    setPartResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-percentage text-purple-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="percentage-calc-title">
              Percentage Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="percentage-calc-subtitle">
              Calculate percentages, percentage changes, and find values from percentages
            </p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Percentage</TabsTrigger>
              <TabsTrigger value="change">Percentage Change</TabsTrigger>
              <TabsTrigger value="value">Find Value</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-calculator text-primary"></i>
                    <span>What percentage is X of Y?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="value1" className="text-sm font-medium text-slate-700 mb-2 block">
                        Value (X)
                      </Label>
                      <Input
                        id="value1"
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        className="w-full text-lg"
                        placeholder="25"
                        data-testid="input-value1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value2" className="text-sm font-medium text-slate-700 mb-2 block">
                        Total (Y)
                      </Label>
                      <Input
                        id="value2"
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        className="w-full text-lg"
                        placeholder="100"
                        data-testid="input-value2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateBasicPercentage} 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={!value1 || !value2}
                    data-testid="button-calculate-basic"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Percentage
                  </Button>

                  {percentResult !== null && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center" data-testid="basic-result">
                      <h3 className="text-3xl font-bold mb-2">{percentResult}%</h3>
                      <p className="text-purple-100">
                        {value1} is {percentResult}% of {value2}
                      </p>
                      <div className="mt-4 text-sm text-purple-100">
                        Formula: ({value1} ÷ {value2}) × 100 = {percentResult}%
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="change">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-chart-line text-green-600"></i>
                    <span>Percentage Increase/Decrease</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="originalValue" className="text-sm font-medium text-slate-700 mb-2 block">
                        Original Value
                      </Label>
                      <Input
                        id="originalValue"
                        type="number"
                        value={originalValue}
                        onChange={(e) => setOriginalValue(e.target.value)}
                        className="w-full text-lg"
                        placeholder="100"
                        data-testid="input-original"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newValue" className="text-sm font-medium text-slate-700 mb-2 block">
                        New Value
                      </Label>
                      <Input
                        id="newValue"
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="w-full text-lg"
                        placeholder="120"
                        data-testid="input-new"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculatePercentageChange} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!originalValue || !newValue}
                    data-testid="button-calculate-change"
                  >
                    <i className="fas fa-chart-line mr-2"></i>
                    Calculate Change
                  </Button>

                  {changeResult && (
                    <div className={`rounded-2xl p-6 text-white text-center ${changeResult.type === 'increase' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`} data-testid="change-result">
                      <h3 className="text-3xl font-bold mb-2">
                        {changeResult.percentage}% {changeResult.type}
                      </h3>
                      <p className="mb-4">
                        {changeResult.type === 'increase' ? 'Increased' : 'Decreased'} by {changeResult.change}
                      </p>
                      <div className="text-sm opacity-90">
                        From {originalValue} to {newValue}
                      </div>
                      <div className="mt-4 text-sm opacity-75">
                        Formula: (({newValue} - {originalValue}) ÷ {originalValue}) × 100
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="value">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-search text-orange-600"></i>
                    <span>Find Value from Percentage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="percentage" className="text-sm font-medium text-slate-700 mb-2 block">
                        Percentage (%)
                      </Label>
                      <Input
                        id="percentage"
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="w-full text-lg"
                        placeholder="25"
                        data-testid="input-percentage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wholeValue" className="text-sm font-medium text-slate-700 mb-2 block">
                        Whole Value
                      </Label>
                      <Input
                        id="wholeValue"
                        type="number"
                        value={wholeValue}
                        onChange={(e) => setWholeValue(e.target.value)}
                        className="w-full text-lg"
                        placeholder="200"
                        data-testid="input-whole"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculatePartFromPercentage} 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={!percentage || !wholeValue}
                    data-testid="button-calculate-value"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Find Value
                  </Button>

                  {partResult !== null && (
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center" data-testid="value-result">
                      <h3 className="text-3xl font-bold mb-2">{partResult}</h3>
                      <p className="text-orange-100">
                        {percentage}% of {wholeValue} is {partResult}
                      </p>
                      <div className="mt-4 text-sm text-orange-100">
                        Formula: ({percentage} ÷ 100) × {wholeValue} = {partResult}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Button 
              onClick={clearAll} 
              variant="outline"
              className="px-8"
              data-testid="button-clear-all"
            >
              <i className="fas fa-trash-alt mr-2"></i>
              Clear All
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Percentage Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Basic Percentage:</h5>
                    <p className="bg-slate-50 p-2 rounded font-mono text-xs">
                      (Part ÷ Whole) × 100 = Percentage
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Percentage Change:</h5>
                    <p className="bg-slate-50 p-2 rounded font-mono text-xs">
                      ((New - Old) ÷ Old) × 100 = % Change
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Find Value:</h5>
                    <p className="bg-slate-50 p-2 rounded font-mono text-xs">
                      (Percentage ÷ 100) × Whole = Part
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-shopping-cart text-green-500 mt-1"></i>
                    <span>Calculate discounts and sales</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-chart-line text-blue-500 mt-1"></i>
                    <span>Track progress and growth</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-percent text-purple-500 mt-1"></i>
                    <span>Calculate tips and gratuities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-graduation-cap text-orange-500 mt-1"></i>
                    <span>Grade and score calculations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-coins text-yellow-500 mt-1"></i>
                    <span>Interest and financial calculations</span>
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