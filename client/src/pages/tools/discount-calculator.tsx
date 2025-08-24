import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

export default function DiscountCalculator() {
  // Standard discount calculation
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountResult, setDiscountResult] = useState<DiscountResult | null>(null);

  // Multiple discounts
  const [multiOriginalPrice, setMultiOriginalPrice] = useState("");
  const [discount1, setDiscount1] = useState("");
  const [discount2, setDiscount2] = useState("");
  const [discount3, setDiscount3] = useState("");
  const [multiResult, setMultiResult] = useState<{steps: any[], finalPrice: number, totalSavings: number} | null>(null);

  // Reverse calculation (find original price)
  const [salePrice, setSalePrice] = useState("");
  const [knownDiscount, setKnownDiscount] = useState("");
  const [originalPriceResult, setOriginalPriceResult] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Discount Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate discounts, sale prices, and savings. Free discount calculator with multiple discounts and reverse calculations.');
    }
  }, []);

  const calculateDiscount = () => {
    if (!originalPrice || !discountPercent) return;

    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    setDiscountResult({
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(discountAmount * 100) / 100
    });
  };

  const calculateMultipleDiscounts = () => {
    if (!multiOriginalPrice || !discount1) return;

    let currentPrice = parseFloat(multiOriginalPrice);
    const originalPrice = currentPrice;
    const steps = [];

    // Apply first discount
    if (discount1) {
      const disc1 = parseFloat(discount1);
      const discountAmount = (currentPrice * disc1) / 100;
      currentPrice = currentPrice - discountAmount;
      steps.push({
        step: 1,
        discount: disc1,
        discountAmount: Math.round(discountAmount * 100) / 100,
        priceAfter: Math.round(currentPrice * 100) / 100
      });
    }

    // Apply second discount
    if (discount2) {
      const disc2 = parseFloat(discount2);
      const discountAmount = (currentPrice * disc2) / 100;
      currentPrice = currentPrice - discountAmount;
      steps.push({
        step: 2,
        discount: disc2,
        discountAmount: Math.round(discountAmount * 100) / 100,
        priceAfter: Math.round(currentPrice * 100) / 100
      });
    }

    // Apply third discount
    if (discount3) {
      const disc3 = parseFloat(discount3);
      const discountAmount = (currentPrice * disc3) / 100;
      currentPrice = currentPrice - discountAmount;
      steps.push({
        step: 3,
        discount: disc3,
        discountAmount: Math.round(discountAmount * 100) / 100,
        priceAfter: Math.round(currentPrice * 100) / 100
      });
    }

    const totalSavings = originalPrice - currentPrice;

    setMultiResult({
      steps,
      finalPrice: Math.round(currentPrice * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100
    });
  };

  const calculateOriginalPrice = () => {
    if (!salePrice || !knownDiscount) return;

    const sale = parseFloat(salePrice);
    const discount = parseFloat(knownDiscount);

    // Formula: Original Price = Sale Price / (1 - Discount/100)
    const original = sale / (1 - discount / 100);

    setOriginalPriceResult(Math.round(original * 100) / 100);
  };

  const clearAll = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setMultiOriginalPrice("");
    setDiscount1("");
    setDiscount2("");
    setDiscount3("");
    setSalePrice("");
    setKnownDiscount("");
    setDiscountResult(null);
    setMultiResult(null);
    setOriginalPriceResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-tags text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="discount-calc-title">
              Discount Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="discount-calc-subtitle">
              Calculate discounts, sale prices, and total savings on your purchases
            </p>
          </div>

          <Tabs defaultValue="simple" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="simple">Simple Discount</TabsTrigger>
              <TabsTrigger value="multiple">Multiple Discounts</TabsTrigger>
              <TabsTrigger value="reverse">Find Original Price</TabsTrigger>
            </TabsList>

            <TabsContent value="simple">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-calculator text-primary"></i>
                    <span>Single Discount Calculation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="originalPrice" className="text-sm font-medium text-slate-700 mb-2 block">
                        Original Price ($)
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className="w-full text-lg"
                        placeholder="100.00"
                        min="0"
                        step="0.01"
                        data-testid="input-original-price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discountPercent" className="text-sm font-medium text-slate-700 mb-2 block">
                        Discount Percentage (%)
                      </Label>
                      <Input
                        id="discountPercent"
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        className="w-full text-lg"
                        placeholder="20"
                        min="0"
                        max="100"
                        step="0.01"
                        data-testid="input-discount-percent"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateDiscount} 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={!originalPrice || !discountPercent}
                    data-testid="button-calculate-discount"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Discount
                  </Button>

                  {discountResult && (
                    <div className="space-y-4" data-testid="discount-results">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                          <div className="text-2xl font-bold text-red-600" data-testid="discount-amount">
                            ${discountResult.discountAmount}
                          </div>
                          <div className="text-sm text-red-700">Discount Amount</div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="text-2xl font-bold text-green-600" data-testid="final-price">
                            ${discountResult.finalPrice}
                          </div>
                          <div className="text-sm text-green-700">Final Price</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white">
                        <h3 className="text-xl font-bold mb-4 text-center">Discount Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Original Price:</span>
                            <span>${originalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Discount ({discountPercent}%):</span>
                            <span>-${discountResult.discountAmount}</span>
                          </div>
                          <div className="border-t border-red-300 pt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>You Pay:</span>
                              <span>${discountResult.finalPrice}</span>
                            </div>
                          </div>
                          <div className="text-center mt-3 text-red-100">
                            You save ${discountResult.savings}!
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="multiple">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-layer-group text-purple-600"></i>
                    <span>Multiple Discounts (Sequential)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="multiOriginalPrice" className="text-sm font-medium text-slate-700 mb-2 block">
                      Original Price ($)
                    </Label>
                    <Input
                      id="multiOriginalPrice"
                      type="number"
                      value={multiOriginalPrice}
                      onChange={(e) => setMultiOriginalPrice(e.target.value)}
                      className="w-full text-lg"
                      placeholder="100.00"
                      min="0"
                      step="0.01"
                      data-testid="input-multi-original-price"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="discount1" className="text-sm font-medium text-slate-700 mb-2 block">
                        First Discount (%)
                      </Label>
                      <Input
                        id="discount1"
                        type="number"
                        value={discount1}
                        onChange={(e) => setDiscount1(e.target.value)}
                        className="w-full"
                        placeholder="20"
                        min="0"
                        max="100"
                        step="0.01"
                        data-testid="input-discount1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discount2" className="text-sm font-medium text-slate-700 mb-2 block">
                        Second Discount (%) <span className="text-gray-500">[Optional]</span>
                      </Label>
                      <Input
                        id="discount2"
                        type="number"
                        value={discount2}
                        onChange={(e) => setDiscount2(e.target.value)}
                        className="w-full"
                        placeholder="10"
                        min="0"
                        max="100"
                        step="0.01"
                        data-testid="input-discount2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discount3" className="text-sm font-medium text-slate-700 mb-2 block">
                        Third Discount (%) <span className="text-gray-500">[Optional]</span>
                      </Label>
                      <Input
                        id="discount3"
                        type="number"
                        value={discount3}
                        onChange={(e) => setDiscount3(e.target.value)}
                        className="w-full"
                        placeholder="5"
                        min="0"
                        max="100"
                        step="0.01"
                        data-testid="input-discount3"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateMultipleDiscounts} 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!multiOriginalPrice || !discount1}
                    data-testid="button-calculate-multiple"
                  >
                    <i className="fas fa-layer-group mr-2"></i>
                    Calculate Multiple Discounts
                  </Button>

                  {multiResult && (
                    <div className="space-y-4" data-testid="multiple-results">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
                        <h3 className="text-xl font-bold mb-4 text-center">Step-by-Step Discounts</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Starting Price:</span>
                            <span>${multiOriginalPrice}</span>
                          </div>
                          {multiResult.steps.map((step, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-purple-100">
                                <span>Discount {step.step} ({step.discount}%):</span>
                                <span>-${step.discountAmount}</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span>After Discount {step.step}:</span>
                                <span>${step.priceAfter}</span>
                              </div>
                              {index < multiResult.steps.length - 1 && <div className="border-t border-purple-300 my-2"></div>}
                            </div>
                          ))}
                          <div className="border-t border-purple-300 pt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Final Price:</span>
                              <span>${multiResult.finalPrice}</span>
                            </div>
                            <div className="text-center mt-2 text-purple-100">
                              Total Savings: ${multiResult.totalSavings}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reverse">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-search text-orange-600"></i>
                    <span>Find Original Price from Sale Price</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salePrice" className="text-sm font-medium text-slate-700 mb-2 block">
                        Sale Price ($)
                      </Label>
                      <Input
                        id="salePrice"
                        type="number"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        className="w-full text-lg"
                        placeholder="80.00"
                        min="0"
                        step="0.01"
                        data-testid="input-sale-price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="knownDiscount" className="text-sm font-medium text-slate-700 mb-2 block">
                        Known Discount (%)
                      </Label>
                      <Input
                        id="knownDiscount"
                        type="number"
                        value={knownDiscount}
                        onChange={(e) => setKnownDiscount(e.target.value)}
                        className="w-full text-lg"
                        placeholder="20"
                        min="0"
                        max="100"
                        step="0.01"
                        data-testid="input-known-discount"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateOriginalPrice} 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={!salePrice || !knownDiscount}
                    data-testid="button-calculate-original"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Find Original Price
                  </Button>

                  {originalPriceResult !== null && (
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center" data-testid="original-price-result">
                      <h3 className="text-3xl font-bold mb-2">${originalPriceResult}</h3>
                      <p className="text-orange-100 mb-4">Original Price</p>
                      <div className="text-sm text-orange-100">
                        With a {knownDiscount}% discount, the sale price of ${salePrice} means the original price was ${originalPriceResult}
                      </div>
                      <div className="mt-4 text-sm text-orange-100">
                        Formula: Original Price = Sale Price ÷ (1 - Discount ÷ 100)
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
                <CardTitle className="text-lg">Discount Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-tags text-red-500 mt-1"></i>
                    <span>Multiple discounts apply sequentially, not additively</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calculator text-blue-500 mt-1"></i>
                    <span>20% + 10% discount ≠ 30% discount</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-shopping-cart text-green-500 mt-1"></i>
                    <span>Compare final prices, not just discount percentages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-percent text-purple-500 mt-1"></i>
                    <span>Higher percentage doesn't always mean better deal</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-receipt text-orange-500 mt-1"></i>
                    <span>Check if discount applies before or after tax</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Shopping Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calendar text-blue-500 mt-1"></i>
                    <span>Time purchases around major sale events</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-search text-green-500 mt-1"></i>
                    <span>Compare prices across different retailers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mobile-alt text-purple-500 mt-1"></i>
                    <span>Use coupon apps and browser extensions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-credit-card text-orange-500 mt-1"></i>
                    <span>Check for additional credit card discounts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-truck text-red-500 mt-1"></i>
                    <span>Factor in shipping costs when comparing</span>
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