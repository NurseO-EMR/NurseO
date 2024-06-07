package main

import (
	"database/sql"
	"fmt"
	"os"
	"runtime"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var db, _ = sql.Open("mysql", "root:notSecureChangeMe@tcp(localhost:3306)/NurseO")

func Query(sqlQuery string, params ...any) int {

	println(time.Now().Local().String() + "running query " + sqlQuery)

	db.SetConnMaxLifetime(time.Minute * 3)
	// db.SetMaxOpenConns(5)
	// db.SetMaxIdleConns(5)

	res, err := db.Exec(sqlQuery, params...)

	if err != nil {
		println("----------------------------------------------------------------------------------")
		fmt.Println("Params:", params)
		fmt.Printf("len(params): %v\n", len(params))
		panic(err)
	}

	id, err := res.LastInsertId()

	if err != nil {
		println("----------------------------------------------------------------------------------")
		fmt.Println("Params:", params)
		panic(err)
	}

	return int(id)
}

func ResetDB() {
	Query("DELETE FROM `Medical_History` WHERE 1")
	Query("DELETE FROM `Social_History` WHERE 1")
	Query("DELETE FROM `Custom_Order` WHERE 1")
	Query("DELETE FROM `Allergy` WHERE 1")
	Query("DELETE FROM `Student_Report` WHERE 1")
	Query("DELETE FROM `Flag` WHERE 1")
	Query("DELETE FROM `Immunization` WHERE 1")
	Query("DELETE FROM `Mar_Record` WHERE 1")
	Query("DELETE FROM `Med_Order` WHERE 1")
	Query("DELETE FROM `Patient` WHERE 1")
	Query("DELETE FROM `Report_Label` WHERE 1")
	Query("DELETE FROM `Report_Option` WHERE 1")
	Query("DELETE FROM `Report_Field` WHERE 1")
	Query("DELETE FROM `Report_Set` WHERE 1")
	Query("DELETE FROM `Medication_Location_Information` WHERE 1")
	Query("DELETE FROM `Course_Location_Information` WHERE 1")
	Query("DELETE FROM `Medication` WHERE 1")
	Query("DELETE FROM `Location` WHERE 1")
	Query("DELETE FROM `Course` WHERE 1")
}

var uuids = []string{}
var caller = []string{}

func Hash(s string) int {
	for i := 0; i < len(uuids); i++ {
		if strings.Compare(uuids[i], s) == 0 {
			// break;
			return i + 1
		}
	}

	uuids = append(uuids, s)

	// logging
	_, file, no, _ := runtime.Caller(1)
	caller = append(caller, file+": "+strconv.Itoa(no))

	data := ""
	for i := 0; i < len(uuids); i++ {
		data += strconv.Itoa(i) + " | " + uuids[i] + " | " + caller[i] + "\n"
	}

	os.Remove("./hash.txt")
	os.WriteFile("./hash.txt", []byte(data), 0755)
	// end logging

	return len(uuids)
}
