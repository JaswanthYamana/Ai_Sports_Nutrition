"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Play, Square, RotateCcw, CheckCircle, AlertTriangle, Zap } from "lucide-react"

interface MotionCaptureProps {
  selectedSport: string
  activeModule: any
}

const motionAnalysis = {
  accuracy: 87,
  timing: 72,
  form: 91,
  consistency: 68
}

const feedback = [
  {
    type: "success",
    message: "Excellent grip positioning! Your hand placement is spot on.",
    timestamp: "0:03"
  },
  {
    type: "warning", 
    message: "Timing slightly off - try to follow through 0.2s longer.",
    timestamp: "0:07"
  },
  {
    type: "success",
    message: "Great balance throughout the movement!",
    timestamp: "0:12"
  },
  {
    type: "error",
    message: "Foot placement too wide - narrow your stance by 6 inches.",
    timestamp: "0:15"
  }
]

export function MotionCapture({ selectedSport, activeModule }: MotionCaptureProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startRecording = () => {
    setIsRecording(true)
    setAnalysisComplete(false)
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false)
      setHasRecording(true)
      analyzeMotion()
    }, 5000)
  }

  const analyzeMotion = () => {
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisComplete(true)
    }, 3000)
  }

  const resetRecording = () => {
    setHasRecording(false)
    setAnalysisComplete(false)
    setIsRecording(false)
  }

  return (
    <div className="space-y-8">
      {/* Camera Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Motion Capture Studio
          </CardTitle>
          <CardDescription>
            Record your technique for AI-powered analysis and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {!hasRecording ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Position yourself in frame</p>
                    <p className="text-sm opacity-75">Make sure you have enough space to perform the movement</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Recording Complete</p>
                    <p className="text-sm opacity-75">
                      {analysisComplete ? "Analysis ready" : "Analyzing movement..."}
                    </p>
                  </div>
                </div>
              )}
              
              {isRecording && (
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Recording</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!hasRecording ? (
                <Button 
                  onClick={startRecording}
                  disabled={isRecording}
                  size="lg"
                  className="px-8"
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button onClick={resetRecording} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Record Again
                  </Button>
                  <Button disabled={!analysisComplete}>
                    <Zap className="w-4 h-4 mr-2" />
                    {analysisComplete ? "View Analysis" : "Analyzing..."}
                  </Button>
                </div>
              )}
            </div>

            {/* Instructions */}
            {activeModule && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Current Exercise: {activeModule.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow the steps below and record yourself performing the technique:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {activeModule.steps?.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisComplete && (
        <div className="space-y-6">
          {/* Scores */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>
                Your technique breakdown based on motion capture data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {motionAnalysis.accuracy}
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <Progress value={motionAnalysis.accuracy} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {motionAnalysis.timing}
                  </div>
                  <div className="text-sm text-muted-foreground">Timing</div>
                  <Progress value={motionAnalysis.timing} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {motionAnalysis.form}
                  </div>
                  <div className="text-sm text-muted-foreground">Form</div>
                  <Progress value={motionAnalysis.form} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {motionAnalysis.consistency}
                  </div>
                  <div className="text-sm text-muted-foreground">Consistency</div>
                  <Progress value={motionAnalysis.consistency} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Feedback</CardTitle>
              <CardDescription>
                Frame-by-frame analysis with improvement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className={`p-1 rounded-full ${
                      item.type === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                      item.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {item.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : item.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.message}</p>
                      <Badge variant="outline" size="sm" className="mt-1">
                        {item.timestamp}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Practice timing drills</p>
                    <p className="text-sm text-muted-foreground">
                      Focus on follow-through timing to improve your score
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Ready for next module</p>
                    <p className="text-sm text-muted-foreground">
                      Your form is excellent - you can advance to the next skill
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
