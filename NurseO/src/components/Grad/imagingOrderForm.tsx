"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/common/ui/button"
import { Textarea } from "~/components/common/ui/textarea"
import { Select } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import type { newLocalOrder } from "~/components/Grad/emrOrderSystem"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType } from "~/core"
import { Input } from "../common/ui/input"
import { useState } from "react"
import { ICD10SearchBox } from "./ICD10SearchBox"

const formSchema = z.object({
  imagingType: z.string().min(1, { message: "Imaging type is required" }),
  bodyPart: z.string().min(1, { message: "Body part is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  contrast: z.enum(["None", "With Contrast", "Without Contrast", "With and Without Contrast"], {
    required_error: "Contrast option is required",
  }),
  clinicalIndication: z.string().optional(),
  icd10: z.object({ code: z.string(), description: z.string() }).optional()
})

interface ImagingOrderFormProps {
  addOrder: (order: newLocalOrder) => void
}

export function ImagingOrderForm({ addOrder }: ImagingOrderFormProps) {
  const [icd10Code, setICD10Code] = useState<{ code: string, description: string }>({ code: "", description: "" })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagingType: "",
      contrast: "None",
      bodyPart: "",
      priority: "Routine",
      clinicalIndication: "",
      icd10: icd10Code,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newOrder: newLocalOrder = {
      id: -1,
      orderType: OrderType.provider,
      orderKind: OrderKind.imaging,
      order: `${values.imagingType} for ${values.bodyPart} ${values.contrast !== "None" ? values.contrast : ""}`,
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
      routine: "",
      icd10: {
        code: icd10Code.code,
        description: icd10Code.description
      }
    }

    addOrder(newOrder)
    form.reset()
    setICD10Code({ code: "", description: "" })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <FormField
            control={form.control}
            name="imagingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imaging Type</FormLabel>
                <FormControl>
                  <Select {...field} label="Imaging Type">
                    <option value=""></option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI">MRI</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="PET Scan">PET Scan</option>
                    <option value="Mammogram">Mammogram</option>
                    <option value="Bone Density Scan">Bone Density Scan</option>
                    <option value="Echocardiogram">Echocardiogram</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contrast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imaging Type</FormLabel>
                <FormControl>
                  <Select {...field} label="Imaging Type">
                    <option value="None">None</option>
                    <option value="With Contrast">With Contrast</option>
                    <option value="Without Contrast">Without Contrast</option>
                    <option value="With and Without Contrast">With and Without Contrast</option>
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
                  <Input {...field}></Input>
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
                <Select {...field} label="Test Type">
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="STAT">STAT</option>
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

        <FormField
          control={form.control}
          name="icd10"
          render={() => (
            <FormItem>
              <FormLabel>ICD 10 Diagnosis</FormLabel>
              <FormControl>
                <ICD10SearchBox onChange={setICD10Code} />
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

