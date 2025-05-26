import { useContext, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/ui/tabs"
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/ui/card"
import { ScrollArea } from "~/components/common/ui/scroll-area"
import { MedicationOrderForm } from "~/components/Grad/medicationOrderForm"
import { LabOrderForm } from "~/components/Grad/labOrderForm"
import { ImagingOrderForm } from "~/components/Grad/imagingOrderForm"
import { OrderQueue } from "~/components/Grad/orderQueue"
import { SignaturePartition } from "~/components/Grad/signaturePartition"
import { OrderKind, type CustomOrder, type MedicationOrder, type Order } from "~/core"
import { EmptyCard } from "../Med/EmptyCard"
import { GlobalContext } from "~/services/State"
import { api } from "~/utils/api"
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService"

export type newLocalOrder = Order & MedicationOrder & CustomOrder & {
  localOrderId: number
}

export function EMROrderSystem() {
  const { patient, setPatient } = useContext(GlobalContext)
  const [orders, setOrders] = useState<newLocalOrder[]>([])
  const [currentTab, setCurrentTab] = useState("medication")

  const addMedOrderMutation = api.grad.student_addMedOrder.useMutation()
  const addCustomOrderMutation = api.grad.student_addCustomOrder.useMutation()
  const addNotesMutation = api.emr.student_addNote.useMutation()

  const addOrder = (order: newLocalOrder) => {
    order.localOrderId = orders.length
    if (order.orderKind !== OrderKind.med) {
      order.order = order.order + " " + order.notes
    }
    setOrders([...orders, order])
  }

  const removeOrder = (index: number) => {
    orders.splice(index, 1)
    setOrders([...orders])
  }

  const clearOrders = () => {
    setOrders([])
  }

  const submitOrders = async () => {
    let error = false;
    const orderNames = [];
    for (const order of orders) {
      if (order.orderKind === OrderKind.med) {
        const { err } = await addMedOrderMutation.mutateAsync({ order, patientId: patient.dbId })
        if (err) { broadcastAnnouncement(err, Announcement.error); error = true; return; }
        patient.medicationOrders.push(order)
        orderNames.push(order.brandName)
      } else {
        const { err } = await addCustomOrderMutation.mutateAsync({ order, patientId: patient.dbId })
        if (err) { broadcastAnnouncement(err, Announcement.error); error = true; return; }
        patient.customOrders.push(order)
        orderNames.push(order.order)
      }
    }

    const note = `PreAuth Requested for the following orders: ${orderNames.toString()}`
    await addNotesMutation.mutateAsync({ type: "PreAuth", date: new Date().toDateString(), note, patientId: patient.dbId })
    patient.notes.push({ type: "PreAuth", date: new Date().toDateString(), note })


    if (!error) {
      broadcastAnnouncement(`${orders.length} order${orders.length !== 1 ? "s" : ""} have been signed and submitted.`, Announcement.success)
      setPatient({ ...patient })
      console.log(patient)
      clearOrders()
    }

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
              <SignaturePartition orderCount={orders.length} submitOrders={submitOrders} />
            </CardContent>
          </EmptyCard>
        </div>
      </div>
    </div>
  )
}

