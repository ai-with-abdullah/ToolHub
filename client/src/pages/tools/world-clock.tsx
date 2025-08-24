import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorldClock {
  id: string;
  timezone: string;
  city: string;
  country: string;
  time: string;
  date: string;
  offset: string;
}

const worldTimeZones = [
  { value: "America/New_York", city: "New York", country: "USA" },
  { value: "America/Los_Angeles", city: "Los Angeles", country: "USA" },
  { value: "America/Chicago", city: "Chicago", country: "USA" },
  { value: "America/Denver", city: "Denver", country: "USA" },
  { value: "UTC", city: "UTC", country: "Coordinated Universal Time" },
  { value: "Europe/London", city: "London", country: "UK" },
  { value: "Europe/Paris", city: "Paris", country: "France" },
  { value: "Europe/Berlin", city: "Berlin", country: "Germany" },
  { value: "Europe/Rome", city: "Rome", country: "Italy" },
  { value: "Europe/Madrid", city: "Madrid", country: "Spain" },
  { value: "Asia/Tokyo", city: "Tokyo", country: "Japan" },
  { value: "Asia/Shanghai", city: "Shanghai", country: "China" },
  { value: "Asia/Hong_Kong", city: "Hong Kong", country: "Hong Kong" },
  { value: "Asia/Singapore", city: "Singapore", country: "Singapore" },
  { value: "Asia/Kolkata", city: "Mumbai", country: "India" },
  { value: "Asia/Dubai", city: "Dubai", country: "UAE" },
  { value: "Australia/Sydney", city: "Sydney", country: "Australia" },
  { value: "Australia/Melbourne", city: "Melbourne", country: "Australia" },
  { value: "Pacific/Auckland", city: "Auckland", country: "New Zealand" },
  { value: "America/Sao_Paulo", city: "São Paulo", country: "Brazil" },
  { value: "America/Mexico_City", city: "Mexico City", country: "Mexico" },
  { value: "America/Toronto", city: "Toronto", country: "Canada" },
  { value: "Africa/Cairo", city: "Cairo", country: "Egypt" },
  { value: "Africa/Johannesburg", city: "Johannesburg", country: "South Africa" },
  { value: "Asia/Seoul", city: "Seoul", country: "South Korea" },
  { value: "Asia/Bangkok", city: "Bangkok", country: "Thailand" },
  { value: "Europe/Moscow", city: "Moscow", country: "Russia" },
  { value: "America/Argentina/Buenos_Aires", city: "Buenos Aires", country: "Argentina" }
];

