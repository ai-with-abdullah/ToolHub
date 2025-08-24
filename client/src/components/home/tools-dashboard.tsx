import { Link } from "wouter";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  users: string;
  href: string;
  isActive: boolean;
}

const tools: ToolCard[] = [
  // Health & Fitness Calculators
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday.',
    icon: 'fas fa-birthday-cake',
    iconBg: 'from-primary to-blue-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '12.5k users',
    href: '/tools/age-calculator',
    isActive: true
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) and get health insights based on your height and weight measurements.',
    icon: 'fas fa-weight',
    iconBg: 'from-accent to-green-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.2k users',
    href: '/tools/bmi-calculator',
    isActive: true
  },
  {
    id: 'bmr-calculator',
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate and daily calorie needs based on activity level and personal metrics.',
    icon: 'fas fa-fire',
    iconBg: 'from-orange-500 to-red-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '6.8k users',
    href: '/tools/bmr-calculator',
    isActive: true
  },
  // Financial Calculators
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase, decrease, and find what percentage one number is of another.',
    icon: 'fas fa-percentage',
    iconBg: 'from-purple-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '9.1k users',
    href: '/tools/percentage-calculator',
    isActive: true
  },
  {
    id: 'tip-calculator',
    title: 'Tip Calculator',
    description: 'Calculate tips and split bills easily for restaurants and services. Perfect for dining out with friends.',
    icon: 'fas fa-money-bill-wave',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.3k users',
    href: '/tools/tip-calculator',
    isActive: true
  },
  {
    id: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Calculate discounts, sale prices, and total savings. Perfect for shopping and finding the best deals.',
    icon: 'fas fa-tags',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '5.9k users',
    href: '/tools/discount-calculator',
    isActive: true
  },
  {
    id: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans, deposits, and investments with detailed breakdown and projections.',
    icon: 'fas fa-percent',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '4.2k users',
    href: '/tools/simple-interest-calculator',
    isActive: true
  },
  {
    id: 'loan-emi-calculator',
    title: 'Loan EMI Calculator',
    description: 'Calculate loan EMI, monthly payments, and total interest with detailed amortization schedule.',
    icon: 'fas fa-calculator',
    iconBg: 'from-green-500 to-teal-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.7k users',
    href: '/tools/loan-emi-calculator',
    isActive: true
  },
  // Date & Time Tools
  {
    id: 'timezone-converter',
    title: 'Time Zone Converter',
    description: 'Convert time between different time zones instantly. Perfect for scheduling meetings across time zones.',
    icon: 'fas fa-globe-americas',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '14.2k users',
    href: '/tools/timezone-converter',
    isActive: true
  },
  {
    id: 'countdown-timer',
    title: 'Countdown Timer Generator',
    description: 'Create custom countdown timers for events, deadlines, or special occasions with real-time updates.',
    icon: 'fas fa-hourglass-half',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '11.8k users',
    href: '/tools/countdown-timer',
    isActive: true
  },
  {
    id: 'stopwatch-tool',
    title: 'Stopwatch Tool',
    description: 'Precise online stopwatch with millisecond accuracy, lap times, and statistics for timing activities.',
    icon: 'fas fa-stopwatch',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '9.7k users',
    href: '/tools/stopwatch',
    isActive: true
  },
  {
    id: 'age-in-days-calculator',
    title: 'Age in Days Calculator',
    description: 'Calculate your exact age in days, weeks, months, hours, and minutes. Discover fun age facts.',
    icon: 'fas fa-calendar-day',
    iconBg: 'from-purple-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '13.5k users',
    href: '/tools/age-in-days-calculator',
    isActive: true
  },
  {
    id: 'world-clock',
    title: 'World Clock Tool',
    description: 'View current time in major cities worldwide. Real-time world clock with multiple time zones.',
    icon: 'fas fa-globe',
    iconBg: 'from-cyan-500 to-blue-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '16.3k users',
    href: '/tools/world-clock',
    isActive: true
  },
  {
    id: 'work-days-calculator',
    title: 'Work Days Calculator',
    description: 'Calculate working days between dates, excluding weekends and holidays. Perfect for project planning.',
    icon: 'fas fa-briefcase',
    iconBg: 'from-orange-500 to-red-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.4k users',
    href: '/tools/work-days-calculator',
    isActive: true
  },
  {
    id: 'event-reminder',
    title: 'Event Reminder Tool',
    description: 'Set up event reminders with browser notifications. Never miss important meetings or appointments.',
    icon: 'fas fa-bell',
    iconBg: 'from-yellow-500 to-orange-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.1k users',
    href: '/tools/event-reminder',
    isActive: true
  },
  {
    id: 'calendar-generator',
    title: 'Calendar Generator',
    description: 'Generate printable calendars for any month and year. Customize with holidays and different layouts.',
    icon: 'fas fa-calendar-alt',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '12.9k users',
    href: '/tools/calendar-generator',
    isActive: true
  },
  {
    id: 'date-to-day-calculator',
    title: 'Date to Day Calculator',
    description: 'Find out what day of the week any date falls on. Perfect for historical events and planning.',
    icon: 'fas fa-calendar-week',
    iconBg: 'from-teal-500 to-cyan-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '6.8k users',
    href: '/tools/date-to-day-calculator',
    isActive: true
  },
  {
    id: 'sleep-timer',
    title: 'Sleep Timer',
    description: 'Calculate optimal bedtime and wake times based on natural sleep cycles for better sleep quality.',
    icon: 'fas fa-bed',
    iconBg: 'from-violet-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '10.6k users',
    href: '/tools/sleep-timer',
    isActive: true
  },
  // Text & Utility Tools
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, paragraphs, and sentences in your text with detailed statistics and analysis.',
    icon: 'fas fa-file-word',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '24.7k users',
    href: '/tools/word-counter',
    isActive: true
  },
  {
    id: 'character-counter',
    title: 'Character Counter',
    description: 'Count characters in your text with and without spaces, including detailed character analysis.',
    icon: 'fas fa-font',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '18.3k users',
    href: '/tools/character-counter',
    isActive: true
  },
  {
    id: 'random-password-generator',
    title: 'Random Password Generator',
    description: 'Generate strong, secure passwords with customizable options for length and character types.',
    icon: 'fas fa-key',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '31.2k users',
    href: '/tools/random-password-generator',
    isActive: true
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for text, URLs, contact info, WiFi credentials, and more with download options.',
    icon: 'fas fa-qrcode',
    iconBg: 'from-purple-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '27.8k users',
    href: '/tools/qr-code-generator',
    isActive: true
  },
  {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more.',
    icon: 'fas fa-font',
    iconBg: 'from-orange-500 to-red-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '15.9k users',
    href: '/tools/text-case-converter',
    isActive: true
  },
  {
    id: 'remove-extra-spaces',
    title: 'Remove Extra Spaces',
    description: 'Clean up text by removing extra spaces, duplicate spaces, and formatting issues instantly.',
    icon: 'fas fa-eraser',
    iconBg: 'from-cyan-500 to-blue-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '12.4k users',
    href: '/tools/remove-extra-spaces',
    isActive: true
  },
  {
    id: 'reverse-text-generator',
    title: 'Reverse Text Generator',
    description: 'Reverse text in multiple ways: reverse entire text, words, word order, or create mirror text.',
    icon: 'fas fa-exchange-alt',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '9.7k users',
    href: '/tools/reverse-text-generator',
    isActive: true
  },
  {
    id: 'palindrome-checker',
    title: 'Palindrome Checker',
    description: 'Check if words, phrases, or sentences are palindromes with detailed analysis and examples.',
    icon: 'fas fa-exchange-alt',
    iconBg: 'from-teal-500 to-cyan-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.8k users',
    href: '/tools/palindrome-checker',
    isActive: true
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text for designs and mockups with customizable options.',
    icon: 'fas fa-paragraph',
    iconBg: 'from-yellow-500 to-orange-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '22.1k users',
    href: '/tools/lorem-ipsum-generator',
    isActive: true
  },
  {
    id: 'base64-encoder-decoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 strings with instant conversion and validation.',
    icon: 'fas fa-code',
    iconBg: 'from-violet-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '16.5k users',
    href: '/tools/base64-encoder-decoder',
    isActive: true
  },
  {
    id: 'text-to-binary-converter',
    title: 'Text to Binary Converter',
    description: 'Convert text to binary and binary to text with detailed character analysis and validation.',
    icon: 'fas fa-code',
    iconBg: 'from-emerald-500 to-teal-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '13.7k users',
    href: '/tools/text-to-binary-converter',
    isActive: true
  },
  // Utility Tools
  {
    id: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    description: 'Calculate the difference between dates, add or subtract days, and find working days between dates.',
    icon: 'fas fa-calendar-alt',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '6.4k users',
    href: '/tools/date-difference-calculator',
    isActive: true
  },
  // Converter Tools
  {
    id: 'length-converter',
    title: 'Length Converter',
    description: 'Convert between different units of length including meters, feet, inches, kilometers, and more.',
    icon: 'fas fa-ruler',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '15.2k users',
    href: '/tools/length-converter',
    isActive: true
  },
  {
    id: 'weight-converter',
    title: 'Weight Converter',
    description: 'Convert between different units of weight including kilograms, pounds, ounces, and more.',
    icon: 'fas fa-weight-hanging',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '12.8k users',
    href: '/tools/weight-converter',
    isActive: true
  },
  {
    id: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperature scales with instant results.',
    icon: 'fas fa-thermometer-half',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '18.5k users',
    href: '/tools/temperature-converter',
    isActive: true
  },
  {
    id: 'speed-converter',
    title: 'Speed Converter',
    description: 'Convert between different units of speed including mph, km/h, m/s, and more.',
    icon: 'fas fa-tachometer-alt',
    iconBg: 'from-purple-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '9.7k users',
    href: '/tools/speed-converter',
    isActive: true
  },
  {
    id: 'area-converter',
    title: 'Area Converter',
    description: 'Convert between different units of area including square meters, acres, hectares, and more.',
    icon: 'fas fa-expand-arrows-alt',
    iconBg: 'from-orange-500 to-red-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.3k users',
    href: '/tools/area-converter',
    isActive: true
  },
  {
    id: 'volume-converter',
    title: 'Volume Converter',
    description: 'Convert between different units of volume including liters, gallons, cubic meters, and more.',
    icon: 'fas fa-cube',
    iconBg: 'from-cyan-500 to-blue-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.1k users',
    href: '/tools/volume-converter',
    isActive: true
  },
  {
    id: 'time-converter',
    title: 'Time Converter',
    description: 'Convert between different units of time including seconds, minutes, hours, days, and more.',
    icon: 'fas fa-clock',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '11.4k users',
    href: '/tools/time-converter',
    isActive: true
  },
  {
    id: 'fuel-efficiency-converter',
    title: 'Fuel Efficiency Converter',
    description: 'Convert between MPG, L/100km, and other fuel efficiency units for vehicles.',
    icon: 'fas fa-gas-pump',
    iconBg: 'from-yellow-500 to-orange-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '5.9k users',
    href: '/tools/fuel-efficiency-converter',
    isActive: true
  },
  {
    id: 'pressure-converter',
    title: 'Pressure Converter',
    description: 'Convert between different units of pressure including PSI, bar, Pascal, and more.',
    icon: 'fas fa-gauge-high',
    iconBg: 'from-teal-500 to-cyan-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '4.6k users',
    href: '/tools/pressure-converter',
    isActive: true
  },
  {
    id: 'energy-converter',
    title: 'Energy Converter',
    description: 'Convert between different units of energy including Joules, calories, BTU, and more.',
    icon: 'fas fa-bolt',
    iconBg: 'from-violet-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '6.2k users',
    href: '/tools/energy-converter',
    isActive: true
  },
  // Currency & Finance Tools
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates. Supports 170+ currencies worldwide.',
    icon: 'fas fa-exchange-alt',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '25.4k users',
    href: '/tools/currency-converter',
    isActive: true
  },
  {
    id: 'crypto-price-converter',
    title: 'Crypto Price Converter',
    description: 'Convert cryptocurrency prices with real-time data from CoinGecko API. Track popular coins.',
    icon: 'fab fa-bitcoin',
    iconBg: 'group-hover:from-orange-500 group-hover:to-yellow-600',
    iconColor: 'text-white',
    users: '18.7k users',
    href: '/tools/crypto-price-converter',
    isActive: true
  },
  {
    id: 'inflation-calculator',
    title: 'Inflation Calculator',
    description: 'Calculate inflation impact on purchasing power using historical data from multiple countries.',
    icon: 'fas fa-chart-line',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '12.3k users',
    href: '/tools/inflation-calculator',
    isActive: true
  },
  {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments, total interest, and amortization schedules for home loans.',
    icon: 'fas fa-home',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '21.8k users',
    href: '/tools/mortgage-calculator',
    isActive: true
  },
  {
    id: 'car-loan-calculator',
    title: 'Car Loan Calculator',
    description: 'Calculate auto loan payments, total cost, and compare different financing options for vehicles.',
    icon: 'fas fa-car',
    iconBg: 'from-purple-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '16.9k users',
    href: '/tools/car-loan-calculator',
    isActive: true
  },
  {
    id: 'investment-return-calculator',
    title: 'Investment Return Calculator',
    description: 'Calculate investment returns, compound interest, and future value with detailed projections.',
    icon: 'fas fa-chart-area',
    iconBg: 'from-cyan-500 to-blue-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '14.2k users',
    href: '/tools/investment-return-calculator',
    isActive: true
  },
  {
    id: 'stock-profit-calculator',
    title: 'Stock Profit Calculator',
    description: 'Calculate stock trading profits, losses, and returns including fees and commission costs.',
    icon: 'fas fa-chart-candlestick',
    iconBg: 'from-emerald-500 to-green-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '11.5k users',
    href: '/tools/stock-profit-calculator',
    isActive: true
  },
  {
    id: 'break-even-calculator',
    title: 'Break-Even Calculator',
    description: 'Calculate break-even point for business planning, pricing strategies, and financial analysis.',
    icon: 'fas fa-balance-scale-right',
    iconBg: 'from-teal-500 to-cyan-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.9k users',
    href: '/tools/break-even-calculator',
    isActive: true
  },
  {
    id: 'salary-hourly-converter',
    title: 'Salary to Hourly Converter',
    description: 'Convert between salary and hourly wages with customizable working hours and vacation time.',
    icon: 'fas fa-money-check-alt',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '19.3k users',
    href: '/tools/salary-hourly-converter',
    isActive: true
  },
  {
    id: 'freelancer-hourly-rate-calculator',
    title: 'Freelancer Rate Calculator',
    description: 'Calculate freelancer hourly rates considering expenses, taxes, and desired profit margins.',
    icon: 'fas fa-user-tie',
    iconBg: 'from-violet-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.6k users',
    href: '/tools/freelancer-hourly-rate-calculator',
    isActive: true
  },
  // Fun Tools
  {
    id: 'random-joke-generator',
    title: 'Random Joke Generator',
    description: 'Generate random jokes to brighten your day! Family-friendly jokes from different categories.',
    icon: 'fas fa-laugh',
    iconBg: 'from-yellow-500 to-orange-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '3.1k users',
    href: '/tools/random-joke-generator',
    isActive: true
  },
  // Additional Health & Fitness Tools
  {
    id: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight using multiple medical formulas (Robinson, Miller, Devine, Hamwi).',
    icon: 'fas fa-balance-scale',
    iconBg: 'from-teal-500 to-cyan-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '4.7k users',
    href: '/tools/ideal-weight-calculator',
    isActive: true
  },
  {
    id: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    description: 'Calculate daily water intake needs based on weight, activity level, and environmental factors.',
    icon: 'fas fa-tint',
    iconBg: 'group-hover:from-blue-500 group-hover:to-cyan-600',
    iconColor: 'text-white',
    users: '5.3k users',
    href: '/tools/water-intake-calculator',
    isActive: true
  },
  {
    id: 'macro-nutrient-calculator',
    title: 'Macro Nutrient Calculator',
    description: 'Calculate daily macronutrient needs (protein, carbs, fats) based on your fitness goals.',
    icon: 'fas fa-apple-alt',
    iconBg: 'from-green-500 to-emerald-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '6.8k users',
    href: '/tools/macro-nutrient-calculator',
    isActive: true
  },
  {
    id: 'heart-rate-zone-calculator',
    title: 'Heart Rate Zone Calculator',
    description: 'Calculate heart rate training zones for optimal workout intensity and performance.',
    icon: 'fas fa-heartbeat',
    iconBg: 'from-red-500 to-pink-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '4.1k users',
    href: '/tools/heart-rate-zone-calculator',
    isActive: true
  },
  {
    id: 'bac-calculator',
    title: 'BAC Calculator',
    description: 'Calculate Blood Alcohol Content levels for educational purposes and safety awareness.',
    icon: 'fas fa-wine-glass',
    iconBg: 'group-hover:from-red-500 group-hover:to-red-700',
    iconColor: 'text-white',
    users: '2.9k users',
    href: '/tools/bac-calculator',
    isActive: true
  },
  {
    id: 'step-calorie-converter',
    title: 'Step to Calorie Converter',
    description: 'Convert steps to calories burned or find how many steps you need for a calorie goal.',
    icon: 'fas fa-walking',
    iconBg: 'from-green-500 to-teal-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '7.2k users',
    href: '/tools/step-calorie-converter',
    isActive: true
  },
  {
    id: 'protein-intake-calculator',
    title: 'Protein Intake Calculator',
    description: 'Calculate daily protein needs based on weight, activity level, and fitness goals.',
    icon: 'fas fa-drumstick-bite',
    iconBg: 'from-blue-500 to-indigo-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '5.6k users',
    href: '/tools/protein-intake-calculator',
    isActive: true
  },
  {
    id: 'sleep-cycle-calculator',
    title: 'Sleep Cycle Calculator',
    description: 'Calculate optimal sleep and wake times based on 90-minute sleep cycles for better rest.',
    icon: 'fas fa-bed',
    iconBg: 'from-indigo-500 to-purple-600 bg-gradient-to-br',
    iconColor: 'text-white',
    users: '8.9k users',
    href: '/tools/sleep-cycle-calculator',
    isActive: true
  },
  {
    id: 'body-surface-area-calculator',
    title: 'Body Surface Area Calculator',
    description: 'Calculate body surface area using multiple medical formulas for accurate medical dosing.',
    icon: 'fas fa-user-cog',
    iconBg: 'group-hover:from-purple-500 group-hover:to-indigo-600',
    iconColor: 'text-white',
    users: '2.1k users',
    href: '/tools/body-surface-area-calculator',
    isActive: true
  }
];

