export abstract class Error {
    abstract errorCode: number;
    abstract message: string;
}

export class NoErrors extends Error {
    errorCode= 600;
    message= "everything is operational";
}

export class PatientNotFoundError extends Error {
    errorCode= 601;
    message= "Patient Not Found, please scan the patient barcode";
}

export class MedicationNotFoundError extends Error {
    errorCode= 602;
    message= "Medication Not Found";
}

