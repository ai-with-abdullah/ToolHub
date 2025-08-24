import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  workingDays: number;
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<DateDifferenceResult | null>(null);

  // Add/Subtract days functionality
  const [baseDate, setBaseDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("");
  const [operation, setOperation] = useState("add");
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Date Difference Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate difference between dates, add or subtract days, and find working days. Free date calculator with detailed breakdown.');
    }
  }, []);

  const calculateDateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert("End date must be after start date!");
      return;
    }

    // Calculate total difference in milliseconds
    const timeDiff = end.getTime() - start.getTime();
    
    // Calculate various time units
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    // Calculate years, months, and days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust for negative values
    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate working days (excluding weekends)
    let workingDays = 0;
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      workingDays
    });
  };

  const calculateNewDate = () => {
    if (!baseDate || !daysToAdd) return;

    const base = new Date(baseDate);
    const days = parseInt(daysToAdd);
    
    if (operation === "add") {
      base.setDate(base.getDate() + days);
    } else {
      base.setDate(base.getDate() - days);
    }

    setCalculatedDate(base.toISOString().split('T')[0]);
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
    setBaseDate("");
    setDaysToAdd("");
    setResult(null);
    setCalculatedDate(null);
  };

  // Set today's date
  const setToday = (field: 'start' | 'end' | 'base') => {
    const today = new Date().toISOString().split('T')[0];
    if (field === 'start') setStartDate(today);
    else if (field === 'end') setEndDate(today);
    else setBaseDate(today);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-calendar-alt text-indigo-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="date-calc-title">
              Date Difference Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="date-calc-subtitle">
              Calculate the difference between dates and add or subtract days
            </p>
          </div>

          <Tabs defaultValue="difference" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="difference">Date Difference</TabsTrigger>
              <TabsTrigger value="calculate">Add/Subtract Days</TabsTrigger>
            </TabsList>

            <TabsContent value="difference">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-calculator text-primary"></i>
                    <span>Calculate Difference Between Two Dates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-sm font-medium text-slate-700 mb-2 block">
                        Start Date
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="flex-1 text-lg"
                          data-testid="input-start-date"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setToday('start')}
                          className="px-3"
                          data-testid="button-today-start"
                        >
                          Today
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-sm font-medium text-slate-700 mb-2 block">
                        End Date
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="endDate"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="flex-1 text-lg"
                          data-testid="input-end-date"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setToday('end')}
                          className="px-3"
                          data-testid="button-today-end"
                        >
                          Today
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateDateDifference} 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={!startDate || !endDate}
                    data-testid="button-calculate-difference"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Difference
                  </Button>

                  {result && (
                    <div className="space-y-6" data-testid="difference-results">
                      {/* Main Result */}
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white text-center">
                        <h3 className="text-2xl font-bold mb-2" data-testid="main-difference">
                          {result.years} years, {result.months} months, {result.days} days
                        </h3>
                        <p className="text-indigo-100">
                          From {startDate} to {endDate}
                        </p>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600" data-testid="total-days">
                            {result.totalDays.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">Total Days</div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="text-2xl font-bold text-green-600" data-testid="total-weeks">
                            {result.totalWeeks.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">Total Weeks</div>
                        </div>
                        
                        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <div className="text-2xl font-bold text-orange-600" data-testid="working-days">
                            {result.workingDays.toLocaleString()}
                          </div>
                          <div className="text-sm text-orange-700">Working Days</div>
                        </div>
                        
                        <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600" data-testid="total-hours">
                            {result.totalHours.toLocaleString()}
                          </div>
                          <div className="text-sm text-purple-700">Total Hours</div>
                        </div>
                      </div>

                      {/* Additional Time Units */}
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-800 mb-3">Additional Time Units</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Total Minutes:</span>
                            <span className="font-medium" data-testid="total-minutes">
                              {result.totalMinutes.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Seconds:</span>
                            <span className="font-medium" data-testid="total-seconds">
                              {result.totalSeconds.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Special Occasions */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <i className="fas fa-gift text-yellow-600"></i>
                          <span className="font-medium text-yellow-800">Quick Facts</span>
                        </div>
                        <div className="text-yellow-700 text-sm space-y-1">
                          <p>• That's approximately {Math.round(result.totalDays / 365.25 * 100) / 100} years</p>
                          <p>• Excluding weekends: {result.workingDays} working days</p>
                          <p>• Weekend days: {result.totalDays - result.workingDays}</p>
                          {result.totalDays > 365 && (
                            <p>• That's more than a year of time difference!</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculate">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <i className="fas fa-plus-minus text-green-600"></i>
                    <span>Add or Subtract Days from a Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="baseDate" className="text-sm font-medium text-slate-700 mb-2 block">
                      Base Date
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="baseDate"
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="flex-1 text-lg"
                        data-testid="input-base-date"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setToday('base')}
                        className="px-3"
                        data-testid="button-today-base"
                      >
                        Today
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2 block">
                        Operation
                      </Label>
                      <div className="flex gap-2">
                        <Button
                          variant={operation === "add" ? "default" : "outline"}
                          onClick={() => setOperation("add")}
                          className="flex-1"
                          data-testid="button-add"
                        >
                          <i className="fas fa-plus mr-2"></i>
                          Add
                        </Button>
                        <Button
                          variant={operation === "subtract" ? "default" : "outline"}
                          onClick={() => setOperation("subtract")}
                          className="flex-1"
                          data-testid="button-subtract"
                        >
                          <i className="fas fa-minus mr-2"></i>
                          Subtract
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="daysToAdd" className="text-sm font-medium text-slate-700 mb-2 block">
                        Number of Days
                      </Label>
                      <Input
                        id="daysToAdd"
                        type="number"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(e.target.value)}
                        className="w-full text-lg"
                        placeholder="30"
                        min="0"
                        data-testid="input-days-to-add"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateNewDate} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!baseDate || !daysToAdd}
                    data-testid="button-calculate-new-date"
                  >
                    <i className="fas fa-calendar-plus mr-2"></i>
                    Calculate New Date
                  </Button>

                  {calculatedDate && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center" data-testid="calculated-date-result">
                      <h3 className="text-3xl font-bold mb-2">
                        {new Date(calculatedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <p className="text-green-100 mb-2">
                        {operation === 'add' ? 'Adding' : 'Subtracting'} {daysToAdd} days 
                        {operation === 'add' ? ' to ' : ' from '} 
                        {new Date(baseDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <div className="text-sm text-green-100">
                        Result: {calculatedDate}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Quick Calculations</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[7, 30, 90, 365].map((days) => (
                        <Button
                          key={days}
                          variant="outline"
                          size="sm"
                          onClick={() => setDaysToAdd(days.toString())}
                          className="text-xs"
                          data-testid={`button-quick-${days}`}
                        >
                          {days} days
                        </Button>
                      ))}
                    </div>
                  </div>
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
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-birthday-cake text-purple-500 mt-1"></i>
                    <span>Calculate age or time until birthday</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-briefcase text-blue-500 mt-1"></i>
                    <span>Project deadlines and working days</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Relationship anniversaries and milestones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-plane text-green-500 mt-1"></i>
                    <span>Travel planning and vacation countdown</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-graduation-cap text-orange-500 mt-1"></i>
                    <span>Academic terms and school schedules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Date Calculation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calendar text-blue-500 mt-1"></i>
                    <span>Leap years have 366 days (every 4 years)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-business-time text-green-500 mt-1"></i>
                    <span>Working days exclude weekends (Sat & Sun)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-purple-500 mt-1"></i>
                    <span>Time zones are not considered in calculations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span>Calculations are inclusive of start and end dates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-info-circle text-red-500 mt-1"></i>
                    <span>Results are approximate for months/years</span>
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