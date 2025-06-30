import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, Award, Globe, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

const SDGs = [
  { id: 1, name: "No Poverty", color: "bg-red-600" },
  { id: 2, name: "Zero Hunger", color: "bg-yellow-600" },
  { id: 3, name: "Good Health and Well-being", color: "bg-green-600" },
  { id: 4, name: "Quality Education", color: "bg-red-700" },
  { id: 5, name: "Gender Equality", color: "bg-orange-600" },
  { id: 6, name: "Clean Water and Sanitation", color: "bg-blue-400" },
  { id: 7, name: "Affordable and Clean Energy", color: "bg-yellow-500" },
  { id: 8, name: "Decent Work and Economic Growth", color: "bg-red-800" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "bg-orange-700" },
  { id: 10, name: "Reduced Inequalities", color: "bg-pink-600" },
  { id: 11, name: "Sustainable Cities and Communities", color: "bg-orange-500" },
  { id: 12, name: "Responsible Consumption and Production", color: "bg-yellow-700" },
  { id: 13, name: "Climate Action", color: "bg-green-700" },
  { id: 14, name: "Life Below Water", color: "bg-blue-600" },
  { id: 15, name: "Life on Land", color: "bg-green-800" },
  { id: 16, name: "Peace, Justice and Strong Institutions", color: "bg-blue-800" },
  { id: 17, name: "Partnerships for the Goals", color: "bg-indigo-700" },
]

const AGENDA = [
  { id: 1, name: "A prosperous Africa based on inclusive growth", color: "bg-green-700" },
  { id: 2, name: "Well-educated citizens & skills revolution", color: "bg-blue-600" },
  { id: 3, name: "Healthy and well-nourished citizens", color: "bg-red-600" },
  { id: 4, name: "Transformative, inclusive economy", color: "bg-yellow-500" },
  { id: 5, name: "Modern agriculture and blue economy", color: "bg-teal-600" },
  { id: 6, name: "Environmentally sustainable climate-resilient economy", color: "bg-green-900" },
  { id: 7, name: "Democracy, respect for human rights, justice", color: "bg-purple-600" },
  { id: 8, name: "United Africa (politically, economically)", color: "bg-indigo-600" },
  { id: 9, name: "Key continental financial and institutions", color: "bg-gray-600" },
  { id: 10, name: "World's most resilient cultural identity", color: "bg-pink-600" },
  { id: 11, name: "Democratic values, norms, governance", color: "bg-blue-800" },
  { id: 12, name: "Capable institutions and transformative leadership", color: "bg-yellow-600" },
  { id: 13, name: "Peaceful and secure Africa", color: "bg-red-800" },
  { id: 14, name: "Strong participatory & accountable institutions", color: "bg-purple-800" },
  { id: 15, name: "Africa with a strong cultural identity", color: "bg-orange-500" },
  { id: 16, name: "African cultural renaissance", color: "bg-pink-500" },
  { id: 17, name: "Full gender equality", color: "bg-red-500" },
  { id: 18, name: "Engaged and empowered youth", color: "bg-blue-500" },
  { id: 19, name: "Africa as a major partner in global affairs", color: "bg-teal-500" },
  { id: 20, name: "Africa takes full responsibility for development", color: "bg-gray-800" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">ActsFile</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Document Your Positive Impact</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Share your acts of kindness, connect them to UN Sustainable Development Goals, and build a meaningful
            biography of your contributions to society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
     
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Share Positive Acts</CardTitle>
              <CardDescription>
                Document your contributions to society with photos, videos, and detailed descriptions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-500 mb-4" />
              <CardTitle>AI-Powered SDG Mapping</CardTitle>
              <CardDescription>
                Our AI automatically suggests relevant UN Sustainable Development Goals for your acts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-500 mb-4" />
              <CardTitle>Personal Biography</CardTitle>
              <CardDescription>
                Build a chronological biography of your positive contributions and share your impact story.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-green-500 mb-4" />
              <CardTitle>Community Engagement</CardTitle>
              <CardDescription>
                Connect with like-minded individuals and organizations making a difference.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Award className="h-12 w-12 text-yellow-500 mb-4" />
              <CardTitle>Recognition System</CardTitle>
              <CardDescription>
                Earn credits, badges, and recognition for your active participation and contributions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Globe className="h-12 w-12 text-indigo-500 mb-4" />
              <CardTitle>Organization Support</CardTitle>
              <CardDescription>
                Organizations can share their work and connect with volunteers and supporters.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* SDG Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* SDGs */}
          <h2 className="text-3xl font-bold text-center mb-8">UN Sustainable Development Goals</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect your acts to the 17 UN SDGs and see how your contributions align with global sustainability targets.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20">
            {SDGs.map((sdg) => (
              <Badge key={sdg.id} className={`${sdg.color} text-white p-3 text-center justify-center`}>
                {sdg.id}. {sdg.name}
              </Badge>
            ))}
          </div>

          {/* Agenda 2063 */}
          <h2 className="text-3xl font-bold text-center mb-8">African Union Agenda 2063 Goals</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover how Africa envisions its future and how your actions contribute to the 20 goals of Agenda 2063 — Africa’s blueprint and master plan for transforming the continent into a global powerhouse.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {AGENDA.map((goal) => (
              <Badge key={goal.id} className={`${goal.color} text-white p-3 text-center justify-center`}>
                {goal.id}. {goal.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Make Your Impact Visible?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of changemakers documenting their positive contributions to society.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6" />
                <span className="text-xl font-bold">ActsFile</span>
              </div>
              <p className="text-gray-400">Documenting positive acts that contribute to a better world.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How It Works</Link>
                </li>
                <li>
                  <Link href="/sdgs">SDG Guide</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/explore">Explore Acts</Link>
                </li>
                <li>
                  <Link href="/organizations">Organizations</Link>
                </li>
                <li>
                  <Link href="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ActsFile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
