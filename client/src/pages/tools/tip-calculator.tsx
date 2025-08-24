import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  tipPerPerson: number;
}

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("18");
  const [customTip, setCustomTip] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [result, setResult] = useState<TipResult | null>(null);

  const commonTipPercentages = [10, 15, 18, 20, 25];

  useEffect(() => {
    document.title = "Tip Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free tip calculator. Calculate tip amounts, split bills, and find total per person. Perfect for restaurants and services.');
    }
  }, []);

  const calculateTip = () => {
    if (!billAmount) return;

    const bill = parseFloat(billAmount);
    const people = parseInt(numberOfPeople) || 1;
    const tipPercent = customTip ? parseFloat(customTip) : parseFloat(tipPercentage);

    const tipAmount = (bill * tipPercent) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      perPersonAmount: Math.round(perPersonAmount * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100
    });
  };

  const clearCalculation = () => {
    setBillAmount("");
    setTipPercentage("18");
    setCustomTip("");
    setNumberOfPeople("1");
    setResult(null);
  };

  const handleTipPercentageClick = (percentage: number) => {
    setTipPercentage(percentage.toString());
    setCustomTip("");
  };

  useEffect(() => {
    if (billAmount) {
      calculateTip();
    }
  }, [billAmount, tipPercentage, customTip, numberOfPeople]);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-money-bill-wave text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="tip-calc-title">
              Tip Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="tip-calc-subtitle">
              Calculate tips and split bills easily for restaurants and services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-receipt text-primary"></i>
                  <span>Bill Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="billAmount" className="text-sm font-medium text-slate-700 mb-2 block">
                    Bill Amount ($)
                  </Label>
                  <Input
                    id="billAmount"
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    className="w-full text-lg"
                    placeholder="50.00"
                    min="0"
                    step="0.01"
                    data-testid="input-bill-amount"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Tip Percentage
                  </Label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {commonTipPercentages.map((percentage) => (
                      <Button
                        key={percentage}
                        variant={tipPercentage === percentage.toString() && !customTip ? "default" : "outline"}
                        className="text-sm"
                        onClick={() => handleTipPercentageClick(percentage)}
                        data-testid={`button-tip-${percentage}`}
                      >
                        {percentage}%
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="w-full"
                    placeholder="Custom tip %"
                    min="0"
                    max="100"
                    step="0.1"
                    data-testid="input-custom-tip"
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfPeople" className="text-sm font-medium text-slate-700 mb-2 block">
                    Number of People
                  </Label>
                  <Input
                    id="numberOfPeople"
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    className="w-full text-lg"
                    placeholder="1"
                    min="1"
                    data-testid="input-people-count"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateTip} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!billAmount}
                    data-testid="button-calculate-tip"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Tip
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-tip"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Tip Guide */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Tipping Guide</span>
                  </div>
                  <div className="text-blue-700 space-y-1">
                    <p><strong>Restaurants:</strong> 15-20% (18% is standard)</p>
                    <p><strong>Bars:</strong> $1-2 per drink or 15-20%</p>
                    <p><strong>Delivery:</strong> 10-15% + delivery fee</p>
                    <p><strong>Taxi/Rideshare:</strong> 10-15%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-pie text-accent"></i>
                  <span>Tip Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result && billAmount ? (
                  <div className="space-y-6" data-testid="tip-results">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="text-2xl font-bold text-green-600" data-testid="tip-amount">
                          ${result.tipAmount}
                        </div>
                        <div className="text-sm text-green-700">Tip Amount</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600" data-testid="total-amount">
                          ${result.totalAmount}
                        </div>
                        <div className="text-sm text-blue-700">Total Amount</div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4 text-center">Bill Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Bill Amount:</span>
                          <span>${billAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tip ({customTip || tipPercentage}%):</span>
                          <span>${result.tipAmount}</span>
                        </div>
                        <div className="border-t border-green-300 pt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>${result.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Per Person Breakdown */}
                    {parseInt(numberOfPeople) > 1 && (
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-800 mb-3 text-center">
                          Split Between {numberOfPeople} People
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold text-purple-600" data-testid="tip-per-person">
                              ${result.tipPerPerson}
                            </div>
                            <div className="text-sm text-purple-700">Tip per person</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-purple-600" data-testid="total-per-person">
                              ${result.perPersonAmount}
                            </div>
                            <div className="text-sm text-purple-700">Total per person</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Tip Options */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-800 mb-3">Quick Tip Comparison</h4>
                      <div className="space-y-2 text-sm">
                        {[15, 18, 20, 25].map((percent) => {
                          const tip = (parseFloat(billAmount) * percent) / 100;
                          const total = parseFloat(billAmount) + tip;
                          return (
                            <div key={percent} className="flex justify-between">
                              <span>{percent}% tip:</span>
                              <span>${tip.toFixed(2)} (Total: ${total.toFixed(2)})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-money-bill-wave text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Bill Amount</h3>
                    <p className="text-slate-500">
                      Enter your bill amount to calculate the tip
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
                <CardTitle className="text-lg">Tipping Etiquette</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-utensils text-green-500 mt-1"></i>
                    <span><strong>Good service:</strong> 18-20% at restaurants</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span><strong>Excellent service:</strong> 20-25% or more</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-frown text-red-500 mt-1"></i>
                    <span><strong>Poor service:</strong> 10-15% (consider talking to manager)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-users text-blue-500 mt-1"></i>
                    <span><strong>Large groups:</strong> 18-20% (often auto-added)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-credit-card text-purple-500 mt-1"></i>
                    <span><strong>Credit cards:</strong> Calculate on pre-tax amount</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">International Tipping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span><strong>United States:</strong></span>
                    <span>15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Canada:</strong></span>
                    <span>15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>United Kingdom:</strong></span>
                    <span>10-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Australia:</strong></span>
                    <span>10% (optional)</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Germany:</strong></span>
                    <span>5-10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Japan:</strong></span>
                    <span>Not customary</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}