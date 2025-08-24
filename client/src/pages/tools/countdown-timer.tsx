import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.title = "Countdown Timer Generator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create custom countdown timers for events, deadlines, or special occasions with real-time updates.');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && !isFinished) {
      intervalRef.current = setInterval(() => {
        updateCountdown();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isFinished, targetDate, targetTime]);

  const updateCountdown = () => {
    if (!targetDate || !targetTime) return;

    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      setIsFinished(true);
      setIsActive(false);
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
      });
      
      // Show notification if available
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Countdown Finished!", {
          body: eventName ? `${eventName} time has arrived!` : "Your countdown has finished!",
          icon: "/favicon.ico"
        });
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds,
      total: difference
    });
  };

  const startCountdown = () => {
    if (!targetDate || !targetTime) return;

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();

    if (target <= now) {
      alert("Please select a future date and time!");
      return;
    }

    setIsActive(true);
    setIsFinished(false);
    updateCountdown();

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const stopCountdown = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetCountdown = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeRemaining(null);
    setTargetDate("");
    setTargetTime("");
    setEventName("");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const setQuickTimer = (hours: number) => {
    const now = new Date();
    now.setHours(now.getHours() + hours);
    setTargetDate(now.toISOString().split('T')[0]);
    setTargetTime(now.toTimeString().slice(0, 5));
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-hourglass-half text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="countdown-title">
              Countdown Timer Generator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="countdown-subtitle">
              Create custom countdown timers for events, deadlines, or special occasions with real-time updates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Setup Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-calendar-plus text-primary"></i>
                  <span>Set Target Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="eventName" className="text-sm font-medium text-slate-700 mb-2 block">
                    Event Name (Optional)
                  </Label>
                  <Input
                    id="eventName"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full"
                    placeholder="New Year's Day, Project Deadline, etc."
                    data-testid="input-event-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetDate" className="text-sm font-medium text-slate-700 mb-2 block">
                      Target Date
                    </Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                      data-testid="input-target-date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetTime" className="text-sm font-medium text-slate-700 mb-2 block">
                      Target Time
                    </Label>
                    <Input
                      id="targetTime"
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="w-full"
                      data-testid="input-target-time"
                    />
                  </div>
                </div>

                {/* Quick Timer Buttons */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Quick Timers
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      onClick={() => setQuickTimer(1)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      data-testid="quick-1h"
                    >
                      1h
                    </Button>
                    <Button
                      onClick={() => setQuickTimer(6)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      data-testid="quick-6h"
                    >
                      6h
                    </Button>
                    <Button
                      onClick={() => setQuickTimer(24)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      data-testid="quick-1d"
                    >
                      1 day
                    </Button>
                    <Button
                      onClick={() => setQuickTimer(168)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      data-testid="quick-1w"
                    >
                      1 week
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  {!isActive ? (
                    <Button 
                      onClick={startCountdown} 
                      className="flex-1 bg-primary hover:bg-blue-600 text-white"
                      disabled={!targetDate || !targetTime}
                      data-testid="button-start"
                    >
                      <i className="fas fa-play mr-2"></i>
                      Start Countdown
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopCountdown} 
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      data-testid="button-stop"
                    >
                      <i className="fas fa-stop mr-2"></i>
                      Stop
                    </Button>
                  )}
                  
                  <Button 
                    onClick={resetCountdown} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-reset"
                  >
                    <i className="fas fa-redo"></i>
                  </Button>
                </div>

                {/* Timer Info */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <span className="font-medium text-blue-800">Timer Features</span>
                  </div>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Real-time countdown updates</li>
                    <li>• Browser notifications when finished</li>
                    <li>• Works even when tab is not active</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Timer Display Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-stopwatch text-accent"></i>
                  <span>Countdown Display</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {timeRemaining ? (
                  <div className="space-y-6" data-testid="countdown-display">
                    {/* Event Name */}
                    {eventName && (
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">{eventName}</h3>
                      </div>
                    )}

                    {/* Countdown Display */}
                    {!isFinished ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl text-white">
                          <div className="text-3xl font-bold" data-testid="days-display">
                            {timeRemaining.days}
                          </div>
                          <div className="text-sm text-red-100">Days</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                          <div className="text-3xl font-bold" data-testid="hours-display">
                            {timeRemaining.hours}
                          </div>
                          <div className="text-sm text-orange-100">Hours</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl text-white">
                          <div className="text-3xl font-bold" data-testid="minutes-display">
                            {timeRemaining.minutes}
                          </div>
                          <div className="text-sm text-yellow-100">Minutes</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl text-white">
                          <div className="text-3xl font-bold" data-testid="seconds-display">
                            {timeRemaining.seconds}
                          </div>
                          <div className="text-sm text-green-100">Seconds</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8" data-testid="finished-display">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-check text-green-600 text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Time's Up!</h3>
                        <p className="text-slate-600">
                          {eventName ? `${eventName} has arrived!` : "Your countdown has finished!"}
                        </p>
                      </div>
                    )}

                    {/* Target Date Display */}
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <div className="text-sm text-slate-600 mb-1">Target Date & Time</div>
                      <div className="font-medium text-slate-800">
                        {new Date(`${targetDate}T${targetTime}`).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-timer">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-hourglass text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Set Your Target</h3>
                    <p className="text-slate-500">
                      Choose a date and time to start your countdown
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
                <CardTitle className="text-lg">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-birthday-cake text-pink-500 mt-1"></i>
                    <span>Birthday parties and celebrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-calendar-check text-blue-500 mt-1"></i>
                    <span>Project deadlines and milestones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Anniversaries and special occasions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-rocket text-purple-500 mt-1"></i>
                    <span>Product launches and events</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-graduation-cap text-green-500 mt-1"></i>
                    <span>Exam dates and important deadlines</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tips & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-bell text-yellow-500 mt-1"></i>
                    <span>Enable notifications for completion alerts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-sync text-blue-500 mt-1"></i>
                    <span>Timer continues running in background</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mobile-alt text-green-500 mt-1"></i>
                    <span>Works on desktop and mobile devices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-share text-purple-500 mt-1"></i>
                    <span>Bookmark the page to save your timer</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-clock text-orange-500 mt-1"></i>
                    <span>Use quick timers for common durations</span>
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