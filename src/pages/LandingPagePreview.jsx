import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPagePreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            🌟 Learn Smarter, Not Harder – A New Approach
          </h1>

          <div className="text-lg md:text-xl text-gray-700 mb-8 space-y-2">
            <p>Say goodbye to boring vocabulary drills.</p>
            <p>Start learning naturally with shows, characters, and real conversations.</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg mb-12 transform hover:scale-105 transition-transform duration-300">
            <p className="text-xl md:text-2xl font-semibold">
              💬 Watch popular shows. Learn real words. Remember forever.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            ✅ What You'll Get:
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📺</span>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Discover shows that match your level</strong> – from fun sitcoms to epic dramas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🔤</span>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Learn 15 key words per episode</strong> – sorted by difficulty
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Practice with smart games</strong> that adapt to your level and pace
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Save your favorite words</strong> and monitor your real progress
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-16 border-0 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-3xl">🌍</span>
                <p className="text-xl font-semibold text-gray-800">
                  Choose your learning language
                </p>
              </div>
              <p className="text-gray-700 text-lg">
                Spanish, Hebrew, Arabic, Russian, or English
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-8 rounded-2xl shadow-xl mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🎁 100% Free — No login required
            </h3>
            <p className="text-lg opacity-95">
              Coming soon to mobile and web.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-gray-700 font-medium">
              👇 Try the demo preview and join the language revolution.
            </p>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Try Demo Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            A Smarter Way to Learn Languages (Project in Early Access)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPagePreview;
