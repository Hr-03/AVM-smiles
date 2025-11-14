"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MinusSquare } from "lucide-react";

export default function ConsultationPage() {
  const printRef = useRef(null);

  const [form, setForm] = useState({
    height: "",
    weight: "",
    bloodPressure: "",
    pulseRate: "",
    diagnosis: "",
    labTests: [],
    notes: "",
    nextConsultationDate: "",
    nextConsultationTime: "",
  });

  const patientInfo = {
    name: "Aman Sharma",
    id: "PT-2025-00123",
    age: 29,
    gender: "Male",
    contact: "+91 98765 43210",
    registrationDate: "2023-04-15",
    dob: "1996-06-25",
    visits: 5,
    lastDiagnosis: "Tooth Extraction",
  };

  const clinicInfo = {
    name: "AVM Smiles Dental Clinic",
    regNo: "REG-456789",
    address: "12, Harmony Street, Pune, Maharashtra",
    phone: "+91 20 1234 5678",
  };

  const doctorInfo = {
    name: "Dr. Kavita Rao",
    qualification: "BDS, MDS (Prosthodontics)",
    regDate: "2020-03-15",
    signature: "Dr. Kavita Rao",
  };

  const [ongoingTreatments, setOngoingTreatments] = useState([
    { name: "Scaling" },
    { name: "Cavity Filling" },
  ]);

  const [ongoingMedicines, setOngoingMedicines] = useState([
    { name: "Paracetamol 500mg", dosage: "1 tab BD" },
    { name: "Calcium 500mg", dosage: "1 tab OD" },
  ]);

  const [newTreatment, setNewTreatment] = useState("");
  const [newMedicine, setNewMedicine] = useState({ name: "", dosage: "" });
  const [newLabTest, setNewLabTest] = useState("");

  const addLabTest = () => {
    const value = newLabTest.trim();
    if (!value) return;
    setForm((s) => ({ ...s, labTests: [...(s.labTests || []), value] }));
    setNewLabTest("");
  };

  const removeLabTest = (index) => {
    setForm((s) => ({
      ...s,
      labTests: (s.labTests || []).filter((_, i) => i !== index),
    }));
  };

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  const addTreatment = () => {
    if (newTreatment.trim()) {
      setOngoingTreatments([...ongoingTreatments, { name: newTreatment }]);
      setNewTreatment("");
    }
  };

  const addMedicine = () => {
    if (newMedicine.name.trim() && newMedicine.dosage.trim()) {
      setOngoingMedicines([...ongoingMedicines, newMedicine]);
      setNewMedicine({ name: "", dosage: "" });
    }
  };

  const removeTreatment = (index) => {
    setOngoingTreatments((s) => s.filter((_, i) => i !== index));
  };

  const removeMedicine = (index) => {
    setOngoingMedicines((s) => s.filter((_, i) => i !== index));
  };

 const handlePrint = () => {
  if (!printRef.current) return;

  // clone printable DOM so we can mutate safely
  const clone = printRef.current.cloneNode(true);

  // remove elements that should not be printed
  clone.querySelectorAll("[data-no-print]").forEach((el) => el.remove());

  // optional: also remove any dialog modals or elements you don't want
  clone.querySelectorAll(".react-modal, .dialog").forEach((el) => el.remove());

  const win = window.open("", "_blank", "width=900,height=800");
  if (!win) return;

  win.document.write(`
    <html>
        <head>
          <title>Consultation Report</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; margin: 40px; color: #111; }
            h1,h2,h3,h4,h5,h6 { margin: 0; }
            .card { border: 1px solid #000; padding: 16px; border-radius: 8px; margin-bottom: 16px; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 8px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            .label { font-weight: 500; }

            /* --- Print-specific Styling --- */
            @media print {
              body { margin: 10mm 15mm; font-size: 13px; line-height: 1.5; color: #000; background: #fff; }
              table, th, td { border-color: #333; }
              .no-print, [data-no-print] { display: none !important; }
              .card { box-shadow: none !important; border: 1px solid #000; }
              button, input, textarea { display: none !important; }
              .text-sm { font-size: 12px; }
              .text-lg { font-size: 15px; font-weight: 600; }
              .text-xl { font-size: 18px; font-weight: 700; }
            }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
  `);

  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
};


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8" ref={printRef}>
      {/* Clinic & Doctor Details */}
      <Card className="border shadow-sm header bg-black dark:bg-slate-800">
        <CardHeader className="p-6 pt-2 pb-2 bg-black dark:bg-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{clinicInfo.name}</h1>
              <p className="text-sm text-gray-300">{clinicInfo.address}</p>
              <p className="text-sm text-gray-300">
                Reg: {clinicInfo.regNo} | {clinicInfo.phone}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Doctor</p>
              <h2 className="font-semibold text-white">{doctorInfo.name}</h2>
              <p className="text-sm text-gray-300">{doctorInfo.qualification}</p>
              <p className="text-sm text-gray-300">Reg Date: {doctorInfo.regDate}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Patient Info Section */}
      <Card className="border shadow-sm bg-gray-400 dark:bg-gray-700">
        <CardContent className="p-6 grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-lg">{patientInfo.name}</p>
            <p className="text-sm text-gray-700 dark:text-white">
              {patientInfo.age} yrs • {patientInfo.gender}
            </p>
            <p className="text-sm text-gray-700 dark:text-white">{patientInfo.contact}</p>
            {/* <p className="text-sm text-gray-700 dark:text-white">
              Patient ID: {patientInfo.id}
            </p> */}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>Reg Date: {patientInfo.registrationDate}</p>
            <p>DOB: {patientInfo.dob}</p>
            <p>No. of Visits: {patientInfo.visits}</p>
            <div className="flex items-center justify-between">
              <p>Last Diagnosis: {patientInfo.lastDiagnosis}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" data-no-print size="sm" className="print:hidden">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Previous Diagnosis History</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 text-sm">
                    <p>15/04/2023 - Tooth Extraction</p>
                    <p>10/02/2023 - Root Canal</p>
                    <p>05/01/2023 - Cleaning</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultation Section */}
      <Card className="border shadow-sm bg-gray-400 dark:bg-gray-700">
        <CardHeader className="p-4 border-b">
          <p className="text-xl font-semibold text-blue-900 dark:text-gray-300">
            Consultation Details
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Vitals */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date of Consultation</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input name="bloodPressure" value={form.bloodPressure} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input name="bloodPressure" value={form.bloodPressure} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Blood Pressure</Label>
              <Input name="bloodPressure" value={form.bloodPressure} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Pulse Rate</Label>
              <Input name="pulseRate" value={form.pulseRate} onChange={handleChange} />
            </div>
          </div>

          {/* Diagnosis */}
          <div className="space-y-2">
            <Label>Diagnosis Details</Label>
            <Textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} />
          </div>

          {/* Ongoing Treatments */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Ongoing Treatments</Label>
              <div className="flex gap-2 print:hidden">
                <Input
                  placeholder="Add new treatment"
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  className="w-40"
                  data-no-print
                />
                <Button onClick={addTreatment} data-no-print><Plus/></Button>
              </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {ongoingTreatments.map((t, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>{t.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeTreatment(i)}
                    className="text-red-600 print:hidden"
                    data-no-print
                  >
                    <MinusSquare/>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Medicines */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Medicines (Ongoing)</Label>
              <div className="flex gap-2 print:hidden">
                <Input
                  placeholder="Medicine"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  className="w-32"
                  data-no-print
                />
                <Input
                  placeholder="Dosage"
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                  className="w-24"
                  data-no-print
                />
                <Button onClick={addMedicine} data-no-print><Plus/></Button>
              </div>
            </div>
            <table className="w-full text-sm border mt-2">
              <thead>
                <tr className="bg-blue-50 dark:bg-gray-600">
                  <th className="p-2 text-left">Medicine</th>
                  <th className="p-2 text-left">Dosage</th>
                  <th className="p-2 text-left print:hidden">Action</th>
                </tr>
              </thead>
              <tbody>
                {ongoingMedicines.map((m, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 dark:even:bg-gray-700 dark:odd:bg-gray-800"
                  >
                    <td className="p-2">{m.name}</td>
                    <td className="p-2">{m.dosage}</td>
                    <td className="p-2 print:hidden" data-no-print>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeMedicine(i)}
                        className="text-red-600"
                        data-no-print
                      >
                        <MinusSquare/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lab Tests */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Lab Tests</Label>
              <div className="flex items-center gap-3 print:hidden" data-no-print>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" data-no-print>
                      View Previous Tests
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Previous Lab Tests</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p>Blood Sugar - Normal</p>
                      <p>X-Ray - Clean</p>
                      <p>Calcium Levels - Slightly Low</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter lab test"
                    value={newLabTest}
                    onChange={(e) => setNewLabTest(e.target.value)}
                    className="w-64"
                    data-no-print
                  />
                  <Button onClick={addLabTest} data-no-print><Plus/></Button>
                </div>
              </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {(form.labTests || []).map((t, i) => (
                <li key={i} className="flex items-center justify-between gap-4">
                  <span className="mr-4">{t}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeLabTest(i)}
                    className="text-red-600 print:hidden"
                    data-no-print
                  >
                    <MinusSquare/>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes + Next Consultation */}
          <div className="flex gap-6">
            {/* Notes */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <Label>Notes</Label>
                <Dialog data-no-print>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="print:hidden" data-no-print>
                      History
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Previous Notes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p>Patient advised soft diet.</p>
                      <p>Follow up after 7 days.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="h-[calc(100%-2rem)]"
              />
            </div>

            {/* Next Consultation */}
            <div className="w-80 p-4 border rounded-lg bg-slate-50 space-y-2 shadow-sm dark:bg-gray-600">
              <Label>Next Consultation Date</Label>
              <Input
                type="date"
                name="nextConsultationDate"
                value={form.nextConsultationDate}
                onChange={handleChange}
              />
              <Label>Next Consultation Time</Label>
              <Input
                type="time"
                name="nextConsultationTime"
                value={form.nextConsultationTime}
                onChange={handleChange}
              />
              <Button className="w-full mt-2 print:hidden" data-no-print>Book Appointment</Button>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="mt-6 flex justify-end gap-3 print:hidden">
            <Button variant="outline" data-no-print onClick={handlePrint}>
              Print
            </Button>
            <Button data-no-print variant="">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
