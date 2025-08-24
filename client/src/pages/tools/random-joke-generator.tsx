import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Joke {
  id: number;
  setup?: string;
  delivery?: string;
  joke?: string;
  category: string;
  type: string;
}

export default function RandomJokeGenerator() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [category, setCategory] = useState("Any");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Any", "Programming", "Miscellaneous", "Dark", "Pun", "Spooky", "Christmas"
  ];

  useEffect(() => {
    document.title = "Random Joke Generator - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate random jokes to brighten your day! Free joke generator with different categories. Get a good laugh anytime.');
    }

    // Load a joke on page load
    fetchRandomJoke();
  }, []);

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categoryParam = category === "Any" ? "" : `/${category}`;
      const response = await fetch(`https://v2.jokeapi.dev/joke${categoryParam}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Failed to fetch joke');
      }

      setJoke(data);
    } catch (err) {
      setError('Failed to fetch joke. Please try again.');
      console.error('Error fetching joke:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const shareJoke = () => {
    if (!joke) return;

    const jokeText = joke.type === "twopart" 
      ? `${joke.setup}\n\n${joke.delivery}` 
      : joke.joke || '';

    if (navigator.share) {
      navigator.share({
        title: 'Check out this joke!',
        text: jokeText,
      });
    } else {
      navigator.clipboard.writeText(jokeText);
      alert('Joke copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-laugh text-yellow-600 text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="joke-generator-title">
              Random Joke Generator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="joke-generator-subtitle">
              Need a good laugh? Generate random jokes to brighten your day! 😄
            </p>
          </div>

          <Card className="bg-white shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <i className="fas fa-smile text-primary"></i>
                <span>Joke Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-slate-700 mb-2 block">
                  Joke Category
                </label>
                <Select value={category} onValueChange={setCategory} data-testid="select-category">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={fetchRandomJoke} 
                  className="flex-1 bg-primary hover:bg-blue-600 text-white"
                  disabled={isLoading}
                  data-testid="button-get-joke"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Loading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-dice mr-2"></i>
                      Get New Joke
                    </>
                  )}
                </Button>
                
                {joke && (
                  <Button 
                    onClick={shareJoke} 
                    variant="outline"
                    className="px-4"
                    data-testid="button-share-joke"
                  >
                    <i className="fas fa-share-alt"></i>
                  </Button>
                )}
              </div>

              {/* Safe content notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fas fa-shield-alt text-green-600"></i>
                  <span className="font-medium text-green-800">Family-Friendly Content</span>
                </div>
                <p className="text-green-700">
                  All jokes are filtered to ensure they're appropriate for all audiences. 
                  No offensive, explicit, or inappropriate content.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Joke Display */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <i className="fas fa-quote-left text-accent"></i>
                <span>Your Joke</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-12" data-testid="error-message">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Oops!</h3>
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button 
                    onClick={fetchRandomJoke}
                    variant="outline"
                    data-testid="button-retry"
                  >
                    Try Again
                  </Button>
                </div>
              ) : joke ? (
                <div className="space-y-6" data-testid="joke-content">
                  {joke.type === "twopart" ? (
                    // Two-part joke (setup + delivery)
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-comment text-blue-600 mt-1"></i>
                          <p className="text-lg text-slate-800 font-medium" data-testid="joke-setup">
                            {joke.setup}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-laugh text-yellow-600 mt-1"></i>
                          <p className="text-lg text-slate-800 font-medium" data-testid="joke-delivery">
                            {joke.delivery}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Single joke
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-grin text-purple-600 mt-1 text-xl"></i>
                        <p className="text-lg text-slate-800 font-medium" data-testid="joke-single">
                          {joke.joke}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Joke metadata */}
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-tag"></i>
                        <span data-testid="joke-category">{joke.category}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-list"></i>
                        <span>{joke.type === "twopart" ? "Two-part" : "Single"}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <i className="fas fa-hashtag"></i>
                      <span>ID: {joke.id}</span>
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="text-center py-4">
                    <p className="text-slate-600 mb-3">Did this joke make you smile?</p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <i className="fas fa-thumbs-up mr-1"></i>
                        Yes!
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <i className="fas fa-meh mr-1"></i>
                        Meh
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <i className="fas fa-thumbs-down mr-1"></i>
                        Not really
                      </Button>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="text-center py-12" data-testid="loading-message">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-spinner fa-spin text-blue-500 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">Loading Joke...</h3>
                  <p className="text-slate-500">
                    Searching for the perfect joke to make you laugh!
                  </p>
                </div>
              ) : (
                <div className="text-center py-12" data-testid="no-joke">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-smile text-slate-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">Ready for a Laugh?</h3>
                  <p className="text-slate-500">
                    Click "Get New Joke" to start the fun!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Why Laughter is Good for You</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-heart text-red-500 mt-1"></i>
                    <span>Reduces stress and releases endorphins</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-shield-alt text-blue-500 mt-1"></i>
                    <span>Boosts immune system function</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-users text-green-500 mt-1"></i>
                    <span>Improves social connections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-brain text-purple-500 mt-1"></i>
                    <span>Enhances mental well-being</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="fas fa-dumbbell text-orange-500 mt-1"></i>
                    <span>Provides light physical exercise</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Joke Categories Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <div>
                    <span className="font-medium text-slate-800">Programming:</span>
                    <p>Jokes about coding, software, and tech</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Pun:</span>
                    <p>Wordplay and clever language jokes</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Miscellaneous:</span>
                    <p>General humor and everyday jokes</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Spooky:</span>
                    <p>Halloween and scary-themed humor</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">Christmas:</span>
                    <p>Holiday and festive jokes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Tools */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need More Tools?</h3>
                <p className="mb-6 text-yellow-100">
                  Check out our collection of useful calculators and converters!
                </p>
                <a 
                  href="/" 
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                  data-testid="button-back-to-tools"
                >
                  <i className="fas fa-calculator mr-2"></i>
                  Back to Tools
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