import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/common/ui/button"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Textarea } from "~/components/common/ui/textarea"
import { Select, SelectItem } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import type { newLocalOrder } from "~/components/Grad/emrOrderSystem"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType } from "~/core"

const formSchema = z.object({
  testType: z.string().min(1, { message: "Test type is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  fasting: z.boolean().default(false),
  notes: z.string().optional(),
})

interface LabOrderFormProps {
  addOrder: (order: newLocalOrder) => void
}

export function LabOrderForm({ addOrder }: LabOrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testType: "",
      priority: "Routine",
      fasting: false,
      notes: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newOrder: newLocalOrder = {
      id: -1,
      orderType: OrderType.provider,
      orderKind: OrderKind.lab,
      order: values.testType,
      time: new Date().toLocaleTimeString(),
      concentration: "",
      frequency: Frequency.NA,
      localOrderId: -1,
      mar: [],
      notes: `Priority: ${values.priority}${values.fasting ? ", Fasting" : ""}${values.notes ? `, Notes: ${values.notes}` : ""}`,
      orderId: -1,
      orderIndex: -1,
      PRNNote: "",
      route: "",
      routine: ""
    }

    addOrder(newOrder)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="testType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Type</FormLabel>

              <FormControl>
                <Select onChange={field.onChange} defaultValue={field.value} label="Test Type">
                  <SelectItem value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</SelectItem>
                  <SelectItem value="Basic Metabolic Panel (BMP)">Basic Metabolic Panel (BMP)</SelectItem>
                  <SelectItem value="Comprehensive Metabolic Panel (CMP)">
                    Comprehensive Metabolic Panel (CMP)
                  </SelectItem>
                  <SelectItem value="Lipid Panel">Lipid Panel</SelectItem>
                  <SelectItem value="Liver Function Tests">Liver Function Tests</SelectItem>
                  <SelectItem value="Thyroid Function Tests">Thyroid Function Tests</SelectItem>
                  <SelectItem value="Hemoglobin A1C">Hemoglobin A1C</SelectItem>
                  <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                  <SelectItem value="Urine Culture">Urine Culture</SelectItem>
                  <SelectItem value="Blood Culture">Blood Culture</SelectItem>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select onChange={field.onChange} defaultValue={field.value} label="Test Type">
                    <SelectItem value="Routine">Routine</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="STAT">STAT</SelectItem>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fasting"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border border-slate-200 p-4 ">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Fasting Required</FormLabel>
                </div>
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
          Add Lab Order
        </Button>
      </form>
    </Form >
  )
}

