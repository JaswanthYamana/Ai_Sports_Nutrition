import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SportsPro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your ultimate sports and fitness companion. Join thousands of athletes on their journey to peak performance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Learn & Train
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Nutrition Guide
                </Link>
              </li>
              <li>
                <Link href="/health" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Health Monitoring
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Equipment Guide
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Events & Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/workout" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Workout Tracking
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Progress Analytics
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">support@sportspro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">123 Fitness Street, Sports City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 SportsPro. All rights reserved.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for athletes worldwide</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
