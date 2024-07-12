"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Billing = ({ transactions, usercredits }) => {
    const router = useRouter()
    const [showDialog, setShowDialog] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [credits, setCredits] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState('')

    const calculateCost = () => { return credits }
    const calculateVideos = () => { return Math.floor(credits / 100) }

    const handleMpesaPush = async () => {
        if (isNaN(phoneNumber) || phoneNumber.length < 9) {
            alert('Please enter a valid phone number');
            return;
        }

        const data = { credits, phoneNumber }

        try {
            const res = await axios.post("api/payment", data)

            if (res.status === 200) {
                setShowSuccessDialog(true)
            }

        } catch (error) {
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    }

    const refreshInvoice = async (status,invoiceNo) => {
        try {
            const res = await axios.post("api/payment/status", { invoiceNo })

            if (res.status === 200) {   
                if(res.data.data.invoice.state != status){
                    updateTransaction(invoiceNo,res.data.data.invoice.state)
                }
            }

        } catch (error) {
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    }

    const updateTransaction = async (invoiceNo,status) => {
        try {
            await axios.put("api/payment/update", {invoiceNo,status})
            router.refresh()
        } catch (error) {
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
                <DialogContent>
                    <DialogHeader>Success</DialogHeader>
                    <DialogDescription>
                        You will receive a prompt on your phone. Click OK when done.
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => {
                            setShowSuccessDialog(false)
                            router.refresh()
                        }}>OK</Button>
                        <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>Purchase Credits</DialogHeader>
                    <DialogDescription>
                        Credits allow you to generate from prompts, edit your scripts, and create videos with amazing AI art. Only pay for what you use.
                        <div className="mt-6">
                            <Label className="my-4">Credits:</Label>
                            <Input className="my-4" type="number" value={credits} onChange={e => setCredits(e.target.value)} placeholder="Number of credits to buy" />
                            <div className="flex flex-col">
                                <Label className="my-4">Cost: {calculateCost()} Ksh</Label>
                                <Label className="my-4">~ {calculateVideos()} video(s)</Label>
                            </div>
                            <Label className="my-4">Mpesa Number:</Label>
                            <div className="flex my-4 flex-row justify-center">
                                <Label className="me-3">+254</Label><Input type="text" placeholder="700111222" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </div>
                            {(phoneNumber.length > 0 && phoneNumber.length > 9) && <p className='text-red-500'>Phone number should have 9 digits. Do not add +254 or 0.</p>}
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => handleMpesaPush()}>Send Mpesa STK</Button>
                        <Button onClick={() => { setCredits(0); setPhoneNumber(''); setShowDialog(false) }}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex-1 p-6 sm:p-10">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Billing</h1>
                    </div>
                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Credits</CardTitle>
                                <CardDescription>Manage and purchase your credits.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Credits</p>
                                            <p className="font-medium border border-yellow-400 rounded-md p-2 my-2">{usercredits.count} credits</p>
                                            <p className="text-sm text-muted-foreground">(One video: ~100 credits)</p>
                                        </div>
                                        <Button variant="outline" onClick={() => setShowDialog(true)}>Buy Credits</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="px-7">
                                <CardTitle>Invoices</CardTitle>
                                <CardDescription>View and manage your invoices. Click Refresh to check the status of your transaction and have your credits added.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice ID</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Credits</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Refresh Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.map((item) => (
                                            <TableRow>
                                                <TableCell className="font-medium">{item.invoice_id}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{item.status}</Badge>
                                                </TableCell>
                                                <TableCell>{item.credit_count}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{item.createdAt.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                                <TableCell><Button onClick={() => refreshInvoice(item.status,item.invoice_id)}>Refresh</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreditCardIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}


function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

export default Billing;