package main

import "strings"

func UploadSettings() {
	settings := GetSettings()
	uploadCourses(settings)
	uploadLocations(settings)
	uploadReportSets(settings)

}

func uploadLocations(settings Settings) {
	locations := settings[0].Locations
	for i := 0; i < len(locations); i++ {
		location := locations[i]

		Query("INSERT INTO `Location` (`id`, `building`, `station`) VALUES (?, ?, ?);",
			Hash(location.ID),
			location.Building,
			location.Station,
		)

	}
}



func uploadCourses(settings Settings) {
	courses := settings[0].Courses
	for i := 0; i < len(courses); i++ {
		course := courses[i]
		Query("INSERT INTO `Course` (`id`, `name`) VALUES (?, ?);",
			Hash(course.ID),
			course.Name,
		)
	}
}

func uploadReportSets(settings Settings) {
	reportSets := settings[0].ReportSet

	for i := 0; i < len(reportSets); i++ {
		set := reportSets[i]
		setId := Query("INSERT INTO `Report_Set` (`name`, `image_url`, `report_type`) VALUES (?, ?, ?);",
			set.Name,
			set.Image,
			set.Type,
		)

		for j := 0; j < len(set.ReportFields); j++ {
			field := set.ReportFields[j]
			secondField := false
			if field.AddSecondField != nil && strings.Compare(*field.AddSecondField, "true") == 0 {
				secondField = true
			}
			fieldId := Query("INSERT INTO `Report_Field` (`name`, `field_type`, `add_second_field`, `report_set_id`) VALUES (?, ?, ? , ?);",
				field.Name,
				field.FieldType,
				secondField,
				setId,
			)

			for k := 0; k < len(field.Labels); k++ {
				label := field.Labels[k]
				Query("INSERT INTO `Report_Label` (`report_field_id`, `name`) VALUES (?, ?);",
					fieldId,
					label,
				)
			}

			for k := 0; k < len(field.VitalsOptions); k++ {
				option := field.VitalsOptions[k]
				Query("INSERT INTO `Report_Option` (`report_field_id`, `name`) VALUES (?, ?);",
					fieldId,
					option.Name,
				)
			}
		}

	}

}
