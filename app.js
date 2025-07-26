// ParkSmart App - Enhanced Responsive JavaScript

// Import Lucide icons library
import lucide from "lucide"

// Application State
let currentView = "dashboard"
let isDarkMode = false
let selectedDuration = 1
let searchQuery = ""

// Sample Data
const parkingSpots = [
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

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Update current time
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)

  // Set current date and time for booking
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const currentTime = now.toTimeString().slice(0, 5)

  const bookingDate = document.getElementById("booking-date")
  const bookingTime = document.getElementById("booking-time")

  if (bookingDate) bookingDate.value = today
  if (bookingTime) bookingTime.value = currentTime

  // Initialize event listeners
  initializeEventListeners()

  // Initialize views
  renderParkingSpots()
  updateBookingPrice()

  // Show initial view
  showView("dashboard")

  // Load saved theme
  loadTheme()
}

function initializeEventListeners() {
  // Theme toggle buttons
  const themeToggle = document.getElementById("theme-toggle")
  const desktopThemeToggle = document.getElementById("desktop-theme-toggle")

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  if (desktopThemeToggle) {
    desktopThemeToggle.addEventListener("click", toggleTheme)
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenuClose = document.getElementById("mobile-menu-close")
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileMenu)
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu()
      }
    })
  }

  // Navigation buttons
  const navButtons = document.querySelectorAll(".nav-btn, .mobile-nav-btn")
  navButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tab = this.getAttribute("data-tab")
      if (tab) {
        showView(tab)
        closeMobileMenu()
      }
    })
  })

  // Quick action cards
  const quickActionCards = document.querySelectorAll("[data-tab]")
  quickActionCards.forEach((card) => {
    card.addEventListener("click", function () {
      const tab = this.getAttribute("data-tab")
      if (tab) {
        showView(tab)
      }
    })
  })

  // Duration buttons
  const durationButtons = document.querySelectorAll(".duration-btn")
  durationButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      durationButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      selectedDuration = Number.parseInt(this.getAttribute("data-duration"))
      updateBookingPrice()
    })
  })

  // Search input
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = this.value
      renderParkingSpots()
    })
  }

  // Complete booking button
  const completeBookingBtn = document.getElementById("complete-booking-btn")
  if (completeBookingBtn) {
    completeBookingBtn.addEventListener("click", showBookingSuccess)
  }

  // Modal close
  const successModal = document.getElementById("success-modal")
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        closeModal()
      }
    })
  }
}

// Time Management
function updateCurrentTime() {
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

  const currentTimeElement = document.getElementById("current-time")
  if (currentTimeElement) {
    currentTimeElement.textContent = `${dateString} • ${timeString}`
  }
}

// Theme Management
function toggleTheme() {
  isDarkMode = !isDarkMode
  applyTheme()
  saveTheme()
}

function applyTheme() {
  const body = document.body
  const themeIcons = document.querySelectorAll("#theme-toggle i, #desktop-theme-toggle i")

  if (isDarkMode) {
    body.classList.add("dark")
    themeIcons.forEach((icon) => {
      icon.setAttribute("data-lucide", "sun")
    })
  } else {
    body.classList.remove("dark")
    themeIcons.forEach((icon) => {
      icon.setAttribute("data-lucide", "moon")
    })
  }

  // Reinitialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }
}

function saveTheme() {
  localStorage.setItem("parksmartTheme", isDarkMode ? "dark" : "light")
}

function loadTheme() {
  const savedTheme = localStorage.getItem("parksmartTheme")
  if (savedTheme) {
    isDarkMode = savedTheme === "dark"
    applyTheme()
  }
}

// View Management
function showView(viewName) {
  // Hide all views
  const views = document.querySelectorAll(".tab-content")
  views.forEach((view) => {
    view.classList.remove("active")
    view.classList.add("hidden")
  })

  // Show selected view
  const selectedView = document.getElementById(viewName + "-view")
  if (selectedView) {
    selectedView.classList.add("active")
    selectedView.classList.remove("hidden")
  }

  // Update navigation active states
  const navButtons = document.querySelectorAll(".nav-btn, .mobile-nav-btn")
  navButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-tab") === viewName) {
      btn.classList.add("active")
    }
  })

  currentView = viewName

  // Trigger view-specific actions
  if (viewName === "map") {
    renderParkingSpots()
  } else if (viewName === "booking") {
    updateBookingPrice()
  }
}

