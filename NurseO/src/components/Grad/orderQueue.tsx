import { Button } from "~/components/common/ui/button"
import { FlaskConical, Pill, Stethoscope, X } from "lucide-react"
import { Badge } from "~/components/common/ui/badge"
import { Card, CardContent } from "~/components/common/ui/card"
import { type Order, OrderKind } from "~/core"
import { type newLocalOrder } from "./emrOrderSystem"
import MedicationOrderSyntax from "../EMR/Orders/MedicationOrderSyntax"

interface OrderQueueProps {
  orders: newLocalOrder[]
  removeOrder: (id: number) => void
}

export function OrderQueue({ orders, removeOrder }: OrderQueueProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <p className="text-slate-500 ">No orders in queue</p>
        <p className="text-sm text-slate-500 ">Add orders using the forms on the left</p>
      </div>
    )
  }

  const getOrderIcon = (type: Order["orderKind"]) => {
    switch (type) {
      case OrderKind.med:
        return <Pill className="h-4 w-4" />
      case OrderKind.lab:
        return <FlaskConical className="h-4 w-4" />
      case OrderKind.imaging:
        return <Stethoscope className="h-4 w-4" />
      default:
        return <Stethoscope className="h-4 w-4" />
    }
  }

  const getOrderTypeLabel = (type: Order["orderKind"]) => {
    switch (type) {
      case OrderKind.med:
        return "Medication"
      case OrderKind.lab:
        return "Laboratory"
      case OrderKind.imaging:
        return "Imaging"
      default:
        return "Unknown"
    }
  }

  const getOrderTypeBadgeColor = (type: Order["orderKind"]) => {
    switch (type) {
      case OrderKind.med:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case OrderKind.lab:
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case OrderKind.imaging:
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80"
      default:
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
    }
  }

  return (
    <div className="space-y-3">
      {orders.map((order, i) => (
        <Card key={i} className="relative group">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`flex items-center gap-1 ${getOrderTypeBadgeColor(order.orderKind)}`}>
                    {getOrderIcon(order.orderKind)}
                    {getOrderTypeLabel(order.orderKind)}
                  </Badge>
                  <span className="text-xs text-slate-500 ">
                    {order.time}
                  </span>
                </div>
                <h4 className="font-medium">{order.genericName ?? order.brandName ?? order.order}</h4>
                <p className="text-sm text-slate-500 ">
                  {order.orderKind === OrderKind.med ? <MedicationOrderSyntax order={order} /> : order.notes}
                </p>
                <p>ICD10 Description: {order.icd10 ? `${order.icd10.description} (${order.icd10.code})` : null}</p>

              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                onClick={() => removeOrder(i)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove order</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

