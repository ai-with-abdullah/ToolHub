import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.title = "Age Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday with our free age calculator.');
    }

    // Update current time every second for live calculation
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (birthDate && result) {
        calculateAge();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDate, result]);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = currentTime;

    if (birth > now) {
      alert("Birth date cannot be in the future!");
      return;
    }

    // Calculate age
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    // Adjust for negative values
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate exact time differences
    const timeDiff = now.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    // Calculate current age in hours, minutes, seconds
    const hours = now.getHours() - birth.getHours();
    const minutes = now.getMinutes() - birth.getMinutes();
    const seconds = now.getSeconds() - birth.getSeconds();

    // Calculate next birthday
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days: Math.abs(days),
      hours: Math.abs(hours),
      minutes: Math.abs(minutes),
      seconds: Math.abs(seconds),
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthdayDays
    });
  };

  const clearCalculation = () => {
    setBirthDate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-birthday-cake text-primary text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="age-calc-title">
              Age Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="age-calc-subtitle">
              Calculate your exact age in years, months, days, hours, and minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-calendar-alt text-primary"></i>
                  <span>Enter Your Birth Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="birthdate" className="text-sm font-medium text-slate-700 mb-2 block">
                    Birth Date
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full text-lg"
                    data-testid="input-birthdate"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateAge} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!birthDate}
                    data-testid="button-calculate-age"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Age
                  </Button>
                  
                  <Button 
                    onClick={clearCalculation} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-clear-age"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">How it works</span>
                  </div>
                  <p className="text-blue-700">
                    Our calculator provides precise age calculations including leap years and updates in real-time. 
                    All calculations happen in your browser for complete privacy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-line text-accent"></i>
                  <span>Your Age Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="age-results">
                    {/* Main Age Display */}
                    <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white text-center">
                      <h2 className="text-2xl font-bold mb-2" data-testid="main-age">
                        {result.years} years, {result.months} months, {result.days} days
                      </h2>
                      <p className="text-blue-100">
                        {result.hours} hours, {result.minutes} minutes, {result.seconds} seconds
                      </p>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-primary" data-testid="total-days">
                          {result.totalDays.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Total Days</div>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-accent" data-testid="total-hours">
                          {result.totalHours.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Total Hours</div>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600" data-testid="total-minutes">
                          {result.totalMinutes.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Total Minutes</div>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-orange-600" data-testid="total-seconds">
                          {result.totalSeconds.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Total Seconds</div>
                      </div>
                    </div>

                    {/* Next Birthday */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-gift text-yellow-600"></i>
                        <span className="font-medium text-yellow-800">Next Birthday</span>
                      </div>
                      <p className="text-yellow-700" data-testid="next-birthday">
                        Your next birthday is in <strong>{result.nextBirthdayDays} days</strong>!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-calendar-plus text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Your Birth Date</h3>
                    <p className="text-slate-500">
                      Select your birth date above to calculate your exact age
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
                <CardTitle className="text-lg">Why Use Our Age Calculator?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Precise calculations including leap years</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Real-time updates every second</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Shows age in multiple formats</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Calculates days until next birthday</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Complete privacy - no data stored</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Common Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-birthday-cake text-purple-500 mt-1"></i>
                    <span>Planning birthday celebrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-file-alt text-blue-500 mt-1"></i>
                    <span>Filling out forms and applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Calculating relationship milestones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-graduation-cap text-green-500 mt-1"></i>
                    <span>School and work eligibility</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calculator text-orange-500 mt-1"></i>
                    <span>General curiosity and fun facts</span>
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
