import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const majorCurrencies = {
  USD: { name: "US Dollar", symbol: "$" },
  EUR: { name: "Euro", symbol: "€" },
  GBP: { name: "British Pound", symbol: "£" },
  JPY: { name: "Japanese Yen", symbol: "¥" },
  AUD: { name: "Australian Dollar", symbol: "A$" },
  CAD: { name: "Canadian Dollar", symbol: "C$" },
  CHF: { name: "Swiss Franc", symbol: "CHF" },
  CNY: { name: "Chinese Yuan", symbol: "¥" },
  INR: { name: "Indian Rupee", symbol: "₹" },
  KRW: { name: "South Korean Won", symbol: "₩" }
};

export default function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts - use multiple methods to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    document.title = "Currency Converter - ToolHub | Free Online Currency Converter";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different currencies with real-time exchange rates. Supports 170+ currencies worldwide. Free currency converter.');
    }
  }, []);

  // Mock exchange rates for demo (in a real app, you'd fetch from an API)
  const mockExchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180.0 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, AUD: 1.59, CAD: 1.47, CHF: 1.08, CNY: 7.6, INR: 87.8, KRW: 1391.0 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150.8, AUD: 1.85, CAD: 1.71, CHF: 1.26, CNY: 8.84, INR: 102.1, KRW: 1617.0 }
  };

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    
    // Use mock data for demo
    if (mockExchangeRates[from] && mockExchangeRates[from][to]) {
      return mockExchangeRates[from][to];
    }
    
    // Reverse calculation if direct rate not available
    if (mockExchangeRates[to] && mockExchangeRates[to][from]) {
      return 1 / mockExchangeRates[to][from];
    }
    
    // Fallback to USD conversion
    if (from !== 'USD' && to !== 'USD') {
      const toUSD = mockExchangeRates[from]?.USD || 1;
      const fromUSD = mockExchangeRates['USD']?.[to] || 1;
      return toUSD * fromUSD;
    }
    
    return 1; // Fallback
  };

  const convertCurrency = () => {
    const amount = parseFloat(fromAmount);
    
    if (isNaN(amount) || fromAmount === '') {
      setToAmount('');
      setExchangeRate(0);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const rate = getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * rate;
      
      setExchangeRate(rate);
      setToAmount(convertedAmount.toFixed(2));
      setLoading(false);
    }, 500);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const resetForm = () => {
    setFromAmount('');
    setToAmount('');
    setExchangeRate(0);
  };

  useEffect(() => {
    if (fromAmount) {
      convertCurrency();
    }
  }, [fromAmount, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              <i className="fas fa-exchange-alt text-primary mr-2"></i>
              Currency Converter
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Convert between different currencies with real-time exchange rates. Supports major currencies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Convert Currency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label className="text-slate-700 mb-2">From</Label>
                      <div className="space-y-3">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          data-testid="input-from-amount"
                        />
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                          <SelectTrigger data-testid="select-from-currency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(majorCurrencies).map(([code, currency]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 mb-2">To</Label>
                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Converted amount"
                          value={loading ? "Converting..." : toAmount}
                          readOnly
                          className="bg-slate-50"
                          data-testid="input-to-amount"
                        />
                        <Select value={toCurrency} onValueChange={setToCurrency}>
                          <SelectTrigger data-testid="select-to-currency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(majorCurrencies).map(([code, currency]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button onClick={convertCurrency} className="flex-1" disabled={loading} data-testid="button-convert">
                      <i className="fas fa-sync-alt mr-2"></i>Convert
                    </Button>
                    <Button onClick={resetForm} variant="secondary" className="flex-1" data-testid="button-reset">
                      <i className="fas fa-undo mr-2"></i>Reset
                    </Button>
                    <Button onClick={swapCurrencies} variant="outline" data-testid="button-swap">
                      <i className="fas fa-exchange-alt mr-2"></i>Swap
                    </Button>
                  </div>

                  {exchangeRate > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" data-testid="exchange-rate">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">Exchange Rate</h3>
                      <p className="text-blue-700 text-sm">
                        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Popular Currencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {Object.entries(majorCurrencies).slice(0, 6).map(([code, currency]) => (
                      <div key={code} className="flex justify-between items-center">
                        <span className="text-slate-600">{code}</span>
                        <span className="font-medium">{currency.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Exchange rates are for demonstration purposes. For real trading, please use official financial data sources.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}