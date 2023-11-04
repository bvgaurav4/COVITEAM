package main

import (
	_ "github.com/go-sql-driver/mysql"
)

type user struct {
	SRN          string `json:"SRN"`
	Name         string `json:"Name"`
	Email        string `json:"email"`
	Phone_number string `json:"phone_number"`
	Dept         string `json:"dept"`
	Semester     string `json:"semester"`
	Rating       string `json:"rating"`
	Availability string `json:"availability"`
}
