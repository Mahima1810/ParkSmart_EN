"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Star,
  Bell,
  Search,
  Filter,
  Navigation,
  QrCode,
  Zap,
  Shield,
  Camera,
  Battery,
  Moon,
  Sun,
  TrendingUp,
  Award,
  CreditCard,
  Menu,
  Home,
  User,
} from "lucide-react"

interface ParkingSpot {
  id: number
  name: string
  address: string
  price: number
  available: number
  total: number
  distance: string
  amenities: string[]
  rating: number
  image: string
  isRecommended?: boolean
  discount?: number
}

interface Booking {
  id: number
  location: string
  spot: string
  vehicle?: string
  time: string
  amount: number
  duration: string
  status: "active" | "completed" | "upcoming"
  qrCode?: string
}

export default function ParkSmartApp() {
  const [currentTime, setCurrentTime] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const parkingSpots: ParkingSpot[] = [
    {
      id: 1,
      name: "Phoenix MarketCity",
      address: "Velachery Main Road, Chennai",
      price: 35,
      available: 24,
      total: 50,
      distance: "0.2 km",
      amenities: ["CCTV", "Security", "Covered", "EV Charging", "Valet"],
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=200",
      isRecommended: true,
      discount: 15,
    },
    {
      id: 2,
      name: "Express Avenue",
      address: "Royapettah, Chennai",
      price: 40,
      available: 18,
      total: 35,
      distance: "0.5 km",
      amenities: ["CCTV", "Security", "Valet", "Car Wash"],
      rating: 4.6,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      name: "VR Chennai",
      address: "Anna Nagar, Chennai",
      price: 45,
      available: 32,
      total: 80,
      distance: "1.2 km",
      amenities: ["CCTV", "Security", "Covered", "EV Charging", "Valet", "Food Court"],
      rating: 4.9,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 4,
      name: "Forum Vijaya Mall",
      address: "Vadapalani, Chennai",
      price: 30,
      available: 0,
      total: 25,
      distance: "0.8 km",
      amenities: ["CCTV", "Covered"],
      rating: 4.4,
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  const activeBookings: Booking[] = [
    {
      id: 1,
      location: "Phoenix MarketCity",
      spot: "Level 2 - Premium A15",
      vehicle: "TN-01-AB-1234",
      time: "Today at 2:30 PM",
      amount: 105,
      duration: "3h",
      status: "active",
      qrCode: "QR123456",
    },
  ]

  const upcomingBookings: Booking[] = [
    {
      id: 2,
      location: "VR Chennai",
      spot: "Level 1 - B08",
      time: "Tomorrow at 10:00 AM",
      amount: 90,
      duration: "2h",
      status: "upcoming",
    },
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
      setCurrentTime(`${dateString} • ${timeString}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const filteredSpots = parkingSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const NavigationItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-2">
      <Button
        variant={activeTab === "dashboard" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("dashboard")
          onItemClick?.()
        }}
      >
        <Home className="h-4 w-4 mr-3" />
        Dashboard
      </Button>
      <Button
        variant={activeTab === "map" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("map")
          onItemClick?.()
        }}
      >
        <MapPin className="h-4 w-4 mr-3" />
        Find Parking
      </Button>
      <Button
        variant={activeTab === "booking" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("booking")
          onItemClick?.()
        }}
      >
        <Calendar className="h-4 w-4 mr-3" />
        Book Spot
      </Button>
      <Button
        variant={activeTab === "profile" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("profile")
          onItemClick?.()
        }}
      >
        <User className="h-4 w-4 mr-3" />
        Profile
      </Button>
    </div>
  )

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">Welcome back, Rajesh!</h1>
              <p className="text-blue-100 mb-1 text-sm md:text-base">Smart parking made simple</p>
              <p className="text-blue-200 text-xs md:text-sm">{currentTime}</p>
            </div>
            <div className="flex gap-2 self-start md:self-center">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </Button>
              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-center p-2 md:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-lg md:text-xl font-bold">₹485</div>
              <div className="text-xs text-blue-100">Total Saved</div>
            </div>
            <div className="text-center p-2 md:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-lg md:text-xl font-bold">32</div>
              <div className="text-xs text-blue-100">Bookings</div>
            </div>
            <div className="text-center p-2 md:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-lg md:text-xl font-bold flex items-center justify-center gap-1">
                4.9 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-xs text-blue-100">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 col-span-1 md:col-span-1"
          onClick={() => setActiveTab("map")}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <Badge className="bg-green-500 text-white text-xs">Live</Badge>
            </div>
            <h3 className="font-semibold text-green-900 text-sm md:text-base">Find Nearby</h3>
            <p className="text-xs md:text-sm text-green-700">Real-time availability</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 col-span-1 md:col-span-1"
          onClick={() => setActiveTab("booking")}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              <Badge className="bg-blue-500 text-white text-xs">Smart</Badge>
            </div>
            <h3 className="font-semibold text-blue-900 text-sm md:text-base">Pre-Book</h3>
            <p className="text-xs md:text-sm text-blue-700">Reserve in advance</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 col-span-1 md:col-span-1">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              <Badge className="bg-purple-500 text-white text-xs">New</Badge>
            </div>
            <h3 className="font-semibold text-purple-900 text-sm md:text-base">Analytics</h3>
            <p className="text-xs md:text-sm text-purple-700">Usage insights</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 col-span-1 md:col-span-1">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              <Badge className="bg-orange-500 text-white text-xs">Hot</Badge>
            </div>
            <h3 className="font-semibold text-orange-900 text-sm md:text-base">Rewards</h3>
            <p className="text-xs md:text-sm text-orange-700">Earn points</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Bookings */}
        <div className="space-y-4">
          {activeBookings.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base md:text-lg">Active Bookings</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {activeBookings.length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeBookings.map((booking) => (
                  <Card key={booking.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Car className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm md:text-base">{booking.location}</h4>
                            <p className="text-xs md:text-sm text-gray-600">{booking.spot}</p>
                            <p className="text-xs text-gray-500">{booking.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">₹{booking.amount}</div>
                          <div className="text-sm text-gray-500">{booking.duration}</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button size="sm" className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <QrCode className="h-4 w-4 mr-2" />
                          QR Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Smart Insights */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 text-sm md:text-base">Smart Insight</h4>
                  <p className="text-xs md:text-sm text-amber-700">Peak hours: 2-4 PM today</p>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <p className="text-xs md:text-sm text-amber-800">
                  💡 Book your next slot before 1:30 PM to save 20% during peak hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <div className="space-y-4">
          {upcomingBookings.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Clock className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm md:text-base">{booking.location}</h4>
                            <p className="text-xs md:text-sm text-gray-600">{booking.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">₹{booking.amount}</div>
                          <div className="text-sm text-gray-500">{booking.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Booking completed</p>
                  <p className="text-xs text-gray-500">Express Avenue • 2 hours ago</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ₹70
                </Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Achievement unlocked</p>
                  <p className="text-xs text-gray-500">Smart Parker badge earned</p>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  New
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const MapView = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search parking locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="shrink-0 bg-transparent">
            Sort by Distance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-100 to-indigo-100 relative flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">Interactive Map</h3>
                <p className="text-blue-700 text-sm md:text-base">Real-time parking availability</p>
              </div>

              {/* Mock location markers */}
              <div className="absolute top-4 left-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                24 Available
              </div>
              <div className="absolute top-12 right-6 bg-amber-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                18 Available
              </div>
              <div className="absolute bottom-8 left-12 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                Full
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Nearby Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Available Spots</span>
                <span className="font-semibold text-green-600">74</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Price</span>
                <span className="font-semibold">₹35/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Best Deal</span>
                <span className="font-semibold text-blue-600">₹25/hr</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">15%</div>
                <div className="text-sm text-green-700">Average Savings</div>
                <div className="text-xs text-green-600 mt-1">with smart booking</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Parking Spots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSpots.map((spot) => (
          <Card
            key={spot.id}
            className={`hover:shadow-lg transition-all duration-300 ${spot.isRecommended ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
          >
            <CardContent className="p-4">
              {spot.isRecommended && (
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-blue-600" />
                  <Badge className="bg-blue-500 text-white text-xs">Recommended</Badge>
                  {spot.discount && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {spot.discount}% OFF
                    </Badge>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <img
                  src={spot.image || "/placeholder.svg"}
                  alt={spot.name}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm md:text-base">{spot.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{spot.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg md:text-xl font-bold text-blue-600">
                        ₹{spot.discount ? Math.round(spot.price * (1 - spot.discount / 100)) : spot.price}
                        {spot.discount && (
                          <span className="text-sm text-gray-400 line-through ml-1">₹{spot.price}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">per hour</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {spot.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {spot.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${spot.available > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                    />
                    <span className="text-xs md:text-sm">
                      {spot.available > 0 ? `${spot.available} of ${spot.total} spots available` : "Full"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {spot.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity === "CCTV" && <Camera className="h-3 w-3 mr-1" />}
                        {amenity === "Security" && <Shield className="h-3 w-3 mr-1" />}
                        {amenity === "EV Charging" && <Battery className="h-3 w-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                    {spot.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{spot.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full" disabled={spot.available === 0} onClick={() => setActiveTab("booking")}>
                    {spot.available > 0 ? "Book Now" : "Full"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const BookingView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Smart Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Selected Location</label>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900">Phoenix MarketCity</h4>
                  <p className="text-sm text-blue-700">Velachery Main Road, Chennai</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">₹30/hour</span>
                    <Badge className="bg-green-500 text-white">24 spots available</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 8].map((duration) => (
                  <Button
                    key={duration}
                    variant={selectedDuration === duration ? "default" : "outline"}
                    onClick={() => setSelectedDuration(duration)}
                    className="h-12"
                  >
                    {duration}h
                  </Button>
                ))}
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle</label>
              <Card className="cursor-pointer border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4 flex items-center gap-3">
                  <Car className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">TN-01-AB-1234</div>
                    <div className="text-sm text-gray-600">Honda City • White</div>
                  </div>
                  <Badge className="ml-auto bg-blue-500 text-white">Default</Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Price Breakdown */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Base Price ({selectedDuration}h)</span>
                <span>₹{30 * selectedDuration}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Smart Discount (15%)</span>
                <span>-₹{Math.round(30 * selectedDuration * 0.15)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₹5</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Premium Member Discount</span>
                <span>-₹3</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{Math.round(30 * selectedDuration * 0.85) + 2}</span>
              </div>
              <div className="text-sm text-green-600 text-center">
                💰 You save ₹{Math.round(30 * selectedDuration * 0.15) + 3} with smart booking!
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Card className="cursor-pointer border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4 flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">•••• •••• •••• 1234</div>
                    <div className="text-sm text-gray-600">Expires 12/26</div>
                  </div>
                  <Badge className="ml-auto bg-blue-500 text-white">Default</Badge>
                </CardContent>
              </Card>
              <Button variant="outline" className="w-full bg-transparent">
                + Add New Payment Method
              </Button>
            </CardContent>
          </Card>

          <Button className="w-full h-12 text-lg">
            Complete Booking - ₹{Math.round(30 * selectedDuration * 0.85) + 2}
          </Button>
        </div>
      </div>
    </div>
  )

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Header */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold">Rajesh Kumar</h2>
                  <p className="text-purple-100">Premium Member</p>
                  <p className="text-purple-200 text-sm">Member since Jan 2024</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-yellow-500 text-white">Gold Status</Badge>
                    <Badge className="bg-green-500 text-white">Eco Friendly</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold">32</div>
                  <div className="text-xs text-purple-100">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold">₹2,450</div>
                  <div className="text-xs text-purple-100">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold flex items-center justify-center gap-1">
                    4.9 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-xs text-purple-100">Your Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Car className="h-4 w-4 mr-2" />
                Manage Vehicles
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-yellow-800">Eco Warrior</div>
                <div className="text-xs text-yellow-600">Used EV charging 10+ times</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-semibold text-blue-800">Smart Parker</div>
                <div className="text-xs text-blue-600">Saved ₹500+ with smart booking</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Bookings</span>
                <span className="font-semibold">8 bookings</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Money Saved</span>
                <span className="font-semibold text-green-600">₹125</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Carbon Footprint</span>
                <span className="font-semibold text-blue-600">-15kg CO₂</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5" />
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold text-purple-600">2,450</div>
                <div className="text-sm text-gray-600">Available Points</div>
              </div>
              <Progress value={75} className="h-3" />
              <div className="text-xs text-gray-500">550 more points to reach Platinum status</div>
              <Button variant="outline" className="w-full bg-transparent">
                Redeem Points
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-shrink-0 px-4 py-6">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ParkSmart
              </h1>
            </div>
            <div className="flex-1 flex flex-col px-4 pb-4">
              <NavigationItems />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ParkSmart
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="bg-gray-100 dark:bg-gray-700">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="py-4">
                    <NavigationItems onItemClick={() => setIsMobileMenuOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden lg:flex fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Page Content */}
          <div className="p-4 md:p-6 lg:p-8">
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "map" && <MapView />}
            {activeTab === "booking" && <BookingView />}
            {activeTab === "profile" && <ProfileView />}
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-4 h-16">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="flex flex-col gap-1 h-full rounded-none"
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="h-4 w-4" />
                <span className="text-xs">Home</span>
              </Button>
              <Button
                variant={activeTab === "map" ? "default" : "ghost"}
                className="flex flex-col gap-1 h-full rounded-none"
                onClick={() => setActiveTab("map")}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Map</span>
              </Button>
              <Button
                variant={activeTab === "booking" ? "default" : "ghost"}
                className="flex flex-col gap-1 h-full rounded-none"
                onClick={() => setActiveTab("booking")}
              >
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Book</span>
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="flex flex-col gap-1 h-full rounded-none"
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
