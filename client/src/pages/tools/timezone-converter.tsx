import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversionResult {
  fromTime: string;
  toTime: string;
  fromZone: string;
  toZone: string;
  timeDifference: string;
}

const timeZones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Europe/Berlin", label: "Berlin (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" }
];

export default function TimezoneConverter() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.title = "Time Zone Converter - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert time between different time zones instantly. Perfect for scheduling meetings across time zones.');
    }

    // Set current date and time as default
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
    setTime(now.toTimeString().slice(0, 5));

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const convertTime = () => {
    if (!time || !date) return;

    try {
      // Create a date object from the input
      const inputDateTime = new Date(`${date}T${time}`);
      
      // Get the time in the source timezone
      const sourceTime = new Intl.DateTimeFormat('en-US', {
        timeZone: fromZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(inputDateTime);

      // Convert to target timezone
      const targetTime = new Intl.DateTimeFormat('en-US', {
        timeZone: toZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(inputDateTime);

      // Calculate time difference
      const fromOffset = getTimezoneOffset(fromZone);
      const toOffset = getTimezoneOffset(toZone);
      const diffHours = (toOffset - fromOffset) / 60;
      const timeDifference = diffHours >= 0 ? `+${diffHours}` : `${diffHours}`;

      setResult({
        fromTime: sourceTime,
        toTime: targetTime,
        fromZone: timeZones.find(tz => tz.value === fromZone)?.label || fromZone,
        toZone: timeZones.find(tz => tz.value === toZone)?.label || toZone,
        timeDifference: `${timeDifference} hours`
      });
    } catch (error) {
      console.error('Error converting time:', error);
    }
  };

  const getTimezoneOffset = (timezone: string) => {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
    return (targetTime.getTime() - utc.getTime()) / 60000;
  };

  const useCurrentTime = () => {
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
    setTime(now.toTimeString().slice(0, 5));
  };

  const swapTimezones = () => {
    const temp = fromZone;
    setFromZone(toZone);
    setToZone(temp);
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-globe-americas text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="timezone-title">
              Time Zone Converter
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="timezone-subtitle">
              Convert time between different time zones instantly. Perfect for scheduling meetings across time zones.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-clock text-primary"></i>
                  <span>Convert Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium text-slate-700 mb-2 block">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full"
                      data-testid="input-date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium text-slate-700 mb-2 block">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full"
                      data-testid="input-time"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fromZone" className="text-sm font-medium text-slate-700 mb-2 block">
                    From Time Zone
                  </Label>
                  <Select value={fromZone} onValueChange={setFromZone} data-testid="select-from-zone">
                    <SelectTrigger>
                      <SelectValue placeholder="Select source timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={swapTimezones}
                    variant="outline"
                    size="sm"
                    className="px-3 py-1"
                    data-testid="button-swap"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </Button>
                </div>

                <div>
                  <Label htmlFor="toZone" className="text-sm font-medium text-slate-700 mb-2 block">
                    To Time Zone
                  </Label>
                  <Select value={toZone} onValueChange={setToZone} data-testid="select-to-zone">
                    <SelectTrigger>
                      <SelectValue placeholder="Select target timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={convertTime} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!time || !date}
                    data-testid="button-convert"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Convert Time
                  </Button>
                  
                  <Button 
                    onClick={useCurrentTime} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-now"
                  >
                    <i className="fas fa-clock"></i>
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Current Time</span>
                  </div>
                  <p className="text-blue-700">
                    {currentTime.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-globe text-accent"></i>
                  <span>Conversion Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="conversion-results">
                    {/* From Time */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                      <div className="text-sm text-blue-100 mb-1">From</div>
                      <div className="text-2xl font-bold mb-1">{result.fromTime}</div>
                      <div className="text-blue-100">{result.fromZone}</div>
                    </div>

                    {/* Arrow */}
                    <div className="text-center">
                      <i className="fas fa-arrow-down text-slate-400 text-2xl"></i>
                    </div>

                    {/* To Time */}
                    <div className="bg-gradient-to-r from-accent to-green-600 rounded-2xl p-6 text-white">
                      <div className="text-sm text-green-100 mb-1">To</div>
                      <div className="text-2xl font-bold mb-1">{result.toTime}</div>
                      <div className="text-green-100">{result.toZone}</div>
                    </div>

                    {/* Time Difference */}
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <div className="text-sm text-slate-600 mb-1">Time Difference</div>
                      <div className="text-lg font-semibold text-slate-800">{result.timeDifference}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-globe text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Select Time and Zones</h3>
                    <p className="text-slate-500">
                      Choose a time and time zones to see the conversion
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
                <CardTitle className="text-lg">Popular Time Zones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {timeZones.slice(0, 6).map((tz) => (
                    <div key={tz.value} className="flex justify-between items-center">
                      <span className="text-slate-700">{tz.label}</span>
                      <span className="text-slate-500 font-mono">
                        {new Date().toLocaleTimeString('en-US', {
                          timeZone: tz.value,
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </span>
                    </div>
                  ))}
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
                    <i className="fas fa-video text-blue-500 mt-1"></i>
                    <span>Schedule international meetings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-plane text-green-500 mt-1"></i>
                    <span>Plan travel itineraries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-phone text-purple-500 mt-1"></i>
                    <span>Coordinate with global teams</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calendar text-orange-500 mt-1"></i>
                    <span>Schedule events across time zones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-handshake text-red-500 mt-1"></i>
                    <span>Plan international business calls</span>
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