package main

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"os"
	"models"
)

func main() {
	fmt.Println("Deleting old database")
	os.Remove("database.db") //remove old database, if needed
	
	fmt.Println("Creating new database")
	db, _ := gorm.Open(sqlite.Open("database.db"), &gorm.Config{}) //create new db
	_ = db.AutoMigrate(&models.Course{}, &models.Tutor{}, &models.Tutoring{}) //set up schema
	
	courses := []models.Course{
		{Code: "cop-3502", Name: "Programming Fundamentals 1"},
		{Code: "cop-3503", Name: "Programming Fundamentals 2"},
		{Code: "cot-3100", Name: "Applications of Discrete Structures"},
		{Code: "cop-3530", Name: "Data Structures and Algorithms"},
		{Code: "cen-3031", Name: "Introduction to Computer Organization"},
		{Code: "cda-3101", Name: "Introduction to Software Engineering"},
		{Code: "cis-4301", Name: "Information and Database Systems"},
		{Code: "cop-4020", Name: "Programming Language Concepts"},
		{Code: "cop-4600", Name: "Operating Systems"},
		{Code: "cnt-4007", Name: "Computer Network Fundamentals"},
	}
	db.Create(courses)
	
	tutors := []models.Tutor{
		{Username: "Alice"},
		{Username: "Bob"},
		{Username: "Clair"},
		{Username: "David"},
	}
	db.Create(tutors)
	
	tutoring := []models.Tutoring{
		{Tutor: tutors[0], Course: courses[0]},
		{Tutor: tutors[1], Course: courses[0]},
		{Tutor: tutors[1], Course: courses[1]},
		{Tutor: tutors[2], Course: courses[2]},
	}
	db.Create(tutoring)
	
}