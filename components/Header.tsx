'use client'

import Link from "next/link"
import AgentPulse from "./AgentPulse"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"

function Header() {
  return (
    <header className="sticky top-0 z-50 left-0 right-0 px-4 md:px-0 backdrop-blur-sm border-b border-gray-200 bg-white/50">
        <div className="container mx-auto">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-4"> 
                    <AgentPulse size="small" color="purple"/>
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Creator Hood</h1>   
                </Link>
            </div>

            <div className="flex items-center justify-between">
                <SignedIn>
                    <Link href="/manage-plan">
                        <Button variant={"outline"}
                        className="mr-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Manage Plan</Button>
                    </Link>
                    <div className="p-2 w-10 h-10 bg-purple-100 border-purple-200 rounded-full border flex items-center justify-center">
                        <UserButton />
                    </div>
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant='ghost' className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Sign In</Button>
                    </SignInButton>
                </SignedOut>
            </div>

            </div>
        </div>



    </header>
  )
}

export default Header