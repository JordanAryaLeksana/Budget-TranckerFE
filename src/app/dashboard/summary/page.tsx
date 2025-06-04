"use client"
import { useState, useEffect } from "react"
import { FaRobot, FaSync } from "react-icons/fa"
import {
    generateMonthlySummaries,
    fetchAllMonthlySummaries,
} from "@/services/monthlySummary"
import { profile as fetchProfile } from "@/services/auth"
import { ModalProps } from "@/interfaces/IModal"
import { SummaryItem } from "@/interfaces/ISummary"
import { LLMResponse } from "@/interfaces/ILLM"

import Modal from "@/ui/Modal"


export default function SummaryPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<LLMResponse | null>(null)
    const [alreadyGenerated, setAlreadyGenerated] = useState<boolean>(false)
    const [errorModal, setErrorModal] = useState<ModalProps | null>(null)

    const checkTodaySummary = async () => {
        try {
            const token = localStorage.getItem("token")
            // console.log("token",token)
            const profileRes = await fetchProfile(token || "")
            const userId = profileRes.data.id

            const res = await fetchAllMonthlySummaries()
            // console.log(res.data)
            const today = new Date().toISOString().slice(0, 10);
            const found = res.data.find((item: SummaryItem) =>
                item.user_id === userId && item.created_at?.slice(0, 10) === today)
            if (found) {
                setAlreadyGenerated(true)
                setResponse({
                    summary: found.ai_summary,
                    recomendations: found.ai_recomendations,
                    trend_analysis: found.trend_analysis,
                })
                console.log("Found summary for today:", found.ai_recomendations)
            } else {
                setAlreadyGenerated(false)
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorModal({
                    message: error.message,
                    type: "danger",
                })
                console.error("Error checking today's summary:", error.message)
            } else {
                setErrorModal({
                    message: "Terjadi Kesalahan",
                    type: "danger",
                })
            }
        }

    }

    useEffect(() => {
        checkTodaySummary()
    }, [])
    const handleGenerateSummary = async () => {
        setLoading(true)
        try {
            const response = await generateMonthlySummaries()
            console.log(response)   
            if (response.success && response.data) {
                setResponse({
                    summary: response.data.summary,
                    recomendations: response.data.recommendations,
                    trend_analysis: response.data.trend_analysis,
                })
            }
            console.log("Generate Monthly Summary Response:", response.data.recomendations)
            setAlreadyGenerated(true)
        } catch (error) {
            if (error instanceof Error) {
                setErrorModal({
                    message: error.message,
                    type: "danger",
                })
            } else {
                setErrorModal({
                    message: "Terjadi Kesalahan",
                    type: "danger",
                })
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    AI Financial Summary
                </h2>
                <button onClick={handleGenerateSummary}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <span className="inline-block">
                        {loading ? <FaSync className="animate-spin" /> : <FaRobot />}
                    </span>
                    {loading ? "Generating..." : "Generate Summary"}
                </button>

            </div>
            {response && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow">
                        <h3 className="text-lg font-semibold mb-2">Summary Overview</h3>
                        <p className="text-gray-600">
                            {response.summary}
                        </p>
                    </div>
                    {Array.isArray(response.recomendations) && (
                        <div className="bg-white rounded-xl p-4 shadow">
                            <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                               {response.recomendations.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-yellow-600">•</span>
                                        {item}
                                    </li>
                                )
                               )}
                            </ul>
                        </div>
                    )}
                    <div className="bg-white rounded-xl p-4 shadow">
                        <h3 className="text-lg font-semibold mb-2 text-yellow-600">Trend Analysis</h3>
                        <p className="text-gray-700">
                            {response.trend_analysis}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        You can Generate detail financial in tomorrow
                    </p>
                    <p className="text-xs text-gray-400">
                        Powered by AI - Meta Llama 3
                    </p>
                </div>
            )}
            {!response && !loading && !alreadyGenerated &&(
                <div className="text-gray-500 text-sm">
                    Click this Button <b>&quot;Generate Summary&quot;</b> for generate your financial summary. 
                </div>
            )}
            {errorModal && (
                <Modal
                    type="danger"
                    message={errorModal.message}
                    onOk={ () => errorModal.onOk}
                />
            )}
        </div>
    )
}