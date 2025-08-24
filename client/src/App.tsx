import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import Disclaimer from "@/pages/disclaimer";
import CookiePolicy from "@/pages/cookie-policy";
import AgeCalculator from "@/pages/tools/age-calculator";
import BmiCalculator from "@/pages/tools/bmi-calculator";
import BmrCalculator from "@/pages/tools/bmr-calculator";
import PercentageCalculator from "@/pages/tools/percentage-calculator";
import TipCalculator from "@/pages/tools/tip-calculator";
import SimpleInterestCalculator from "@/pages/tools/simple-interest-calculator";
import DiscountCalculator from "@/pages/tools/discount-calculator";
import LoanEmiCalculator from "@/pages/tools/loan-emi-calculator";
import DateDifferenceCalculator from "@/pages/tools/date-difference-calculator";
import RandomJokeGenerator from "@/pages/tools/random-joke-generator";
import IdealWeightCalculator from "@/pages/tools/ideal-weight-calculator";
import WaterIntakeCalculator from "@/pages/tools/water-intake-calculator";
import MacroNutrientCalculator from "@/pages/tools/macro-nutrient-calculator";
import HeartRateZoneCalculator from "@/pages/tools/heart-rate-zone-calculator";
import BACCalculator from "@/pages/tools/bac-calculator";
import StepCalorieConverter from "@/pages/tools/step-calorie-converter";
import ProteinIntakeCalculator from "@/pages/tools/protein-intake-calculator";
import SleepCycleCalculator from "@/pages/tools/sleep-cycle-calculator";
import BodySurfaceAreaCalculator from "@/pages/tools/body-surface-area-calculator";
import TemperatureConverter from "@/pages/tools/temperature-converter";
import LengthConverter from "@/pages/tools/length-converter";
import WeightConverter from "@/pages/tools/weight-converter";
import WordCounter from "@/pages/tools/word-counter";
import RandomPasswordGenerator from "@/pages/tools/random-password-generator";
import TextCaseConverter from "@/pages/tools/text-case-converter";
import QRCodeGenerator from "@/pages/tools/qr-code-generator";
import CurrencyConverter from "@/pages/tools/currency-converter";
import Base64EncoderDecoder from "@/pages/tools/base64-encoder-decoder";
import CharacterCounter from "@/pages/tools/character-counter";
import LoremIpsumGenerator from "@/pages/tools/lorem-ipsum-generator";
import PalindromeChecker from "@/pages/tools/palindrome-checker";
import TimezoneConverter from "@/pages/tools/timezone-converter";
import CountdownTimer from "@/pages/tools/countdown-timer";
import WorldClock from "@/pages/tools/world-clock";
import RemoveExtraSpaces from "@/pages/tools/remove-extra-spaces";
import ReverseTextGenerator from "@/pages/tools/reverse-text-generator";
import SpeedConverter from "@/pages/tools/speed-converter";
import AreaConverter from "@/pages/tools/area-converter";
import VolumeConverter from "@/pages/tools/volume-converter";
import AgeInDaysCalculator from "@/pages/tools/age-in-days-calculator";
import Stopwatch from "@/pages/tools/stopwatch";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/tools/age-calculator" component={AgeCalculator} />
      <Route path="/tools/bmi-calculator" component={BmiCalculator} />
      <Route path="/tools/bmr-calculator" component={BmrCalculator} />
      <Route path="/tools/percentage-calculator" component={PercentageCalculator} />
      <Route path="/tools/tip-calculator" component={TipCalculator} />
      <Route path="/tools/simple-interest-calculator" component={SimpleInterestCalculator} />
      <Route path="/tools/discount-calculator" component={DiscountCalculator} />
      <Route path="/tools/loan-emi-calculator" component={LoanEmiCalculator} />
      <Route path="/tools/date-difference-calculator" component={DateDifferenceCalculator} />
      <Route path="/tools/random-joke-generator" component={RandomJokeGenerator} />
      <Route path="/tools/ideal-weight-calculator" component={IdealWeightCalculator} />
      <Route path="/tools/water-intake-calculator" component={WaterIntakeCalculator} />
      <Route path="/tools/macro-nutrient-calculator" component={MacroNutrientCalculator} />
      <Route path="/tools/heart-rate-zone-calculator" component={HeartRateZoneCalculator} />
      <Route path="/tools/bac-calculator" component={BACCalculator} />
      <Route path="/tools/step-calorie-converter" component={StepCalorieConverter} />
      <Route path="/tools/protein-intake-calculator" component={ProteinIntakeCalculator} />
      <Route path="/tools/sleep-cycle-calculator" component={SleepCycleCalculator} />
      <Route path="/tools/body-surface-area-calculator" component={BodySurfaceAreaCalculator} />
      <Route path="/tools/temperature-converter" component={TemperatureConverter} />
      <Route path="/tools/length-converter" component={LengthConverter} />
      <Route path="/tools/weight-converter" component={WeightConverter} />
      <Route path="/tools/word-counter" component={WordCounter} />
      <Route path="/tools/random-password-generator" component={RandomPasswordGenerator} />
      <Route path="/tools/text-case-converter" component={TextCaseConverter} />
      <Route path="/tools/qr-code-generator" component={QRCodeGenerator} />
      <Route path="/tools/currency-converter" component={CurrencyConverter} />
      <Route path="/tools/base64-encoder-decoder" component={Base64EncoderDecoder} />
      <Route path="/tools/character-counter" component={CharacterCounter} />
      <Route path="/tools/lorem-ipsum-generator" component={LoremIpsumGenerator} />
      <Route path="/tools/palindrome-checker" component={PalindromeChecker} />
      <Route path="/tools/timezone-converter" component={TimezoneConverter} />
      <Route path="/tools/countdown-timer" component={CountdownTimer} />
      <Route path="/tools/world-clock" component={WorldClock} />
      <Route path="/tools/remove-extra-spaces" component={RemoveExtraSpaces} />
      <Route path="/tools/reverse-text-generator" component={ReverseTextGenerator} />
      <Route path="/tools/speed-converter" component={SpeedConverter} />
      <Route path="/tools/area-converter" component={AreaConverter} />
      <Route path="/tools/volume-converter" component={VolumeConverter} />
      <Route path="/tools/age-in-days-calculator" component={AgeInDaysCalculator} />
      <Route path="/tools/stopwatch" component={Stopwatch} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
