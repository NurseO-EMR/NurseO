import { useForm } from "react-hook-form"
import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Textarea } from "~/components/common/ui/textarea"
import { Select, SelectItem } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType, Routine } from "~/core"
import { type newLocalOrder } from "./emrOrderSystem"
import { SearchableSelect } from "../Admin/Form/SearchableSelect"
import { api } from "~/utils/api"
import { useState } from "react"


type MedicationOrderFormProps = {
  addOrder: (order: newLocalOrder) => void
}

export function MedicationOrderForm(props: MedicationOrderFormProps) {
  const { data: meds } = api.grad.student_getAllMeds.useQuery()
  const [id, setId] = useState(-1);

  const form = useForm<newLocalOrder>()

  const onSubmit = (values: newLocalOrder) => {
    const med = meds?.find(m => m.id === id)
    const newOrder: newLocalOrder = {
      concentration: values.concentration,
      frequency: values.frequency,
      id: id,
      mar: [],
      notes: values.notes,
      orderId: -1,
      orderIndex: -1,
      orderKind: OrderKind.med,
      orderType: OrderType.provider,
      PRNNote: "",
      route: values.route,
      routine: values.routine,
      order: "",
      localOrderId: -1,
      time: new Date().toLocaleTimeString(),
      brandName: med?.brandName,
      genericName: med?.genericName

    }

    props.addOrder(newOrder)
    form.reset()
    setId(-1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id"
            render={() => (
              <FormItem>
                <FormLabel>Medication Name</FormLabel>
                <FormControl>
                  <SearchableSelect label="Medication Name" hideLabel options={meds ?? []} labelKeys={["genericName", "brandName"]} valueKey="id" value={id}
                    onChange={v => setId(parseInt(v))} borderColor="rgb(226 232 240)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="concentration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosage</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 500mg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <Select onChange={field.onChange} defaultValue={field.value} label="Select route">
                  <SelectItem value="Oral">Oral</SelectItem>
                  <SelectItem value="Intravenous">Intravenous</SelectItem>
                  <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                  <SelectItem value="Subcutaneous">Subcutaneous</SelectItem>
                  <SelectItem value="Topical">Topical</SelectItem>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="routine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Routine</FormLabel>
                <Select onChange={field.onChange} defaultValue={field.value} label="Select routine">
                  {Object.values(Routine).filter(v => v.length > 0).map((f, i) => <SelectItem value={f} key={i}>{f}</SelectItem>)}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select onChange={field.onChange} defaultValue={field.value} label="Select frequency">
                  {Object.values(Frequency).filter(v => v.length > 0).map((f, i) => <SelectItem value={f} key={i}>{f}</SelectItem>)}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any additional instructions or notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Medication Order
        </Button>
      </form>
    </Form>
  )
}

