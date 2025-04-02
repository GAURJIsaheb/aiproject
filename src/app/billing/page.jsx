"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { CircleDollarSign, Zap, Check } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const creditPlans = [
    {
        credits: 10,
        cost: 1,
        popular: false
    },
    {
        credits: 50,
        cost: 5,
        popular: false
    },
    {
        credits: 100,
        cost: 9,
        popular: true
    },
    {
        credits: 200,
        cost: 17,
        popular: false
    },
    {
        credits: 300,
        cost: 22,
        popular: false
    },
]

function Billing() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Choose Your Credit Plan
                    </h1>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                        Power up your experience with credits. The more you buy, the more you save.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-8">
                    {creditPlans.map((plan, index) => (
                        <Card key={index} className={cn(
                            "relative overflow-hidden transition-all duration-300 hover:scale-105",
                            "bg-gray-800/50 border-gray-700 backdrop-blur-sm",
                            plan.popular && "ring-2 ring-blue-500 scale-105"
                        )}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl">
                                        Popular
                                    </div>
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <CircleDollarSign className="w-12 h-12 text-blue-400" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-center text-white mb-2">
                                    {plan.credits} Credits
                                </h3>
                                
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold text-white">${plan.cost}</span>
                                    <span className="text-gray-400 ml-2">USD</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center text-gray-300">
                                        <Check className="w-5 h-5 text-blue-400 mr-2" />
                                        <span>${(plan.cost / plan.credits).toFixed(2)} per credit</span>
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <Check className="w-5 h-5 text-blue-400 mr-2" />
                                        <span>No expiration</span>
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <Check className="w-5 h-5 text-blue-400 mr-2" />
                                        <span>Instant delivery</span>
                                    </li>
                                </ul>

                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    size="lg"
                                >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Buy Credits
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">
                        All plans include
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                            <div className="flex justify-center mb-4">
                                <CircleDollarSign className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Flexible Usage</h3>
                            <p className="text-gray-400">Use your credits anytime, anywhere. No restrictions.</p>
                        </div>
                        <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                            <div className="flex justify-center mb-4">
                                <Zap className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Instant Access</h3>
                            <p className="text-gray-400">Credits are added to your account immediately after purchase.</p>
                        </div>
                        <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                            <div className="flex justify-center mb-4">
                                <Check className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
                            <p className="text-gray-400">All transactions are processed securely through Stripe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing