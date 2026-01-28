import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { loadingDuration } from '@/lib/loadingDuration'
export const SiteLoader = () => {
    const progress=loadingDuration()
  return (
    <>
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle > AI Analysis</CardTitle>
        <CardDescription>
         Creating your website DNA
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Progress value={progress} className="w-full max-w-sm">
      <ProgressLabel>Analyzing..</ProgressLabel>
      <ProgressValue />
    </Progress>
      </CardContent>
    </Card>
    </>
  )
}