// Mobile Menu Management
function openMobileMenu() {
  const overlay = document.getElementById("mobile-menu-overlay")
  const menu = document.getElementById("mobile-menu")

  if (overlay && menu) {
    overlay.classList.remove("hidden")
    setTimeout(() => {
      menu.style.transform = "translateX(0)"
    }, 10)
  }
}

function closeMobileMenu() {
  const overlay = document.getElementById("mobile-menu-overlay")
  const menu = document.getElementById("mobile-menu")

  if (overlay && menu) {
    menu.style.transform = "translateX(-100%)"
    setTimeout(() => {
      overlay.classList.add("hidden")
    }, 300)
  }
}

// Parking Spots Management
function renderParkingSpots() {
  const container = document.getElementById("parking-spots-container")
  if (!container) return

  const filteredSpots = parkingSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  container.innerHTML = ""

  filteredSpots.forEach((spot) => {
    const spotCard = createSpotCard(spot)
    container.appendChild(spotCard)
  })
}

function createSpotCard(spot) {
  const card = document.createElement("div")
  card.className = `card hover:shadow-lg transition-all duration-300 ${spot.isRecommended ? "ring-2 ring-blue-500 bg-blue-50" : ""}`

  const isAvailable = spot.available > 0
  const statusClass = isAvailable ? "bg-green-500 animate-pulse" : "bg-red-500"
  const discountedPrice = spot.discount ? Math.round(spot.price * (1 - spot.discount / 100)) : spot.price

  card.innerHTML = `
        <div class="p-4">
            ${
              spot.isRecommended
                ? `
                <div class="flex items-center gap-2 mb-3">
                    <i data-lucide="award" class="h-4 w-4 text-blue-600"></i>
                    <span class="badge bg-blue-500 text-white text-xs">Recommended</span>
                    ${spot.discount ? `<span class="badge bg-green-100 text-green-800 text-xs">${spot.discount}% OFF</span>` : ""}
                </div>
            `
                : ""
            }
            
            <div class="space-y-3">
                <img src="${spot.image}" alt="${spot.name}" class="w-full h-32 object-cover rounded-lg">
                
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-sm md:text-base">${spot.name}</h3>
                            <p class="text-xs md:text-sm text-gray-600">${spot.address}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-lg md:text-xl font-bold text-blue-600">
                                ₹${discountedPrice}
                                ${spot.discount ? `<span class="text-sm text-gray-400 line-through ml-1">₹${spot.price}</span>` : ""}
                            </div>
                            <div class="text-xs text-gray-500">per hour</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4 text-xs md:text-sm text-gray-600">
                        <div class="flex items-center gap-1">
                            <i data-lucide="map-pin" class="h-3 w-3"></i>
                            ${spot.distance}
                        </div>
                        <div class="flex items-center gap-1">
                            <i data-lucide="star" class="h-3 w-3 fill-yellow-400 text-yellow-400"></i>
                            ${spot.rating}
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${statusClass}"></div>
                        <span class="text-xs md:text-sm">
                            ${isAvailable ? `${spot.available} of ${spot.total} spots available` : "Full"}
                        </span>
                    </div>
                    
                    <div class="flex flex-wrap gap-1">
                        ${spot.amenities
                          .slice(0, 3)
                          .map(
                            (amenity) => `
                            <span class="badge bg-gray-100 text-gray-700 text-xs">
                                ${getAmenityIcon(amenity)} ${amenity}
                            </span>
                        `,
                          )
                          .join("")}
                        ${spot.amenities.length > 3 ? `<span class="badge bg-gray-100 text-gray-700 text-xs">+${spot.amenities.length - 3}</span>` : ""}
                    </div>
                    
                    <button class="btn ${isAvailable ? "btn-primary" : "btn-outline"} w-full" ${!isAvailable ? "disabled" : ""} onclick="selectSpot(${spot.id})">
                        ${isAvailable ? "Book Now" : "Full"}
                    </button>
                </div>
            </div>
        </div>
    `

  // Initialize icons for this card
  setTimeout(() => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }, 0)

  return card
}

function getAmenityIcon(amenity) {
  const icons = {
    CCTV: '<i data-lucide="camera" class="h-3 w-3 mr-1"></i>',
    Security: '<i data-lucide="shield" class="h-3 w-3 mr-1"></i>',
    "EV Charging": '<i data-lucide="battery" class="h-3 w-3 mr-1"></i>',
    Covered: '<i data-lucide="umbrella" class="h-3 w-3 mr-1"></i>',
  }
  return icons[amenity] || ""
}

