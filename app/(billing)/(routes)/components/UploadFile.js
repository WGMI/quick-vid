import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadIcon } from "lucide-react"
import { useState } from "react"

export default function UploadFile({handleFileUpload}) {
    const [fileData, setFileData] = useState(null)

    return (
        <>
            <Card className="border-blue-300 shadow-md shadow-blue-100">
                <CardHeader className="border-b border-blue-100">
                    <CardTitle className="text-blue-700">Upload payroll file</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="payroll-file" className="text-blue-600">Choose file</Label>
                            <Input
                                id="payroll-file"
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={() => handleFileUpload}
                                className="cursor-pointer file:bg-blue-50 file:text-blue-700 file:border-blue-200 hover:file:bg-blue-100"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Upload File
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}