import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LapTime {
  id: number;
  time: number;
  lapDuration: number;
  timestamp: Date;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    document.title = "Stopwatch Tool - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Precise online stopwatch with millisecond accuracy, lap times, and statistics for timing activities.');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - startTimeRef.current + pausedTimeRef.current);
      }, 10);
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
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (isRunning) {
      pausedTimeRef.current = time;
      setIsRunning(false);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    pausedTimeRef.current = 0;
    setLapTimes([]);
  };

  const addLap = () => {
    if (isRunning && time > 0) {
      const currentTime = time;
      const previousLapTime = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0;
      const lapDuration = currentTime - previousLapTime;
      
      const newLap: LapTime = {
        id: lapTimes.length + 1,
        time: currentTime,
        lapDuration,
        timestamp: new Date()
      };
      
      setLapTimes(prev => [...prev, newLap]);
    }
  };

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const formatTimeDetailed = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s ${ms}ms`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s ${ms}ms`;
    } else {
      return `${seconds}s ${ms}ms`;
    }
  };

  const getStatistics = () => {
    if (lapTimes.length === 0) return null;
    
    const lapDurations = lapTimes.map(lap => lap.lapDuration);
    const fastest = Math.min(...lapDurations);
    const slowest = Math.max(...lapDurations);
    const average = lapDurations.reduce((sum, duration) => sum + duration, 0) / lapDurations.length;
    
    return { fastest, slowest, average };
  };

  const statistics = getStatistics();

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-stopwatch text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="stopwatch-title">
              Stopwatch Tool
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="stopwatch-subtitle">
              Precise online stopwatch with millisecond accuracy, lap times, and statistics for timing activities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Stopwatch Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-clock text-primary"></i>
                  <span>Stopwatch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Time Display */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-6">
                    <div className="text-6xl md:text-7xl font-mono font-bold mb-2" data-testid="time-display">
                      {formatTime(time)}
                    </div>
                    <div className="text-slate-300 text-sm">
                      {formatTimeDetailed(time)}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center">
                  {!isRunning ? (
                    <Button 
                      onClick={start}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
                      data-testid="button-start"
                    >
                      <i className="fas fa-play mr-2"></i>
                      Start
                    </Button>
                  ) : (
                    <Button 
                      onClick={pause}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg"
                      data-testid="button-pause"
                    >
                      <i className="fas fa-pause mr-2"></i>
                      Pause
                    </Button>
                  )}

                  <Button 
                    onClick={addLap}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                    disabled={!isRunning || time === 0}
                    data-testid="button-lap"
                  >
                    <i className="fas fa-flag mr-2"></i>
                    Lap
                  </Button>

                  <Button 
                    onClick={reset}
                    variant="outline"
                    className="px-8 py-3 text-lg"
                    data-testid="button-reset"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Reset
                  </Button>
                </div>

                {/* Status */}
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    isRunning 
                      ? 'bg-green-100 text-green-800' 
                      : time > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-slate-100 text-slate-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      isRunning ? 'bg-green-500' : time > 0 ? 'bg-yellow-500' : 'bg-slate-500'
                    }`}></div>
                    {isRunning ? 'Running' : time > 0 ? 'Paused' : 'Stopped'}
                  </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <i className="fas fa-keyboard text-blue-600"></i>
                    <span className="font-medium text-blue-800">Keyboard Shortcuts</span>
                  </div>
                  <div className="space-y-1 text-blue-700">
                    <div className="flex justify-between">
                      <span>Space:</span>
                      <span>Start/Pause</span>
                    </div>
                    <div className="flex justify-between">
                      <span>L:</span>
                      <span>Add Lap</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R:</span>
                      <span>Reset</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lap Times & Statistics */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-list text-accent"></i>
                  <span>Lap Times & Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statistics && (
                  <div className="mb-6">
                    <h4 className="font-medium text-slate-800 mb-4">Lap Statistics</h4>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-600 mb-1">Fastest</div>
                        <div className="font-mono text-green-800 font-semibold" data-testid="fastest-lap">
                          {formatTime(statistics.fastest)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-600 mb-1">Average</div>
                        <div className="font-mono text-blue-800 font-semibold" data-testid="average-lap">
                          {formatTime(statistics.average)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-sm text-red-600 mb-1">Slowest</div>
                        <div className="font-mono text-red-800 font-semibold" data-testid="slowest-lap">
                          {formatTime(statistics.slowest)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {lapTimes.length > 0 ? (
                  <div className="space-y-2" data-testid="lap-times">
                    <h4 className="font-medium text-slate-800 mb-3">
                      Lap Times ({lapTimes.length})
                    </h4>
                    <div className="max-h-80 overflow-y-auto space-y-2">
                      {lapTimes.slice().reverse().map((lap, index) => {
                        const isFastest = statistics && lap.lapDuration === statistics.fastest;
                        const isSlowest = statistics && lap.lapDuration === statistics.slowest;
                        
                        return (
                          <div 
                            key={lap.id} 
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              isFastest ? 'bg-green-50 border-green-200' :
                              isSlowest ? 'bg-red-50 border-red-200' : 
                              'bg-slate-50 border-slate-200'
                            }`}
                            data-testid={`lap-${lap.id}`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                isFastest ? 'bg-green-500 text-white' :
                                isSlowest ? 'bg-red-500 text-white' : 
                                'bg-slate-500 text-white'
                              }`}>
                                #{lap.id}
                              </span>
                              <div>
                                <div className="font-mono font-semibold text-slate-800">
                                  {formatTime(lap.lapDuration)}
                                </div>
                                <div className="text-xs text-slate-500">
                                  Total: {formatTime(lap.time)}
                                </div>
                              </div>
                            </div>
                            {isFastest && <i className="fas fa-trophy text-green-500"></i>}
                            {isSlowest && <i className="fas fa-snail text-red-500"></i>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-laps">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-flag text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No Lap Times Yet</h3>
                    <p className="text-slate-500">
                      Start the stopwatch and add lap times to see statistics
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
                    <i className="fas fa-running text-blue-500 mt-1"></i>
                    <span>Running and athletic training</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-dumbbell text-green-500 mt-1"></i>
                    <span>Workout intervals and rest periods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-utensils text-orange-500 mt-1"></i>
                    <span>Cooking and baking timing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-briefcase text-purple-500 mt-1"></i>
                    <span>Work productivity tracking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-gamepad text-red-500 mt-1"></i>
                    <span>Gaming and speedrun timing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-stopwatch text-blue-500 mt-1"></i>
                    <span>Millisecond precision timing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-flag text-green-500 mt-1"></i>
                    <span>Unlimited lap time recording</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-chart-bar text-purple-500 mt-1"></i>
                    <span>Automatic lap statistics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-keyboard text-orange-500 mt-1"></i>
                    <span>Keyboard shortcuts support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-mobile-alt text-red-500 mt-1"></i>
                    <span>Works on all devices</span>
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