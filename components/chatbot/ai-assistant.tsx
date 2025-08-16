"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/AuthContext"
import { MessageCircle, Send, Bot, User, Sparkles, Loader2 } from "lucide-react"
import { toast } from "react-toastify"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  context?: string
  className?: string
}

export function AIAssistant({ context = "General fitness and nutrition advice", className = "" }: ChatbotProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load personalized suggestions when component mounts
  useEffect(() => {
    if (user) {
      loadPersonalizedSuggestions()
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Hi ${user.name}! I'm your personalized AI fitness assistant. I have access to your profile information including your ${user.sport || 'fitness'} preferences, ${user.fitnessLevel || 'fitness level'}, and goals. How can I help you today?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [user])

  const loadPersonalizedSuggestions = async () => {
    if (!user) return
    
    setIsLoadingSuggestions(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/suggestions`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error('Error loading suggestions:', error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/chat`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messageText,
            context: context
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to get AI response. Please try again.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  if (!user) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Please log in to access your personalized AI assistant.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          AI Fitness Assistant
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
        <CardDescription>
          Personalized advice based on your profile: {user.sport || 'General Fitness'} • {user.fitnessLevel || 'Beginner'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Messages */}
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        {suggestions.length > 0 && messages.length <= 1 && (
          <div className="p-4 border-t">
            <p className="text-sm font-medium mb-2">Quick suggestions for you:</p>
            <div className="flex flex-wrap gap-2">
              {isLoadingSuggestions ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading suggestions...</span>
                </div>
              ) : (
                suggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about diet plans, workouts, or any fitness advice..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
