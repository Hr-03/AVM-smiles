"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TreatmentUpdates() {
  const [patient, setPatient] = useState("");
  const [treatment, setTreatment] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");

  const patients = ["John Doe", "Jane Smith", "Alex Johnson"];
  const ongoingTreatments = ["Root Canal", "Crown Fixing", "Teeth Cleaning"];
  const dateOfProcedure = "2025-11-10";

  const handleUpdate = () => {
    const data = { patient, treatment, dateOfProcedure, details, status };
    console.log("Update Submitted:", data);
    alert("Treatment Update Submitted!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 ">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      > */}
        <Card className="w-full shadow-2xl border rounded-2xl overflow-hidden backdrop-blur-sm bg-gray-900 py-0">
          <CardHeader className="bg-blue-950 p-2 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-center">
              Treatment Updates
            </h2>
          </CardHeader>

          <CardContent className="p-6 sm:p-10 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-white">Patient</Label>
                <Select onValueChange={setPatient}>
                  <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-indigo-500 w-full">
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p, idx) => (
                      <SelectItem key={idx} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ongoing Treatment Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-white">Ongoing Treatment</Label>
                <Select onValueChange={setTreatment}>
                  <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-indigo-500 w-full">
                    <SelectValue placeholder="Select Treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {ongoingTreatments.map((t, idx) => (
                      <SelectItem key={idx} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date of Procedure */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-white">Date of Procedure</Label>
              <Input
                type="text"
                value={dateOfProcedure}
                disabled
                className="mt-1 bg-gray-100 text-gray-800 dark:text-white border-gray-200 rounded-md w-full"
              />
            </div>

            {/* Details */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-white">Details</Label>
              <Textarea
                placeholder="Enter procedure details..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1 border-gray-300 focus-visible:ring-indigo-500 min-h-[120px] w-full"
              />
            </div>

            {/* Status */}
            <div className="w-full md:w-1/2">
              <Label className="text-sm font-medium text-gray-700 dark:text-white">Status</Label>
              <Select onValueChange={setStatus}>
                <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-indigo-500 w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Hold">Hold</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Given to Lab">Given to Lab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Update Button */}
            <div className="pt-4 flex justify-center">
              <Button
                onClick={handleUpdate}
                className="px-10 py-3 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all w-full md:w-auto"
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      {/* </motion.div> */}
    </div>
  );
}
