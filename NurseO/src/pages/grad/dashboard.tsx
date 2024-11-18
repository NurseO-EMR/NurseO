import React from "react"
import { Bell, Calendar, ChevronDown, FileText, MoreHorizontal, Search, User, Activity, Pill, Clipboard, ChevronRight, Thermometer, TreesIcon as Lungs } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/common/ui/avatar"
import { Button } from "~/components/common/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/ui/card"
import { Input } from "~/components/common/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/common/ui/dropdown-menu"
import TopNav from "~/components/EMR/Nav/TopMenu/TopNav"

export default function PatientDashboardComponent() {
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <div className="min-h-screen bg-primary/5">
      <TopNav />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Patient Info */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary p-6 text-white">
            <div className="flex items-center space-x-4">

              <div>
                <h2 className="text-3xl font-bold">John Smith</h2>
                <p>Patient ID: 12345 • DOB: 05/15/1980 (43 years)</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-around items-center">
              <div className="flex space-x-4 w-full justify-around">
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Blood Type</p>
                  <p className="text-2xl font-bold">A+</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Height</p>
                  <p className="text-2xl font-bold">5 10 </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Weight</p>
                  <p className="text-2xl font-bold">180 lbs</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Allergies</p>
                  <p className="text-2xl font-bold">NKDA</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Flags</p>
                  <p className="text-2xl font-bold">None</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-medium">Time</p>
                  <p className="text-2xl font-bold">14:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-primary text-white w-full p-1 rounded-full justify-around">
            <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
            <TabsTrigger value="medical-history" className="rounded-full">Medical History</TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-full">Appointments</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-full">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vital Signs */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 text-primary mr-2" />
                    Vital Signs
                  </CardTitle>
                  <CardDescription>Last updated: 2 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity },
                      { name: "Heart Rate", value: "72", unit: "bpm", icon: Activity },
                      { name: "Temperature", value: "98.6", unit: "°F", icon: Thermometer },
                      { name: "Respiratory Rate", value: "14", unit: "breaths/min", icon: Lungs }
                    ].map((vital, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <vital.icon className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">{vital.name}</p>
                          <p className="text-lg font-semibold">{vital.value} <span className="text-sm text-primary">{vital.unit}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medications */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Pill className="h-5 w-5 text-primary mr-2" />
                    Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", insurance: "Covered", pharmacy: "Ready" },
                      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", insurance: "Prior Auth Required", pharmacy: "Pending" },
                      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", insurance: "Covered", pharmacy: "Ready" },
                    ].map((med, index) => (
                      <li key={index} className="flex items-center justify-between p-3 text-white bg-primary rounded-lg  cursor-pointer">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-primary">{med.dosage} - {med.frequency}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded ${med.insurance === "Covered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {med.insurance}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${med.pharmacy === "Filled" ? "bg-blue-100 text-blue-800" :
                              med.pharmacy === "Ready" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                              }`}>
                              {med.pharmacy}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recent Notes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clipboard className="h-5 w-5 text-primary mr-2" />
                  Recent Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-white ">
                  {[
                    { note: "Follow-up on blood pressure medication", date: "06/10/2023" },
                    { note: "Discussed diet and exercise plan", date: "05/28/2023" },
                    { note: "Ordered lipid panel for next visit", date: "05/15/2023" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-primary rounded-lg  cursor-pointer">
                      <FileText className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <p>{item.note}</p>
                        <p className="text-sm mt-1">{item.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical-history">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed medical history would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-white">
                  {[
                    { type: "Annual Physical", date: "06/15/2023", time: "10:00 AM" },
                    { type: "Cardiology Follow-up", date: "07/02/2023", time: "2:30 PM" },
                  ].map((appointment, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-primary rounded-lg  cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm">{appointment.date} at {appointment.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { name: "Lab Results", date: "05/30/2023" },
                    { name: "Radiology Report", date: "04/15/2023" },
                    { name: "Specialist Consultation", date: "03/22/2023" },
                  ].map((document, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-primary rounded-lg text-white  cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 " />
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm ">{document.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="text-black" size="sm">View</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}