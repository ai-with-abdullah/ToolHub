import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AgeInDaysResult {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  age: {
    years: number;
    months: number;
    days: number;
  };
}

export default function AgeInDaysCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<AgeInDaysResult | null>(null);

  useEffect(() => {
    document.title = "Age in Days Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your exact age in days, weeks, months, hours, minutes, and seconds. Find out how many days you have lived.');
    }

    // Set today as default target date
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  }, []);

  const calculateAgeInDays = () => {
    if (!birthDate || !targetDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert("Birth date cannot be after the target date!");
      return;
    }

    // Calculate total time difference in milliseconds
    const timeDiff = target.getTime() - birth.getTime();
    
    // Convert to different units
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    // Calculate age in years, months, days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate approximate total months
    const totalMonths = years * 12 + months;

    // Calculate days until next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthdayDays,
      age: { years, months, days }
    });
  };

  const clearCalculation = () => {
    setBirthDate("");
    setTargetDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  const useToday = () => {
    setTargetDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-calendar-day text-purple-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="age-days-title">
              Age in Days Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="age-days-subtitle">
              Calculate your exact age in days, weeks, months, hours, minutes, and seconds. Find out how many days you have lived.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-edit text-primary"></i>
                  <span>Date Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Birth Date
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full"
                    max={new Date().toISOString().split('T')[0]}
                    data-testid="input-birth-date"
                  />
                </div>

                <div>
                  <Label htmlFor="targetDate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Calculate Age As Of
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full"
                    data-testid="input-target-date"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateAgeInDays} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!birthDate || !targetDate}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Age in Days
                  </Button>
                  
                  <Button 
                    onClick={useToday} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-today"
                  >
                    <i className="fas fa-calendar-alt"></i>
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

                {/* Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Quick Facts</span>
                  </div>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Average human lifespan: ~29,000 days</li>
                    <li>• One year = 365.25 days (accounting for leap years)</li>
                    <li>• Most people live between 25,000-30,000 days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-bar text-accent"></i>
                  <span>Age Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="age-results">
                    {/* Primary Age Display */}
                    <div className="text-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                      <div className="text-sm text-purple-100 mb-2">Your Age in Days</div>
                      <div className="text-4xl font-bold mb-2" data-testid="total-days">
                        {result.totalDays.toLocaleString()}
                      </div>
                      <div className="text-purple-100">days old</div>
                    </div>

                    {/* Age Breakdown */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="text-sm text-slate-600 mb-1">Exact Age</div>
                        <div className="text-lg font-semibold text-slate-800" data-testid="exact-age">
                          {result.age.years} years, {result.age.months} months, {result.age.days} days
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600" data-testid="total-weeks">
                            {result.totalWeeks.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">weeks</div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-green-600" data-testid="total-months">
                            {result.totalMonths}
                          </div>
                          <div className="text-sm text-green-700">months</div>
                        </div>

                        <div className="bg-orange-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600" data-testid="total-hours">
                            {result.totalHours.toLocaleString()}
                          </div>
                          <div className="text-sm text-orange-700">hours</div>
                        </div>

                        <div className="bg-red-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-red-600" data-testid="total-minutes">
                            {result.totalMinutes.toLocaleString()}
                          </div>
                          <div className="text-sm text-red-700">minutes</div>
                        </div>
                      </div>

                      <div className="bg-indigo-50 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-indigo-600" data-testid="total-seconds">
                          {result.totalSeconds.toLocaleString()}
                        </div>
                        <div className="text-sm text-indigo-700">seconds lived</div>
                      </div>

                      {/* Next Birthday */}
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-rose-600 mb-1">Days Until Next Birthday</div>
                        <div className="text-2xl font-bold text-rose-600" data-testid="next-birthday">
                          {result.nextBirthdayDays}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-calendar-day text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Birth Date</h3>
                    <p className="text-slate-500">
                      Select your birth date to calculate how many days you've lived
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
                <CardTitle className="text-lg">Interesting Age Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Your heart beats about 100,000 times per day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-eye text-blue-500 mt-1"></i>
                    <span>You blink approximately 15,000-20,000 times daily</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-lungs text-green-500 mt-1"></i>
                    <span>You take around 20,000 breaths every day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bed text-purple-500 mt-1"></i>
                    <span>About 1/3 of your life is spent sleeping</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-brain text-orange-500 mt-1"></i>
                    <span>Your brain processes 70,000 thoughts per day</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Age Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-baby text-pink-500 mt-1"></i>
                    <span>1,000 days ≈ 2.7 years old</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-child text-blue-500 mt-1"></i>
                    <span>5,000 days ≈ 13.7 years old</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-user-graduate text-green-500 mt-1"></i>
                    <span>10,000 days ≈ 27.4 years old</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-briefcase text-orange-500 mt-1"></i>
                    <span>15,000 days ≈ 41.1 years old</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-user text-purple-500 mt-1"></i>
                    <span>20,000 days ≈ 54.8 years old</span>
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