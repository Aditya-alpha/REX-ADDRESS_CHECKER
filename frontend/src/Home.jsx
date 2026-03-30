import logo from './assets/logo.png';
import x_logo from './assets/x_logo.png';
import waller_checker from './assets/wallet_checker.png';
import congo from './assets/congo.png';
import oops from './assets/oops.png';
import { useState } from 'react';
import { GrStatusGood } from "react-icons/gr";

export default function Home() {

    const [address, setAddress] = useState("")
    const [source, setSource] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isTrue, setIsTrue] = useState(null)

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
        <div className='flex flex-col justify-between min-h-screen pt-2 pb-6' >
            <nav className="w-full fixed bg-white z-10">
                <div className="sm:px-20 px-4 py-2 flex justify-between items-center">
                    <img src={logo} alt="Rex Logo" onClick={() => navigate("/")} className="sm:h-10 h-8 cursor-pointer" />
                    <img src={x_logo} alt="X Logo" onClick={() => window.open('https://x.com/rexd0tfun')} className="sm:h-9 h-7 cursor-pointer" />
                </div>
            </nav>
            <div className='flex flex-col justify-center' >
                <div className='flex flex-col items-center'>
                    {isTrue === null && (
                        <>
                            <img src={waller_checker} alt="Wallet Checker" className="sm:h-24 h-18 mx-auto mt-32 mb-8" />
                            <p className='mx-auto sm:text-3xl text-2xl'>Enter your Solana Address Below</p>
                        </>
                    )}

                    {isTrue === true && (
                        <>
                            <img src={congo} alt="Success" className="sm:h-32 h-24 mx-auto mt-24 mb-8" />
                            <div className='flex items-center gap-2' >
                                <p className='mx-auto sm:text-3xl text-2xl text-green-600'>You're on the {source} List </p>
                                <GrStatusGood className='sm:text-2xl text-2xl text-green-500 rounded-full' />
                            </div>
                        </>
                    )}

                    {isTrue === false && (
                        <>
                            <img src={oops} alt="Error" className="sm:h-24 h-20 mx-auto mt-32 mb-8" />
                            <p className='mx-auto sm:text-3xl text-2xl text-red-600'>Your wallet is not Whitelisted :(</p>
                        </>
                    )}
                </div>
                <input autoFocus onKeyDown={(e) => checkEnter(e)} type="text" className="sm:w-1/4 w-3/4 text-2xl tracking-wider mx-auto px-4 py-2 border border-gray-500 rounded-lg mt-2 mb-4" value={address} onChange={(e) => setAddress(e.target.value)} />
                <button className="bg-red-600 text-2xl text-white px-4 py-2 rounded mx-auto cursor-pointer" onClick={checkAddress} disabled={loading}>{loading ? "Checking..." : "Check Wallet"}</button>
            </div>
            <footer className='flex flex-col items-center justify-center mt-20' >
                <img src={logo} alt='Logo' className='sm:h-8 h-5' />
                <p className='text-sm mt-1' >AI Agent Rentals on Solana</p>
            </footer>
        </div>
    );
}