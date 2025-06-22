import { Heart } from 'lucide-react'
import React from 'react'

const LoginHeader = () => {
  return (
    <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to MediCare Companion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in medication management. Sign into your account.
          </p>
        </div>
  )
}

export default LoginHeader