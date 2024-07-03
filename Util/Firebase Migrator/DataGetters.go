package main

import "os"

func GetMeds() Medication {
	file, err := os.ReadFile("./data/medications.json")

	if err != nil {
		print(err.Error())
	}

	data, err := UnmarshalMedication(file)

	if err != nil {
		print(err.Error())
	}

	return data
}

func GetTemplatePatients() Patients {
	file, err := os.ReadFile("./data/templatePatients.json")

	if err != nil {
		print(err.Error())
	}

	data, err := UnmarshalPatients(file)

	if err != nil {
		print(err.Error())
	}

	return data
}

func GetPatients() Patients {
	file, err := os.ReadFile("./data/patients.json")

	if err != nil {
		print(err.Error())
	}

	data, err := UnmarshalPatients(file)

	if err != nil {
		print(err.Error())
	}

	return data
}

func GetSettings() Settings {
	file, err := os.ReadFile("./data/settings.json")

	if err != nil {
		print(err.Error())
	}

	data, err := UnmarshalSettings(file)

	if err != nil {
		print(err.Error())
	}

	return data
}
