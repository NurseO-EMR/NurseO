import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/common/ui/button"
import { Checkbox } from "~/components/common/ui/checkbox"
import { Textarea } from "~/components/common/ui/textarea"
import { Select } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import type { newLocalOrder } from "~/components/Grad/emrOrderSystem"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType } from "~/core"
import { ICD10SearchBox } from "./ICD10SearchBox"


const formSchema = z.object({
  testType: z.string().min(1, { message: "Test type is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  fasting: z.boolean().default(false),
  notes: z.string().optional(),
  icd10: z.object({ code: z.string(), description: z.string() }).optional()
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
      icd10: {},
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.icd10?.code || values.icd10.code.trim().length === 0) {
      form.setError("icd10", { message: "ICD10 Code is required" })
      return;
    }
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
      routine: "",
      icd10: {
        code: values.icd10.code,
        description: values.icd10.description
      }
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
                <Select {...field} label="Test Type">
                  <option value=""></option>
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                  <option value="CBC with Differential">CBC with Differential</option>
                  <option value="Basic Metabolic Panel (BMP)">Basic Metabolic Panel (BMP)</option>
                  <option value="Comprehensive Metabolic Panel (CMP)">
                    Comprehensive Metabolic Panel (CMP)
                  </option>
                  <option value="Lipid Panel">Lipid Profile</option>
                  <option value="Liver Function Tests">Liver Function Tests</option>
                  <option value="Thyroid Function Tests">Thyroid Function Tests</option>
                  <option value="Hemoglobin A1C">Hemoglobin A1C</option>
                  <option value="Urinalysis">Urinalysis</option>
                  <option value="Urine Culture">Urine Culture</option>
                  <option value="Blood Culture">Blood Culture</option>
                  <option value="PSA Level">PSA Level</option>
                  <option value="Vitamin D">Vitamin D</option>
                  <option value="SARS-CoV-2 PCR">SARS-CoV-2 PCR</option>
                  <option value="Influenza A">Influenza A</option>
                  <option value="Influenza B">Influenza B</option>
                  <option value="Spirometry Testing Result Consistent with COPD">Spirometry Testing Result Consistent with COPD</option>
                  <option value="Bone Density (DEXA)">Bone Density (DEXA)</option>
                  <option value="Mono Test">Mono Test</option>
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

        <FormField
          control={form.control}
          name="icd10"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ICD 10 Diagnosis</FormLabel>
              <FormControl>
                <ICD10SearchBox {...field} />
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

