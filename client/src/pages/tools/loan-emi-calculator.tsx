import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EMIResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
  loanBreakdown: {
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export default function LoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");
  const [result, setResult] = useState<EMIResult | null>(null);

  useEffect(() => {
    document.title = "Loan EMI Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate loan EMI, monthly payments, and total interest. Free loan calculator with detailed amortization schedule.');
    }
  }, []);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTenure) return;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    let tenure = parseFloat(loanTenure);
    
    // Convert tenure to months
    if (tenureType === "years") {
      tenure = tenure * 12;
    }

    // EMI Formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule (show first 12 months or total tenure if less)
    const scheduleLength = Math.min(tenure, 12);
    const loanBreakdown = [];
    let remainingBalance = principal;

    for (let month = 1; month <= scheduleLength; month++) {
      const interestPayment = remainingBalance * rate;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      loanBreakdown.push({
        month,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(Math.max(0, remainingBalance) * 100) / 100
      });
    }

    setResult({
      monthlyEMI: Math.round(emi * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanBreakdown
    });
  };

  const clearCalculation = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setTenureType("years");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-calculator text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="emi-calc-title">
              Loan EMI Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="emi-calc-subtitle">
              Calculate your loan EMI, total interest, and monthly payment breakdown
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-file-invoice-dollar text-primary"></i>
                  <span>Loan Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-medium text-slate-700 mb-2 block">
                    Loan Amount ($)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full text-lg"
                    placeholder="100000"
                    min="0"
                    step="1000"
                    data-testid="input-loan-amount"
                  />
                </div>

                <div>
                  <Label htmlFor="interestRate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full text-lg"
                    placeholder="7.5"
                    min="0"
                    max="50"
                    step="0.01"
                    data-testid="input-interest-rate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanTenure" className="text-sm font-medium text-slate-700 mb-2 block">
                      Loan Tenure
                    </Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      className="w-full text-lg"
                      placeholder="15"
                      min="0"
                      step="1"
                      data-testid="input-loan-tenure"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenureType" className="text-sm font-medium text-slate-700 mb-2 block">
                      Tenure Type
                    </Label>
                    <Select value={tenureType} onValueChange={setTenureType} data-testid="select-tenure-type">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateEMI} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!loanAmount || !interestRate || !loanTenure}
                    data-testid="button-calculate-emi"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate EMI
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-emi"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* EMI Formula Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">EMI Formula</span>
                  </div>
                  <div className="text-blue-700">
                    <p className="font-mono bg-white p-2 rounded text-xs">
                      EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
                    </p>
                    <div className="mt-2 text-xs">
                      <p><strong>P</strong> = Principal loan amount</p>
                      <p><strong>r</strong> = Monthly interest rate (Annual rate ÷ 12)</p>
                      <p><strong>n</strong> = Number of monthly installments</p>
                    </div>
                  </div>
                </div>

                {/* Loan Types */}
                <div className="bg-green-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-home text-green-600"></i>
                    <span className="font-medium text-green-800">Common Loan Types</span>
                  </div>
                  <div className="text-green-700 space-y-1">
                    <p><strong>Home Loan:</strong> 6.5% - 8.5% (15-30 years)</p>
                    <p><strong>Car Loan:</strong> 7% - 12% (3-7 years)</p>
                    <p><strong>Personal Loan:</strong> 10% - 20% (1-5 years)</p>
                    <p><strong>Education Loan:</strong> 8% - 12% (5-15 years)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-pie text-accent"></i>
                  <span>EMI Calculation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="emi-results">
                    {/* Main EMI Display */}
                    <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2" data-testid="monthly-emi">
                        ${result.monthlyEMI.toLocaleString()}
                      </h2>
                      <p className="text-green-100">Monthly EMI</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-xl font-bold text-blue-600" data-testid="total-amount">
                          ${result.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-700">Total Amount</div>
                      </div>
                      
                      <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="text-xl font-bold text-red-600" data-testid="total-interest">
                          ${result.totalInterest.toLocaleString()}
                        </div>
                        <div className="text-sm text-red-700">Total Interest</div>
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-800 mb-3">Loan Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Principal Amount:</span>
                          <span className="font-medium">${parseFloat(loanAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span className="font-medium">{interestRate}% per annum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loan Tenure:</span>
                          <span className="font-medium">{loanTenure} {tenureType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-medium text-red-600">${result.totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total Payable:</span>
                            <span className="font-bold">${result.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amortization Schedule Preview */}
                    <div className="bg-white border rounded-xl overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b">
                        <h4 className="font-semibold text-slate-800">
                          Payment Schedule (First {result.loanBreakdown.length} months)
                        </h4>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-slate-100 sticky top-0">
                            <tr>
                              <th className="px-2 py-2 text-left">Month</th>
                              <th className="px-2 py-2 text-right">EMI</th>
                              <th className="px-2 py-2 text-right">Principal</th>
                              <th className="px-2 py-2 text-right">Interest</th>
                              <th className="px-2 py-2 text-right">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.loanBreakdown.map((month) => (
                              <tr key={month.month} className="border-t">
                                <td className="px-2 py-2">{month.month}</td>
                                <td className="px-2 py-2 text-right">${month.emi.toLocaleString()}</td>
                                <td className="px-2 py-2 text-right text-green-600">${month.principal.toLocaleString()}</td>
                                <td className="px-2 py-2 text-right text-red-600">${month.interest.toLocaleString()}</td>
                                <td className="px-2 py-2 text-right">${month.balance.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Interest vs Principal Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Payment Composition</h4>
                      <div className="relative">
                        <div className="h-6 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-green-400" 
                            style={{width: `${(parseFloat(loanAmount) / result.totalAmount) * 100}%`}}
                          ></div>
                          <div 
                            className="bg-red-400" 
                            style={{width: `${(result.totalInterest / result.totalAmount) * 100}%`}}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mt-2">
                          <span className="flex items-center">
                            <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                            Principal ({((parseFloat(loanAmount) / result.totalAmount) * 100).toFixed(1)}%)
                          </span>
                          <span className="flex items-center">
                            <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                            Interest ({((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-calculator text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Loan Details</h3>
                    <p className="text-slate-500">
                      Fill in your loan information to calculate EMI
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
                <CardTitle className="text-lg">EMI Planning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-percentage text-green-500 mt-1"></i>
                    <span>Keep EMI under 40% of your monthly income</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calendar-alt text-blue-500 mt-1"></i>
                    <span>Shorter tenure = Higher EMI, Lower total interest</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-coins text-orange-500 mt-1"></i>
                    <span>Higher down payment reduces loan amount</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-chart-line text-purple-500 mt-1"></i>
                    <span>Consider prepayment to reduce interest burden</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-shield-alt text-red-500 mt-1"></i>
                    <span>Maintain emergency fund after EMI payments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Factors Affecting Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span>Credit score (higher score = lower rate)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-briefcase text-blue-500 mt-1"></i>
                    <span>Employment stability and income</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-building text-green-500 mt-1"></i>
                    <span>Loan-to-value ratio for secured loans</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-purple-500 mt-1"></i>
                    <span>Loan tenure and type</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-university text-red-500 mt-1"></i>
                    <span>Lender policies and market conditions</span>
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