export default function ToolsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="tools" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" data-testid="tools-title">
            Popular Tools
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-8" data-testid="tools-description">
            Choose from our growing collection of free online tools. Each tool is designed for accuracy, speed, and ease of use.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-0 bg-white"
                data-testid="search-input"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-search text-slate-400"></i>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  data-testid="clear-search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-6" data-testid="search-results-info">
              <p className="text-slate-600">
                {filteredTools.length === 0 
                  ? `No tools found for "${searchQuery}"`
                  : `${filteredTools.length} tool${filteredTools.length === 1 ? '' : 's'} found for "${searchQuery}"`
                }
              </p>
            </div>
          )}
        </div>
        
        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredTools.map((tool) => (
              <Link href={tool.href} key={tool.id} data-testid={`link-${tool.id}`}>
                <div
                  className={`tool-card rounded-2xl shadow-sm border p-6 transition-all duration-300 cursor-pointer ${
                    tool.isActive
                      ? 'bg-white border-slate-200 hover:shadow-xl hover:border-primary/20'
                      : 'bg-slate-50 border-slate-200 hover:shadow-md opacity-75'
                  }`}
                  data-testid={`card-tool-${tool.id}`}
                >
                  <div className={`flex items-center justify-center w-14 h-14 ${tool.iconBg} rounded-xl mb-4 transition-colors duration-300`}>
                    <i className={`${tool.icon} text-xl transition-colors duration-300 ${tool.iconColor}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2" data-testid={`title-${tool.id}`}>
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed" data-testid={`description-${tool.id}`}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16" data-testid="no-results">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-search text-slate-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">No tools found</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              We couldn't find any tools matching "<span className="font-semibold">{searchQuery}</span>". 
              Try searching with different keywords or browse all available tools.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200"
              data-testid="clear-search-button"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Show All Tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.id} data-testid={`link-${tool.id}`}>
                <div
                  className={`tool-card rounded-2xl shadow-sm border p-6 transition-all duration-300 cursor-pointer ${
                    tool.isActive
                      ? 'bg-white border-slate-200 hover:shadow-xl hover:border-primary/20'
                      : 'bg-slate-50 border-slate-200 hover:shadow-md opacity-75'
                  }`}
                  data-testid={`card-tool-${tool.id}`}
                >
                  <div className={`flex items-center justify-center w-14 h-14 ${tool.iconBg} rounded-xl mb-4 transition-colors duration-300`}>
                    <i className={`${tool.icon} text-xl transition-colors duration-300 ${tool.iconColor}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2" data-testid={`title-${tool.id}`}>
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed" data-testid={`description-${tool.id}`}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Call to Action for More Tools */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3" data-testid="cta-title">
              Even More Tools Coming Soon!
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto" data-testid="cta-description">
              We're constantly expanding our collection of free calculators and tools. 
              More health, financial, and utility calculators are on the way!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-200"
                data-testid="button-suggest-tool"
              >
                <i className="fas fa-lightbulb mr-2"></i>
                Suggest a Tool
              </button>
              <Link href="/tools/random-joke-generator">
                <span className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-200 inline-block cursor-pointer">
                  <i className="fas fa-laugh mr-2"></i>
                  Need a Laugh?
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