export default function WorldClock() {
  const [clocks, setClocks] = useState<WorldClock[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.title = "World Clock Tool - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View current time in major cities worldwide. Real-time world clock with multiple time zones.');
    }

    // Add default clocks
    const defaultTimezones = [
      "UTC",
      "America/New_York", 
      "Europe/London",
      "Asia/Tokyo"
    ];

    const defaultClocks = defaultTimezones.map((tz, index) => {
      const tzInfo = worldTimeZones.find(zone => zone.value === tz)!;
      return createClock(tz, tzInfo.city, tzInfo.country, `default-${index}`);
    });

    setClocks(defaultClocks);

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update all clocks when current time changes
    setClocks(prevClocks => 
      prevClocks.map(clock => updateClockTime(clock))
    );
  }, [currentTime]);

  const createClock = (timezone: string, city: string, country: string, id: string): WorldClock => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const dateString = now.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const offset = getTimezoneOffset(timezone);

    return {
      id,
      timezone,
      city,
      country,
      time: timeString,
      date: dateString,
      offset
    };
  };

  const updateClockTime = (clock: WorldClock): WorldClock => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: clock.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const dateString = now.toLocaleDateString('en-US', {
      timeZone: clock.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    return {
      ...clock,
      time: timeString,
      date: dateString
    };
  };

  const getTimezoneOffset = (timezone: string): string => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (getOffsetMinutes(timezone) * 60000));
    const offsetMinutes = getOffsetMinutes(timezone);
    const hours = Math.floor(Math.abs(offsetMinutes) / 60);
    const minutes = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes >= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getOffsetMinutes = (timezone: string): number => {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
    return (targetTime.getTime() - utc.getTime()) / 60000;
  };

  const addClock = () => {
    if (!selectedTimezone) return;
    
    // Check if timezone already exists
    if (clocks.some(clock => clock.timezone === selectedTimezone)) {
      alert("This timezone is already added!");
      return;
    }

    const tzInfo = worldTimeZones.find(zone => zone.value === selectedTimezone);
    if (!tzInfo) return;

    const newClock = createClock(
      selectedTimezone, 
      tzInfo.city, 
      tzInfo.country,
      `clock-${Date.now()}`
    );

    setClocks(prev => [...prev, newClock]);
    setSelectedTimezone("");
  };

  const removeClock = (id: string) => {
    setClocks(prev => prev.filter(clock => clock.id !== id));
  };

  const getClockGradient = (index: number): string => {
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-green-500 to-emerald-600", 
      "from-purple-500 to-pink-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
      "from-yellow-500 to-orange-600",
      "from-red-500 to-pink-600",
      "from-indigo-500 to-purple-600"
    ];
    return gradients[index % gradients.length];
  };

  const isDaytime = (timezone: string): boolean => {
    const now = new Date();
    const hour = parseInt(now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      hour12: false
    }));
    return hour >= 6 && hour < 18;
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-globe text-cyan-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="world-clock-title">
              World Clock Tool
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="world-clock-subtitle">
              View current time in major cities worldwide. Real-time world clock with multiple time zones.
            </p>
          </div>

          {/* Add New Clock */}
          <Card className="bg-white shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <i className="fas fa-plus-circle text-primary"></i>
                <span>Add World Clock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Select value={selectedTimezone} onValueChange={setSelectedTimezone} data-testid="select-timezone">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city or timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {worldTimeZones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.city}, {tz.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={addClock}
                  className="bg-primary hover:bg-blue-600 text-white"
                  disabled={!selectedTimezone}
                  data-testid="button-add-clock"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Clock
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* World Clocks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="clocks-grid">
            {clocks.map((clock, index) => (
              <Card key={clock.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${getClockGradient(index)} p-6 text-white relative`}>
                    {clocks.length > 1 && (
                      <Button
                        onClick={() => removeClock(clock.id)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 p-0"
                        data-testid={`remove-clock-${clock.id}`}
                      >
                        <i className="fas fa-times text-sm"></i>
                      </Button>
                    )}
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <i className={`fas ${isDaytime(clock.timezone) ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
                      <span className="text-sm opacity-90">{clock.offset}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1" data-testid={`clock-city-${clock.id}`}>
                      {clock.city}
                    </h3>
                    <p className="text-sm opacity-75 mb-4">{clock.country}</p>
                    
                    <div className="text-center">
                      <div className="text-3xl font-mono font-bold mb-1" data-testid={`clock-time-${clock.id}`}>
                        {clock.time}
                      </div>
                      <div className="text-sm opacity-90" data-testid={`clock-date-${clock.id}`}>
                        {clock.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {clocks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe text-slate-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No Clocks Added</h3>
              <p className="text-slate-500">
                Add your first world clock from the dropdown above
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-sync text-blue-500 mt-1"></i>
                    <span>Real-time updates every second</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-sun text-yellow-500 mt-1"></i>
                    <span>Day/night indicators for each timezone</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-plus text-green-500 mt-1"></i>
                    <span>Add multiple cities and timezones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-purple-500 mt-1"></i>
                    <span>UTC offset display for each timezone</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mobile-alt text-orange-500 mt-1"></i>
                    <span>Responsive design for all devices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-briefcase text-blue-500 mt-1"></i>
                    <span>Remote work and global teams</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-video text-green-500 mt-1"></i>
                    <span>Scheduling international meetings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-plane text-purple-500 mt-1"></i>
                    <span>Travel planning and coordination</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-phone text-orange-500 mt-1"></i>
                    <span>International calling at appropriate times</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-chart-line text-red-500 mt-1"></i>
                    <span>Global stock market monitoring</span>
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