import { useEffect } from 'react';
import logo from './assets/logo.png';
import x_logo from './assets/x_logo.png';
import waller_checker from './assets/wallet_checker.png';
import congo from './assets/congo.png';
import oops from './assets/oops.png';
import coin_gif from './assets/coin_gif.gif';
import { useState } from 'react';
import { GrStatusGood } from "react-icons/gr";

export default function Home() {

    const [address, setAddress] = useState("")
    const [source, setSource] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isTrue, setIsTrue] = useState(null)

    const targetDate = new Date("April 26, 2026 21:30:00 GMT+0530").getTime()

    const calculateTimeLeft = () => {
        const now = new Date().getTime()
        const diff = targetDate - now

        if (diff <= 0) return null

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    async function checkAddress() {
        setLoading(true)
        if (!address) {
            setLoading(false)
            return
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/check-address`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address }),
            })

            const data = await res.json()
            setIsTrue(data.result)
            setSource(data.source)
        } catch (err) {
            alert("Server error")
        } finally {
            setLoading(false)
        }
    }

    function checkEnter(e) {
        if (e.key === "Enter") {
            checkAddress()
        }
    }

    return (
        <div className='flex bg-gray-100 flex-col justify-between min-h-screen' >
            <nav className="w-full fixed bg-gray-100 z-10 py-1">
                <div className="sm:px-20 px-4 py-2 flex justify-between items-center">
                    <img src={logo} alt="Rex Logo" onClick={() => navigate("/")} className="sm:h-10 h-8 cursor-pointer" />
                    <img src={x_logo} alt="X Logo" onClick={() => window.open('https://x.com/beardotxyz?s=21')} className="sm:h-9 h-7 cursor-pointer" />
                </div>
            </nav>
            <div className='flex flex-col justify-center' >
                <div className="flex justify-center gap-4 mt-24 mb-6 sm:px-0 px-8">
                    {timeLeft ? (
                        <div className="flex gap-6">

                            {/* Card */}
                            <div className="relative sm:w-20 sm:h-20 w-18 h-18">

                                {/* Black shadow layer */}
                                <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1"></div>

                                {/* Front card */}
                                <div className="relative bg-white border-2 border-black rounded-2xl w-full h-full flex flex-col justify-center items-center">
                                    <p className="text-3xl font-extrabold">
                                        {String(timeLeft.days).padStart(2, "0")}
                                    </p>
                                    <span className="text-xs tracking-widest">DAYS</span>
                                </div>

                            </div>

                            {/* Repeat for others */}

                            <div className="relative sm:w-20 sm:h-20 w-18 h-18">
                                <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1"></div>
                                <div className="relative bg-white border-2 border-black rounded-2xl w-full h-full flex flex-col justify-center items-center">
                                    <p className="text-3xl font-extrabold">
                                        {String(timeLeft.hours).padStart(2, "0")}
                                    </p>
                                    <span className="text-xs tracking-widest">HOURS</span>
                                </div>
                            </div>

                            <div className="relative sm:w-20 sm:h-20 w-18 h-18">
                                <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1"></div>
                                <div className="relative bg-white border-2 border-black rounded-2xl w-full h-full flex flex-col justify-center items-center">
                                    <p className="text-3xl font-extrabold">
                                        {String(timeLeft.minutes).padStart(2, "0")}
                                    </p>
                                    <span className="text-xs tracking-widest">MINS</span>
                                </div>
                            </div>

                            <div className="relative sm:w-20 sm:h-20 w-18 h-18">
                                <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1"></div>
                                <div className="relative bg-white border-2 border-black rounded-2xl w-full h-full flex flex-col justify-center items-center">
                                    <p className="text-3xl font-extrabold">
                                        {String(timeLeft.seconds).padStart(2, "0")}
                                    </p>
                                    <span className="text-xs tracking-widest">SECS</span>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <p className="text-xl font-bold text-red-600">EXPIRED</p>
                    )}
                </div>
                <img src={coin_gif} alt="Coin GIF" className="mx-auto mb-6" />
                <p className='mx-auto sm:text-5xl text-4xl font-semibold tracking-wider'>Check your eligibility</p>
                <div className="relative sm:w-1/4 w-[90%] mx-auto mt-10">

                    {/* Shadow layer */}
                    <div className="absolute inset-0 bg-black rounded-2xl translate-x-2 translate-y-2"></div>

                    {/* Main card */}
                    <div className='relative z-10 flex flex-col items-center bg-white border-2 border-black rounded-2xl sm:py-6 py-4 px-4'>

                        <div className='flex flex-col items-center'>
                            {isTrue === null && (
                                <p className='mx-auto sm:text-3xl text-2xl'>Are you on the list?</p>
                            )}

                            {isTrue === true && (
                                <div className='flex items-center gap-2'>
                                    {source === "whitelist" ?
                                        <p className='mx-auto sm:text-3xl text-2xl text-green-600'>Your wallet is Whitelisted</p>
                                        :
                                        <p className='mx-auto sm:text-3xl text-2xl text-green-600'>You're on the OG list</p>
                                    }
                                    <GrStatusGood className='sm:text-2xl text-2xl text-green-500 rounded-full' />
                                </div>
                            )}

                            {isTrue === false && (
                                <p className='mx-auto sm:text-3xl text-2xl text-red-600'>
                                    Your wallet is not Whitelisted :(
                                </p>
                            )}
                        </div>

                        <p className='mx-auto sm:text-xl text-base text-gray-600 text-center'>
                            Paste your wallet address to see are you on the list
                        </p>

                        <input
                            autoFocus
                            onKeyDown={(e) => checkEnter(e)}
                            type="text"
                            className="sm:w-11/12 w-full text-2xl tracking-wider mx-auto px-4 py-2 border border-gray-500 rounded-2xl mt-2 mb-4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button
                            className="sm:w-11/12 w-full bg-red-800 text-2xl text-white px-4 py-2 rounded-full mx-auto cursor-pointer"
                            onClick={checkAddress}
                            disabled={loading}
                        >
                            {loading ? "Checking..." : "Check Wallet"}
                        </button>

                    </div>
                </div>
            </div>
            <footer className='flex flex-col items-center justify-center mt-20 pb-6' >
                <img src={logo} alt='Logo' className='sm:h-8 h-5' />
            </footer>
        </div>
    );
}