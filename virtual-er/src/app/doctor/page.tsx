"use client"; // Add this directive at the top of the file

import Header from "@/components/ui/header";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export type Patient = {
  PatientName: string;
  SeverityOfIllness: "Extreme" | "Major" | "Moderate" | "Minor";
  RelevantInformation: string;
  PositionInQueue: string;
  RoomNumber: number;
};

const initialPatients: Patient[] = [
  {
    PatientName: "Brock Break",
    SeverityOfIllness: "Extreme",
    RelevantInformation: "Shattered femur, needs urgent surgery",
    PositionInQueue: "0 (Current Patient)",
    RoomNumber: 115,
  },
  {
    PatientName: "Gail Rupture",
    SeverityOfIllness: "Extreme",
    RelevantInformation: "Severe head trauma",
    PositionInQueue: "1",
    RoomNumber: 155,
  },
  {
    PatientName: "Carrie Concussion",
    SeverityOfIllness: "Major",
    RelevantInformation: "Can't see straight, severe dizziness and nausea",
    PositionInQueue: "2",
    RoomNumber: 105,
  },
  {
    PatientName: "Billie Hurt",
    SeverityOfIllness: "Moderate",
    RelevantInformation: "Some lower back pain from car accident",
    PositionInQueue: "3",
    RoomNumber: 145,
  },
  {
    PatientName: "Johnny Bruise",
    SeverityOfIllness: "Minor",
    RelevantInformation: "Indicated pain on the ridge of his foot",
    PositionInQueue: "4",
    RoomNumber: 125,
  },
  {
    PatientName: "Wanda Whiplash",
    SeverityOfIllness: "Minor",
    RelevantInformation: "Some pain in lower back",
    PositionInQueue: "5",
    RoomNumber: 122,
  },
];

export default function Page() {
  const [patients, setPatients] = React.useState(initialPatients);

  const removePatient = () => {
    setPatients((prevPatients) => {
      // Remove the first patient and update the queue positions
      const updatedPatients = prevPatients.slice(1).map((patient, index) => ({
        ...patient,
        PositionInQueue: index.toString(), // Update position based on index
      }));
      // Add a new Position for the current patient if any remain
      if (updatedPatients.length > 0) {
        updatedPatients[0].PositionInQueue = "0 (Current Patient)";
      }
      return updatedPatients;
    });
  };

  return (
    <div className="relative min-h-screen"> {/* Ensure the container takes full height */}
      <Header title="Healthcare Professional"/>
      <div className="mt-10"> {/* 10px margin top for the table */}
        <div className="w-2/3 pl-10"> {/* Set width to 2/3 and left padding to 10px */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Severity of Illness</TableHead>
                <TableHead>Relevant Information</TableHead>
                <TableHead>Position in Queue</TableHead>
                <TableHead>Room Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.PatientName}>
                  <TableCell className="font-medium">{patient.PatientName}</TableCell>
                  <TableCell>{patient.SeverityOfIllness}</TableCell>
                  <TableCell>{patient.RelevantInformation}</TableCell>
                  <TableCell>{patient.PositionInQueue}</TableCell>
                  <TableCell>{patient.RoomNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Button 
        onClick={removePatient} 
        className="absolute bottom-4 right-4" // Positioning the button at the bottom right
      >
        Remove Current Patient From Queue
      </Button>
    </div>
  );
}
