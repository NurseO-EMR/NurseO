"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/common/ui/button"
import { Textarea } from "~/components/common/ui/textarea"
import { Select, SelectItem } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import type { newLocalOrder } from "~/components/Grad/emrOrderSystem"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType } from "~/core"

const formSchema = z.object({
  imagingType: z.string().min(1, { message: "Imaging type is required" }),
  bodyPart: z.string().min(1, { message: "Body part is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  contrast: z.enum(["None", "With Contrast", "Without Contrast", "With and Without Contrast"], {
    required_error: "Contrast option is required",
  }),
  clinicalIndication: z.string().min(1, { message: "Clinical indication is required" }),
})

interface ImagingOrderFormProps {
  addOrder: (order: newLocalOrder) => void
}

export function ImagingOrderForm({ addOrder }: ImagingOrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagingType: "",
      bodyPart: "",
      priority: "Routine",
      contrast: "None",
      clinicalIndication: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newOrder: newLocalOrder = {
      id: -1,
      orderType: OrderType.provider,
      orderKind: OrderKind.lab,
      order: `${values.imagingType} - ${values.bodyPart}`,
      time: new Date().toLocaleTimeString(),
      concentration: "",
      frequency: Frequency.NA,
      localOrderId: -1,
      mar: [],
      notes: `Priority: ${values.priority}, Contrast: ${values.contrast}, Clinical Indication: ${values.clinicalIndication}`,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="imagingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imaging Type</FormLabel>
                <FormControl>
                  <Select onChange={field.onChange} defaultValue={field.value} label="Imaging Type">
                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                    <SelectItem value="CT Scan">CT Scan</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                    <SelectItem value="PET Scan">PET Scan</SelectItem>
                    <SelectItem value="Mammogram">Mammogram</SelectItem>
                    <SelectItem value="Bone Density Scan">Bone Density Scan</SelectItem>
                    <SelectItem value="Echocardiogram">Echocardiogram</SelectItem>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyPart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Part</FormLabel>
                <FormControl>
                  <Select onChange={field.onChange} defaultValue={field.value} label="Body Part">
                    <SelectItem value="Head">Head</SelectItem>
                    <SelectItem value="Neck">Neck</SelectItem>
                    <SelectItem value="Chest">Chest</SelectItem>
                    <SelectItem value="Abdomen">Abdomen</SelectItem>
                    <SelectItem value="Pelvis">Pelvis</SelectItem>
                    <SelectItem value="Spine">Spine</SelectItem>
                    <SelectItem value="Upper Extremity">Upper Extremity</SelectItem>
                    <SelectItem value="Lower Extremity">Lower Extremity</SelectItem>
                    <SelectItem value="Whole Body">Whole Body</SelectItem>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="clinicalIndication"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinical Indication</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter clinical indication for this imaging study" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Imaging Order
        </Button>
      </form>
    </Form>
  )
}