function selectSpot(spotId) {
  const spot = parkingSpots.find((s) => s.id === spotId)
  if (!spot || spot.available === 0) return

  showView("booking")
  updateBookingPrice()
  showToast("Spot Selected", `${spot.name} selected for booking`, "success")
}

// Booking Management
function updateBookingPrice() {
  const basePrice = 30
  const totalPrice = basePrice * selectedDuration
  const discount = Math.round(totalPrice * 0.15)
  const serviceFee = 5
  const memberDiscount = 3
  const finalPrice = totalPrice - discount + serviceFee - memberDiscount

  const priceBreakdown = document.getElementById("price-breakdown")
  const totalPriceElement = document.getElementById("total-price")
  const completeBookingBtn = document.getElementById("complete-booking-btn")

  if (priceBreakdown) {
    priceBreakdown.innerHTML = `
            <div class="flex justify-between">
                <span>Base Price (${selectedDuration}h)</span>
                <span>₹${totalPrice}</span>
            </div>
            <div class="flex justify-between text-green-600">
                <span>Smart Discount (15%)</span>
                <span>-₹${discount}</span>
            </div>
            <div class="flex justify-between">
                <span>Service Fee</span>
                <span>₹${serviceFee}</span>
            </div>
            <div class="flex justify-between text-blue-600">
                <span>Premium Member Discount</span>
                <span>-₹${memberDiscount}</span>
            </div>
            <hr>
            <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹${finalPrice}</span>
            </div>
            <div class="text-sm text-green-600 text-center">
                💰 You save ₹${discount + memberDiscount} with smart booking!
            </div>
        `
  }

  if (totalPriceElement) {
    totalPriceElement.textContent = `₹${finalPrice}`
  }

  if (completeBookingBtn) {
    completeBookingBtn.textContent = `Complete Booking - ₹${finalPrice}`
  }
}

// Modal Management
function showBookingSuccess() {
  const btn = document.getElementById("complete-booking-btn")
  if (btn) {
    btn.textContent = "Processing..."
    btn.disabled = true

    setTimeout(() => {
      btn.textContent = `Complete Booking - ₹${30 * selectedDuration * 0.85 + 2}`
      btn.disabled = false

      const modal = document.getElementById("success-modal")
      if (modal) {
        modal.classList.remove("hidden")
      }

      showToast("Booking Confirmed!", "Your parking spot has been reserved successfully.", "success")
    }, 2000)
  }
}

function closeModal() {
  const modal = document.getElementById("success-modal")
  if (modal) {
    modal.classList.add("hidden")
  }
  showView("dashboard")
}

// Toast Notifications
function showToast(title, message, type = "success") {
  const toast = document.getElementById("toast")
  const toastIcon = document.getElementById("toast-icon")
  const toastTitle = document.getElementById("toast-title")
  const toastMessage = document.getElementById("toast-message")

  if (!toast || !toastIcon || !toastTitle || !toastMessage) return

  // Set content
  toastTitle.textContent = title
  toastMessage.textContent = message

  // Set icon based on type
  let iconName = "check-circle"
  let iconClass = "text-green-500"

  switch (type) {
    case "success":
      iconName = "check-circle"
      iconClass = "text-green-500"
      break
    case "error":
      iconName = "x-circle"
      iconClass = "text-red-500"
      break
    case "warning":
      iconName = "alert-circle"
      iconClass = "text-yellow-500"
      break
    default:
      iconName = "info"
      iconClass = "text-blue-500"
  }

  toastIcon.className = iconClass
  toastIcon.innerHTML = `<i data-lucide="${iconName}" class="h-5 w-5"></i>`

  // Show toast
  toast.classList.remove("hidden")

  // Initialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden")
  }, 3000)
}

// Utility Functions
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatTime(time) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatCurrency(amount) {
  return `₹${amount.toLocaleString()}`
}

// Event Listeners for Global Events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu()
    closeModal()
  }
})

// Handle online/offline status
window.addEventListener("online", () => {
  showToast("Connected", "You are back online!", "success")
})

window.addEventListener("offline", () => {
  showToast("Offline", "You are currently offline. Some features may be limited.", "warning")
})

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}

console.log("ParkSmart App initialized successfully! 🚗✨")
