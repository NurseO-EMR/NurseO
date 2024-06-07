package main

func UploadMeds() {
	meds := GetMeds()
	uploadMedications(meds)
	uploadMedsLocation(meds)
}

func uploadMedications(meds Medication) {
	for i := 0; i < len(meds); i++ {
		med := meds[i]

		Query("INSERT INTO `Medication` (`id`, `brand_name`, `generic_name`, `narcoti_count_needed`) VALUES (?,?,?,?);",
			Hash(med.ID),
			med.BrandName,
			med.GenericName,
			med.NarcoticCountNeeded,
		)

	}
}

func uploadMedsLocation(meds Medication) {
	for i := 0; i < len(meds); i++ {
		med := meds[i]
		for j := 0; j < len(med.Locations); j++ {
			location := med.Locations[j]
			Query("INSERT INTO `Medication_Location_Information` (`med_id`, `location_id`, `drawer`, `slot`, `barcode`, `dose`, `type`) VALUES (?,?,?,?,?,?,?);",
				Hash(med.ID),
				Hash(location.ID),
				location.Drawer,
				location.Slot,
				location.Barcode,
				location.Dose,
				location.Type,
			)
		}

	}
}
