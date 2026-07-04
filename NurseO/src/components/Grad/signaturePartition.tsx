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
import { useSession } from "next-auth/react"

interface SignaturePartitionProps {
  orderCount: number
  submitOrders: () => Promise<void>
}

export function SignaturePartition(props: SignaturePartitionProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const session = useSession()

  const handleSignOrders = async () => {
    setIsSubmitting(true)
    if (name !== session.data?.user.name) {
      setError("Name is incorrect")
      setIsSubmitting(false)
      return;
    }
    try {
      await props.submitOrders()
    } catch (e) {
      broadcastAnnouncement(String(e), Announcement.error)
    }

    setIsSubmitting(false)
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Signature Required</h3>
          <p className="text-sm text-slate-500 ">
            {props.orderCount} order{props.orderCount !== 1 ? "s" : ""} pending signature
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button disabled={props.orderCount === 0} className="gap-2">
              <FileSignature className="h-4 w-4" />
              Sign & Submit Orders
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sign Orders</DialogTitle>
              <DialogDescription>
                Please enter your full name to sign and submit {props.orderCount} order{props.orderCount !== 1 ? "s" : ""}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                {error ? <p className="text-sm text-red text-center">{error}</p> : null}
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  required
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

