import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SleepTime {
  time: string;
  cycles: number;
  quality: string;
  description: string;
}

interface SleepResult {
  targetBedtime: string;
  wakeUpTimes: SleepTime[];
  bedtimes: SleepTime[];
  idealSleepDuration: number;
  cyclesCompleted: number;
}

export default function SleepCycleCalculator() {
  const [calculationType, setCalculationType] = useState("wake_up");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<SleepResult | null>(null);

  useEffect(() => {
    document.title = "Sleep Cycle Calculator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate optimal sleep and wake times based on 90-minute sleep cycles. Improve sleep quality with our free sleep calculator.');
    }
  }, []);

  const calculateSleepCycles = () => {
    if (calculationType === "wake_up" && !wakeUpTime) return;
    if (calculationType === "bed_time" && !bedTime) return;
    if (!age) return;

    const ageNum = parseInt(age);
    const cycleLength = 90; // minutes
    const fallAsleepTime = 15; // average time to fall asleep

    // Recommended sleep duration by age
    let recommendedHours: number;
    if (ageNum < 1) recommendedHours = 14;
    else if (ageNum <= 2) recommendedHours = 12;
    else if (ageNum <= 5) recommendedHours = 11;
    else if (ageNum <= 13) recommendedHours = 10;
    else if (ageNum <= 17) recommendedHours = 9;
    else if (ageNum <= 64) recommendedHours = 8;
    else recommendedHours = 7;

    const recommendedMinutes = recommendedHours * 60;

    let targetTime: Date;
    let calculatedTimes: SleepTime[] = [];

    if (calculationType === "wake_up") {
      // Calculate bedtimes for given wake up time
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      targetTime = new Date();
      targetTime.setHours(hours, minutes, 0, 0);

      // Calculate optimal bedtimes (working backwards)
      const cycleCounts = [4, 5, 6]; // Most common optimal cycle counts
      
      cycleCounts.forEach(cycles => {
        const totalSleepTime = cycles * cycleLength;
        const timeToGoToBed = totalSleepTime + fallAsleepTime;
        
        const bedtime = new Date(targetTime.getTime() - timeToGoToBed * 60000);
        
        // Handle previous day
        if (bedtime.getDate() !== targetTime.getDate()) {
          bedtime.setDate(bedtime.getDate() + 1);
        }

        const quality = cycles === 5 ? "Optimal" : cycles === 6 ? "Good" : "Minimum";
        const description = getQualityDescription(cycles);

        calculatedTimes.push({
          time: bedtime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          cycles,
          quality,
          description
        });
      });

      setResult({
        targetBedtime: "",
        wakeUpTimes: [],
        bedtimes: calculatedTimes,
        idealSleepDuration: recommendedHours,
        cyclesCompleted: 5
      });

    } else {
      // Calculate wake up times for given bedtime
      const [hours, minutes] = bedTime.split(':').map(Number);
      targetTime = new Date();
      targetTime.setHours(hours, minutes, 0, 0);
      
      // Add fall asleep time
      const sleepStartTime = new Date(targetTime.getTime() + fallAsleepTime * 60000);

      const cycleCounts = [4, 5, 6]; // Most common optimal cycle counts

      cycleCounts.forEach(cycles => {
        const totalSleepTime = cycles * cycleLength;
        const wakeTime = new Date(sleepStartTime.getTime() + totalSleepTime * 60000);
        
        // Handle next day
        if (wakeTime.getDate() !== targetTime.getDate()) {
          wakeTime.setDate(wakeTime.getDate() + 1);
        }

        const quality = cycles === 5 ? "Optimal" : cycles === 6 ? "Good" : "Minimum";
        const description = getQualityDescription(cycles);

        calculatedTimes.push({
          time: wakeTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          cycles,
          quality,
          description
        });
      });

      setResult({
        targetBedtime: targetTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        wakeUpTimes: calculatedTimes,
        bedtimes: [],
        idealSleepDuration: recommendedHours,
        cyclesCompleted: 5
      });
    }
  };

  const getQualityDescription = (cycles: number): string => {
    switch (cycles) {
      case 4: return "Short but complete cycles - minimum rest";
      case 5: return "Ideal balance of rest and alertness";
      case 6: return "Longer rest - good for recovery days";
      default: return "Complete sleep cycles";
    }
  };

  const clearCalculation = () => {
    setWakeUpTime("");
    setBedTime("");
    setAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-bed text-indigo-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="sleep-calc-title">
              Sleep Cycle Calculator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="sleep-calc-subtitle">
              Calculate optimal sleep and wake times based on 90-minute sleep cycles for better rest
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-clock text-primary"></i>
                  <span>Sleep Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="calculationType" className="text-sm font-medium text-slate-700 mb-2 block">
                    What would you like to calculate?
                  </Label>
                  <Select value={calculationType} onValueChange={setCalculationType} data-testid="select-calc-type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wake_up">I know when I want to wake up</SelectItem>
                      <SelectItem value="bed_time">I know when I'm going to bed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-slate-700 mb-2 block">
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full"
                    placeholder="25"
                    min="1"
                    max="120"
                    data-testid="input-age"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Used to calculate recommended sleep duration
                  </p>
                </div>

                {calculationType === "wake_up" ? (
                  <div>
                    <Label htmlFor="wakeUpTime" className="text-sm font-medium text-slate-700 mb-2 block">
                      Desired Wake Up Time
                    </Label>
                    <Input
                      id="wakeUpTime"
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                      className="w-full text-lg"
                      data-testid="input-wake-time"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      We'll calculate when you should go to bed
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="bedTime" className="text-sm font-medium text-slate-700 mb-2 block">
                      Planned Bedtime
                    </Label>
                    <Input
                      id="bedTime"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      className="w-full text-lg"
                      data-testid="input-bed-time"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      We'll calculate optimal wake up times
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={calculateSleepCycles} 
                    className="flex-1 bg-primary hover:bg-blue-600 text-white"
                    disabled={!age || (calculationType === "wake_up" ? !wakeUpTime : !bedTime)}
                    data-testid="button-calculate"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Calculate Sleep Times
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

                {/* Sleep Cycle Info */}
                <div className="bg-indigo-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-indigo-600"></i>
                    <span className="font-medium text-indigo-800">About Sleep Cycles</span>
                  </div>
                  <div className="text-indigo-700 space-y-1 text-xs">
                    <p>• Each sleep cycle lasts about 90 minutes</p>
                    <p>• Waking up at the end of a cycle feels more refreshing</p>
                    <p>• Most adults need 4-6 complete cycles per night</p>
                    <p>• It takes about 15 minutes to fall asleep</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-chart-line text-accent"></i>
                  <span>Optimal Sleep Times</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6" data-testid="sleep-results">
                    {/* Recommended Sleep Duration */}
                    <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
                      <h2 className="text-2xl font-bold mb-2" data-testid="ideal-sleep-duration">
                        {result.idealSleepDuration} hours
                      </h2>
                      <p className="text-indigo-100">Recommended for your age</p>
                    </div>

                    {/* Optimal Times */}
                    <Tabs defaultValue="times" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="times">
                          {calculationType === "wake_up" ? "Bedtimes" : "Wake Times"}
                        </TabsTrigger>
                        <TabsTrigger value="tips">Sleep Tips</TabsTrigger>
                      </TabsList>

                      <TabsContent value="times" className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800">
                            {calculationType === "wake_up" 
                              ? `To wake up at ${wakeUpTime}, go to bed at:` 
                              : `Going to bed at ${result.targetBedtime}, wake up at:`
                            }
                          </h4>
                          
                          {(calculationType === "wake_up" ? result.bedtimes : result.wakeUpTimes).map((timeSlot, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border hover:shadow-md transition-shadow">
                              <div>
                                <div className="font-bold text-lg text-slate-800" data-testid={`time-${index}`}>
                                  {timeSlot.time}
                                </div>
                                <div className="text-sm text-slate-600">
                                  {timeSlot.cycles} cycles • {timeSlot.quality}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {timeSlot.description}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  timeSlot.quality === "Optimal" 
                                    ? "bg-green-100 text-green-800" 
                                    : timeSlot.quality === "Good"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {timeSlot.quality}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {(timeSlot.cycles * 1.5).toFixed(1)}h sleep
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <h4 className="font-semibold text-green-800 mb-2">💡 Best Choice</h4>
                          <p className="text-sm text-green-700">
                            The <strong>5-cycle option</strong> is typically optimal for most adults, 
                            providing 7.5 hours of sleep plus time to fall asleep.
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="tips" className="space-y-4">
                        <div className="space-y-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-800 mb-3">Better Sleep Hygiene</h4>
                            <ul className="space-y-2 text-sm text-blue-700">
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-mobile-alt text-blue-600 mt-1"></i>
                                <span>No screens 1 hour before bedtime</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-thermometer-half text-blue-600 mt-1"></i>
                                <span>Keep room cool (60-67°F / 15-19°C)</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-eye-slash text-blue-600 mt-1"></i>
                                <span>Dark, quiet environment</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-coffee text-blue-600 mt-1"></i>
                                <span>No caffeine 6+ hours before bed</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <i className="fas fa-clock text-blue-600 mt-1"></i>
                                <span>Consistent sleep schedule, even on weekends</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                            <h4 className="font-semibold text-purple-800 mb-3">Pre-Sleep Routine</h4>
                            <div className="space-y-2 text-sm text-purple-700">
                              <div className="flex justify-between">
                                <span>2 hours before:</span>
                                <span className="font-medium">Last large meal</span>
                              </div>
                              <div className="flex justify-between">
                                <span>1 hour before:</span>
                                <span className="font-medium">No screens, dim lights</span>
                              </div>
                              <div className="flex justify-between">
                                <span>30 min before:</span>
                                <span className="font-medium">Relaxing activity (reading, bath)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>15 min before:</span>
                                <span className="font-medium">Deep breathing, meditation</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <h4 className="font-semibold text-orange-800 mb-3">If You Can't Fall Asleep</h4>
                            <ul className="space-y-1 text-sm text-orange-700">
                              <li>• Don't check the time - increases anxiety</li>
                              <li>• Try the 4-7-8 breathing technique</li>
                              <li>• Progressive muscle relaxation</li>
                              <li>• If awake 20+ minutes, get up and do quiet activity</li>
                              <li>• Return to bed when sleepy</li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Sleep Quality Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">Individual Variation</p>
                          <p className="text-yellow-700">
                            Sleep cycles can vary between 70-120 minutes per person. These calculations 
                            use the average 90-minute cycle. Pay attention to how you feel and adjust 
                            timing as needed for your personal sleep patterns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-bed text-slate-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Enter Sleep Information</h3>
                    <p className="text-slate-500">
                      Fill in your age and desired time to calculate optimal sleep schedule
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
                <CardTitle className="text-lg">Sleep Stages Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">NREM Stage 1 (5%):</h5>
                    <p>Light sleep, easy to wake, transition from wake to sleep</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">NREM Stage 2 (45%):</h5>
                    <p>Deeper sleep, heart rate and breathing slow, body temperature drops</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">NREM Stage 3 (25%):</h5>
                    <p>Deep sleep, physical restoration, growth hormone release</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">REM Sleep (25%):</h5>
                    <p>Dreams, memory consolidation, brain restoration and learning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Sleep Needs by Age</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Newborn (0-3 months):</span>
                    <span className="font-medium">14-17 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infant (4-11 months):</span>
                    <span className="font-medium">12-15 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toddler (1-2 years):</span>
                    <span className="font-medium">11-14 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preschool (3-5 years):</span>
                    <span className="font-medium">10-13 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>School age (6-13 years):</span>
                    <span className="font-medium">9-11 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teen (14-17 years):</span>
                    <span className="font-medium">8-10 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Young adult (18-25):</span>
                    <span className="font-medium">7-9 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adult (26-64 years):</span>
                    <span className="font-medium">7-9 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Older adult (65+ years):</span>
                    <span className="font-medium">7-8 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Tool Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Sweet Dreams!</h3>
                <p className="mb-4 text-yellow-100">
                  Sleep schedule optimized! Need a quick laugh before bedtime?
                </p>
                <a 
                  href="/tools/random-joke-generator" 
                  className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                  data-testid="button-fun-tool"
                >
                  <i className="fas fa-laugh mr-2"></i>
                  Get a Random Joke
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}