package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
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

func main() {
	fmt.Println("Hello World")

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/coviteam")

	if err != nil {
		fmt.Println("v have and error", err.Error())
	} else {
		fmt.Println("connected")
	}
	defer db.Close()
	app := fiber.New()

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/home", func(c *fiber.Ctx) error {
		var teststring string
		teststring = display(db)
		return c.SendString(teststring)
	})

	app.Post("/newuser", func(c *fiber.Ctx) error {
		users := &user{}
		var str string = string(c.Body())
		fmt.Println(string(c.Body()))
		err := json.Unmarshal([]byte(str), &users)

		if err != nil {
			fmt.Println(err)
		}
		var stuff string = "\"" + users.SRN + "\"" + "," + "\"" + users.Name + "\"" + "," + "\"" + users.Email + "\"" + "," + "\"" + users.Phone_number + "\"" + "," + "\"" + users.Dept + "\"" + "," + users.Semester + "," + users.Rating + "," + users.Availability

		insert("users", stuff, db)
		return c.JSON(users)
	})
	app.Get("/newproject", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})
	app.Get("/newgroup", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})
	app.Get("/new", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})
	app.Listen(":4000")
}
func display(db *sql.DB) string {
	var teststring string
	row, err := db.Query("select * from users;")
	if err != nil {
		fmt.Println("v have got an error", err)
		return teststring
	}
	for row.Next() {
		var artID string
		var artistID string
		err2 := row.Scan(&artID, &artistID)
		if err2 != nil {
			fmt.Println("v have got an in display in error")
		}
		teststring = teststring + artID + artistID + "\n"
	}
	fmt.Println("displayed")

	return teststring
}
func insert(table string, stuff string, db *sql.DB) {

	fmt.Println("insert into " + table + " values(" + stuff + ");")
	var str string = "insert into " + table + " values(" + stuff + ")"
	fmt.Println(db)
	if db == nil {
		fmt.Println("db is nil")
		return
	}
	_, err := db.Exec(str)
	if err != nil {
		fmt.Println("v have got an error", err)
	}
}
