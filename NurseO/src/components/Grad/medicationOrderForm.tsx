import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Textarea } from "~/components/common/ui/textarea"
import { Select } from "~/components/common/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/common/ui/form"
import { PlusCircle } from "lucide-react"
import { Frequency, OrderKind, OrderType, Routine } from "~/core"
import { type newLocalOrder } from "./emrOrderSystem"
import { SearchableSelect } from "../Admin/Form/SearchableSelect"
import { api } from "~/utils/api"
import { ICD10SearchBox } from "./ICD10SearchBox"
import { z } from "zod"


type MedicationOrderFormProps = {
  addOrder: (order: newLocalOrder) => void
}

const formSchema = z.object({
  id: z.number().min(-1, { message: "Medication name is required" }),
  dosage: z.string().min(1, { message: "Dosage is required" }),
  dispenseQuantity: z.string().min(1, { message: "Dispense quantity is required" }),
  refills: z.number().min(-1, { message: "Refills is required" }),
  route: z.string().min(1, { message: "Route is required" }),
  routine: z.string().min(1, { message: "Routine is required" }),
  frequency: z.nativeEnum(Frequency),
  notes: z.string().min(1, { message: "Pharmacy notes are required" }),
  icd10: z.object({ code: z.string().min(1, { message: "Pharmacy notes are required" }), description: z.string() }).optional()
})

const defaultValues = {
  dispenseQuantity: "",
  dosage: "",
  frequency: Frequency.NA,
  icd10: undefined,
  id: -1,
  notes: "",
  refills: 0,
  route: "",
  routine: ""
}

export function MedicationOrderForm(props: MedicationOrderFormProps) {
  const { data: meds } = api.grad.student_getAllMeds.useQuery()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), defaultValues: defaultValues
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const med = meds?.find(m => m.id === values.id)
    if (values.id === -1) {
      form.setError("id", { message: "Med is required" })
      return;
    }
    if (values.icd10?.code.length === 0) {
      form.setError("icd10", { message: "ICD10 Code is required" })
      return;
    }
    const newOrder: newLocalOrder = {
      concentration: values.dosage,
      frequency: values.frequency,
      id: values.id,
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
      genericName: med?.genericName,
      icd10: values.icd10,
      dispenseQuantity: values.dispenseQuantity,
      refills: parseInt(values.refills as unknown as string)
    }

    props.addOrder(newOrder)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medication Name</FormLabel>
                <FormControl>
                  <SearchableSelect label="Medication Name" hideLabel options={meds ?? []} labelKeys={["genericName", "brandName"]} valueKey="id" {...field}
                    onChange={v => field.onChange(parseInt(v))} borderColor="rgb(226 232 240)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dosage"
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

          <FormField
            control={form.control}
            name="dispenseQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dispense Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 30" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="refills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refills</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white data-[placeholder]:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    onChange={v => field.onChange(parseInt(v.target.value))}
                  >
                    <option value="0">No Refills</option>
                    <option value="1">1 Refill</option>
                    <option value="2">2 Refills</option>
                    <option value="3">3 Refills</option>
                    <option value="11">11 Refills</option>
                  </select>
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
                <Select {...field} label="Select route">
                  <option value=""></option>
                  <option value="Oral">Oral</option>
                  <option value="Intravenous">Intravenous</option>
                  <option value="Intramuscular">Intramuscular</option>
                  <option value="Subcutaneous">Subcutaneous</option>
                  <option value="Topical">Topical</option>
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
                <Select {...field} label="Select routine">
                  {Object.values(Routine).map((f, i) => <option value={f} key={i}>{f}</option>)}
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
                <Select {...field} label="Select frequency">
                  {Object.values(Frequency).map((f, i) => <option value={f} key={i}>{f}</option>)}
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
              <FormLabel>Notes to Pharmacy</FormLabel>
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
          Add Medication Order
        </Button>
      </form>
    </Form >
  )
}

