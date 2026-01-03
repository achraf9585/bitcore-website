'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-[#050505]">
      <Card className="w-[450px] border-red-900/20 bg-[#0f0518]/90 text-white backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-red-500">Authentication Error</CardTitle>
          <CardDescription className="text-gray-400">
            There was a problem signing you in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-red-950/30 p-4 border border-red-900/20">
            <h3 className="font-semibold text-red-400 mb-1">Error Details</h3>
            <p className="text-sm text-gray-300 break-words">
              {errorDescription || 'An unknown error occurred during authentication.'}
            </p>
            {errorCode && (
              <p className="text-xs text-gray-500 mt-2 font-mono">
                Code: {errorCode}
              </p>
            )}
             {error && (
              <p className="text-xs text-gray-500 mt-1 font-mono">
                Error: {error}
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Link href="/login">
              <Button variant="secondary">
                Try Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
