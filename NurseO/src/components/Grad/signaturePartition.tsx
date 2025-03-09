"use client"

import { useState } from "react"
import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Label } from "~/components/common/ui/label"
import { CheckCircle2, FileSignature } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/common/ui/dialog"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"

interface SignaturePartitionProps {
  orderCount: number
  clearOrders: () => void
}

export function SignaturePartition({ orderCount, clearOrders }: SignaturePartitionProps) {
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOrders = () => {
    setIsSubmitting(true)

    // Simulate authentication and submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsOpen(false)
      clearOrders()

      broadcastAnnouncement(`${orderCount} order${orderCount !== 1 ? "s" : ""} have been signed and submitted.`, Announcement.success)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Signature Required</h3>
          <p className="text-sm text-slate-500 ">
            {orderCount} order{orderCount !== 1 ? "s" : ""} pending signature
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button disabled={orderCount === 0} className="gap-2">
              <FileSignature className="h-4 w-4" />
              Sign & Submit Orders
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sign Orders</DialogTitle>
              <DialogDescription>
                Please enter your password to sign and submit {orderCount} order{orderCount !== 1 ? "s" : ""}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="text-sm text-slate-500 ">
                By signing these orders, you acknowledge that you have reviewed all details and take responsibility for
                their execution within the simulated environment.
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSignOrders} disabled={!name || isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Sign Orders
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

