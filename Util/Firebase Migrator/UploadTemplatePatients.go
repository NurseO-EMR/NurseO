package main

func UploadTemplatePatients() {
	patients := GetTemplatePatients()
	uploadPatient(patients)
}

func UploadRegularPatient() {
	patients := GetPatients()
	for i := 0; i < len(patients); i++ {
		p := patients[i]
		id := Query("INSERT INTO `Patient` (`name`, `dob`,`age`,`gender`,`height`, `weight`,`time_hour`,`time_minute`,`lab_doc_url`,`imaging_url`,`diagnosis`,`course_id`,`template`, patient_bar_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
			p.Name,
			p.Dob,
			p.Age,
			p.Gender,
			p.Height,
			p.Weight,
			p.Time.Hour,
			p.Time.Minutes,
			p.LabDocURL,
			p.ImagingURL,
			p.Diagnosis,
			Hash(p.CourseID),
			false,
			p.ID,
		)

		uploadMedOrder(p, id)
		uploadImmunizations(p, id)
		uploadFlags(p, id)
		uploadStudentReports(p, id)
		uploadAllergy(p, id)
		uploadCustomOrders(p, id)
		uploadSocialHistory(p, id)
		uploadMedicalHistory(p, id)
	}
}

func uploadPatient(patients Patients) {
	for i := 0; i < len(patients); i++ {
		p := patients[i]
		id := Query("INSERT INTO `Patient` (`name`, `dob`,`age`,`gender`,`height`, `weight`,`time_hour`,`time_minute`,`lab_doc_url`,`imaging_url`,`diagnosis`,`course_id`,`template`, patient_bar_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
			p.Name,
			p.Dob,
			p.Age,
			p.Gender,
			p.Height,
			p.Weight,
			p.Time.Hour,
			p.Time.Minutes,
			p.LabDocURL,
			p.ImagingURL,
			p.Diagnosis,
			Hash(p.CourseID),
			true,
			p.ID,
		)

		uploadMedOrder(p, id)
		uploadImmunizations(p, id)
		uploadFlags(p, id)
		uploadStudentReports(p, id)
		uploadAllergy(p, id)
		uploadCustomOrders(p, id)
		uploadSocialHistory(p, id)
		uploadMedicalHistory(p, id)
	}
}

func uploadMedOrder(patient Patient, pid int) {
	orders := patient.MedicationOrders

	for i := 0; i < len(orders); i++ {
		o := orders[i]
		completed := false
		if o.Completed != nil {
			completed = *o.Completed
		}
		id := Query("INSERT INTO `Med_Order` (`patient_id`, `med_id`,`concentration`,`route`,`frequency`, `routine`,`notes`,`order_kind`,`order_type`,`time`,`completed`,`hold_reason`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
			pid,
			Hash(o.ID),
			o.Concentration,
			o.Route,
			o.Frequency,
			o.Routine,
			o.Notes,
			o.OrderKind,
			o.OrderType,
			o.Time,
			completed,
			o.HoldReason,
		)

		uploadMarRecord(o, id)
	}
}

func uploadMarRecord(order MedicationOrder, orderId int) {
	for i := 0; i < len(order.Mar); i++ {
		record := order.Mar[i]
		Query("INSERT INTO `Mar_Record` (`med_order_id`, `hour`,`minute`,`dose`) VALUES (?, ?, ?, ?);",
			orderId,
			record.Hour,
			record.Minutes,
			record.Dose,
		)
	}
}

func uploadImmunizations(p Patient, id int) {
	for i := 0; i < len(p.Immunizations); i++ {
		Query("INSERT INTO `Immunization` (`patient_id`, `immunization`) VALUES (?, ?);",
			id,
			p.Immunizations[i],
		)
	}
}

func uploadFlags(p Patient, id int) {
	for i := 0; i < len(p.Flags); i++ {
		Query("INSERT INTO `Flag` (`patient_id`, `name`, `reason`) VALUES (?, ?, ?);",
			id,
			p.Flags[i].Name,
			p.Flags[i].Reason,
		)
	}
}

func uploadStudentReports(p Patient, id int) {
	for i := 0; i < len(p.StudentReports); i++ {
		r := p.StudentReports[i]
		Query("INSERT INTO `Student_Report` (`patient_id`, `set_name`, `field_name`, `time`, `value`, `date`, `report_type`) VALUES (?, ?, ?, ?, ?, ?, ?);",
			id,
			r.SetName,
			r.VitalName,
			r.Time,
			r.Value,
			r.Date,
			r.ReportType,
		)
	}
}

func uploadAllergy(p Patient, id int) {
	for i := 0; i < len(p.Allergies); i++ {
		Query("INSERT INTO `Allergy` (`patient_id`, `name`, `reaction`) VALUES (?, ?, ?);",
			id,
			p.Allergies[i].Name,
			p.Allergies[i].Reaction,
		)
	}
}

func uploadCustomOrders(p Patient, id int) {
	for i := 0; i < len(p.CustomOrders); i++ {
		o := p.CustomOrders[i]
		Query("INSERT INTO `Custom_Order` (`patient_id`, `order_kind`, `order_type`, `time`, `order_text`) VALUES (?, ?, ?, ?, ?);",
			id,
			o.OrderKind,
			o.OrderType,
			o.Time,
			o.Order,
		)
	}
}

func uploadSocialHistory(p Patient, id int) {
	for i := 0; i < len(p.SocialHistory); i++ {
		Query("INSERT INTO `Social_History` (`patient_id`, `history`) VALUES (?, ?);",
			id,
			p.SocialHistory[i],
		)
	}
}

func uploadMedicalHistory(p Patient, id int) {
	for i := 0; i < len(p.MedicalHistory); i++ {
		Query("INSERT INTO `Medical_History` (`patient_id`, `date`, `title`,`notes`) VALUES (?, ?, ?, ?);",
			id,
			p.MedicalHistory[i].Date,
			p.MedicalHistory[i].Title,
			p.MedicalHistory[i].Notes,
		)
	}
}
