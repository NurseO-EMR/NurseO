import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/ui/tabs"
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/ui/card"
import { ScrollArea } from "~/components/common/ui/scroll-area"
import { MedicationOrderForm } from "~/components/Grad/medicationOrderForm"
import { LabOrderForm } from "~/components/Grad/labOrderForm"
import { ImagingOrderForm } from "~/components/Grad/imagingOrderForm"
import { OrderQueue } from "~/components/Grad/orderQueue"
import { SignaturePartition } from "~/components/Grad/signaturePartition"
import type { CustomOrder, MedicationOrder, Order } from "~/core"
import { EmptyCard } from "../Med/EmptyCard"

export type newLocalOrder = Order & MedicationOrder & CustomOrder & {
  localOrderId: number
}


export function EMROrderSystem() {
  const [orders, setOrders] = useState<newLocalOrder[]>([])
  const [currentTab, setCurrentTab] = useState("medication")

  const addOrder = (order: newLocalOrder) => {
    order.localOrderId = orders.length
    setOrders([...orders, order])
  }

  const removeOrder = (id: number) => {
    setOrders(orders.filter((order) => order.localOrderId !== id))
  }

  const clearOrders = () => {
    setOrders([])
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EmptyCard className="" title="">
            <CardHeader>
              <CardTitle>Order Entry</CardTitle>
              <CardDescription>Add medication, lab, and imaging orders to the queue</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="medication">Medication</TabsTrigger>
                  <TabsTrigger value="lab">Laboratory</TabsTrigger>
                  <TabsTrigger value="imaging">Imaging</TabsTrigger>
                </TabsList>
                <TabsContent value="medication">
                  <MedicationOrderForm addOrder={addOrder} />
                </TabsContent>
                <TabsContent value="lab">
                  <LabOrderForm addOrder={addOrder} />
                </TabsContent>
                <TabsContent value="imaging">
                  <ImagingOrderForm addOrder={addOrder} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </EmptyCard>
        </div>

        <div className="space-y-6">
          <EmptyCard title="">
            <CardHeader>
              <CardTitle>Order Queue</CardTitle>
              <CardDescription>Review and sign orders</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(85vh-24rem)] pr-4">
                <OrderQueue orders={orders} removeOrder={removeOrder} />
              </ScrollArea>
            </CardContent>
          </EmptyCard>

          <EmptyCard>
            <CardContent className="pt-6">
              <SignaturePartition orderCount={orders.length} clearOrders={clearOrders} />
            </CardContent>
          </EmptyCard>
        </div>
      </div>
    </div>
  )
}

