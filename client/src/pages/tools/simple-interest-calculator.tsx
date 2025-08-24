import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
  monthlyInterest: number;
  yearlyBreakdown: { year: number; interest: number; total: number }[];
}

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("years");
  const [result, setResult] = useState<SimpleInterestResult | null>(null);

  useEffect(() => {
    document.title = "Simple Interest Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate simple interest on loans and investments. Free simple interest calculator with detailed breakdown and yearly projections.');
    }
  }, []);

  const calculateSimpleInterest = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const R = parseFloat(rate);
    let T = parseFloat(time);

    // Convert time to years if needed
    if (timeUnit === "months") {
      T = T / 12;
    } else if (timeUnit === "days") {
      T = T / 365;
    }

    // Simple Interest Formula: SI = (P × R × T) / 100
    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;
    const monthlyInterest = interest / (T * 12);

    // Yearly breakdown
    const yearlyBreakdown: { year: number; interest: number; total: number }[] = [];
    const yearsToShow = Math.min(Math.ceil(T), 10); // Show max 10 years
    
    for (let year = 1; year <= yearsToShow; year++) {
      const yearlyInterest = (P * R * year) / 100;
      const yearlyTotal = P + yearlyInterest;
      yearlyBreakdown.push({
        year,
        interest: Math.round(yearlyInterest * 100) / 100,
        total: Math.round(yearlyTotal * 100) / 100
      });
    }

    setResult({
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      monthlyInterest: Math.round(monthlyInterest * 100) / 100,
      yearlyBreakdown
    });
  };

  const clearCalculation = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTimeUnit("years");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-percent text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="simple-interest-title">
              Simple Interest Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="simple-interest-subtitle">
              Calculate simple interest on loans, deposits, and investments
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-calculator text-primary"></i>
                  <span>Loan/Investment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="principal" className="text-sm font-medium text-slate-700 mb-2 block">
                    Principal Amount ($)
                  </Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full text-lg"
                    placeholder="10000"
                    min="0"
                    step="0.01"
                    data-testid="input-principal"
                  />
                </div>

                <div>
                  <Label htmlFor="rate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full text-lg"
                    placeholder="5"
                    min="0"
                    max="100"
                    step="0.01"
                    data-testid="input-rate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium text-slate-700 mb-2 block">
                      Time Period
                    </Label>
                    <Input
                      id="time"
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full text-lg"
                      placeholder="2"
                      min="0"
                      step="0.1"
                      data-testid="input-time"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeUnit" className="text-sm font-medium text-slate-700 mb-2 block">
                      Time Unit
                    </Label>
                    <Select value={timeUnit} onValueChange={setTimeUnit} data-testid="select-time-unit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateSimpleInterest} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!principal || !rate || !time}
                    data-testid="button-calculate-interest"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Interest
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-interest"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Formula Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Simple Interest Formula</span>
                  </div>
                  <div className="text-blue-700">
                    <p className="font-mono bg-white p-2 rounded text-center">
                      SI = (P × R × T) ÷ 100
                    </p>
                    <div className="mt-2 text-xs">
                      <p><strong>SI</strong> = Simple Interest</p>
                      <p><strong>P</strong> = Principal Amount</p>
                      <p><strong>R</strong> = Annual Interest Rate (%)</p>
                      <p><strong>T</strong> = Time Period (years)</p>
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
                  <span>Interest Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="interest-results">
                    {/* Main Results */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="text-2xl font-bold text-green-600" data-testid="interest-amount">
                          ${result.interest.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700">Interest Earned</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600" data-testid="total-amount">
                          ${result.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-700">Total Amount</div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4 text-center">Investment Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Principal:</span>
                          <span>${parseFloat(principal).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span>{rate}% per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Period:</span>
                          <span>{time} {timeUnit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Earned:</span>
                          <span>${result.interest.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-purple-300 pt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Final Amount:</span>
                            <span>${result.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Interest */}
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-orange-800">Monthly Interest</h4>
                          <p className="text-sm text-orange-700">Average per month</p>
                        </div>
                        <div className="text-xl font-bold text-orange-600" data-testid="monthly-interest">
                          ${result.monthlyInterest.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Yearly Breakdown */}
                    {result.yearlyBreakdown.length > 1 && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-800 mb-3">Yearly Breakdown</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {result.yearlyBreakdown.map((year) => (
                            <div key={year.year} className="flex justify-between items-center py-1 text-sm">
                              <span className="font-medium">Year {year.year}:</span>
                              <div className="text-right">
                                <div className="text-green-600">Interest: ${year.interest.toLocaleString()}</div>
                                <div className="text-slate-600">Total: ${year.total.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-percent text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Investment Details</h3>
                    <p className="text-slate-500">
                      Fill in the principal, rate, and time to calculate simple interest
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
                <CardTitle className="text-lg">Simple vs Compound Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Simple Interest:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Interest calculated only on principal</li>
                      <li>• Linear growth over time</li>
                      <li>• Easier to calculate</li>
                      <li>• Common in short-term loans</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Compound Interest:</h5>
                    <ul className="space-y-1 ml-4">
                      <li>• Interest calculated on principal + accrued interest</li>
                      <li>• Exponential growth over time</li>
                      <li>• More complex calculations</li>
                      <li>• Common in savings accounts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-handshake text-blue-500 mt-1"></i>
                    <span>Personal loans and credit</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-car text-green-500 mt-1"></i>
                    <span>Auto loans (some lenders)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-graduation-cap text-purple-500 mt-1"></i>
                    <span>Student loans (certain types)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-piggy-bank text-orange-500 mt-1"></i>
                    <span>Fixed deposits (some banks)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-chart-line text-red-500 mt-1"></i>
                    <span>Government bonds</span>
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