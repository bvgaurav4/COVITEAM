package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"reflect"
	"strings"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	fmt.Println("Hello World")

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/coviteam4")

	if err != nil {
		fmt.Println("v have and error", err.Error())
	} else {
		fmt.Println("connected")
	}
	defer db.Close()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",

		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("server is up and running")
	})
	app.Post("/getgrps", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
		}
		var query_string string = "call GetStudyGroupsJoinJoinsUsers(\"" + lol["email"].(string) + "\"" + ");"
		fmt.Println(query_string)
		var teststring string = Query_exec(db, query_string)
		return c.JSON(fiber.Map{"body": teststring})
	})
	app.Post("/getproj", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
		}
		var query_string string = "call GetProjectsJoinWorksOnUsers(\"" + lol["email"].(string) + "\"" + ");"
		fmt.Println(query_string)
		var teststring string = Query_exec(db, query_string)
		return c.JSON(fiber.Map{"body": teststring})
	})
	app.Post("getNoti", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
		}
		var query_string string = "call GetActiveJoins(" + "\"" + lol["email"].(string) + "\"" + ");"
		var teststring string = Query_exec(db, query_string)
		return c.JSON(fiber.Map{"body": teststring})
	})
	app.Post("/home", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
		}
		var teststring string = display(db, lol["table"].(string), lol["condition"].(string))

		return c.JSON(fiber.Map{"body": teststring})
	})

	app.Post("/newuser", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		userAgent := c.Get("User-Agent")
		fmt.Println("User-Agent:", userAgent)
		fmt.Println(string(c.Body()))
		err := json.Unmarshal([]byte(str), &lol)

		if err != nil {
			fmt.Println(err)
			return c.Status(500).SendString("Failed to insert data: " + err.Error())

		}
		var stuff string = formatStruct(lol)
		fmt.Println(stuff)
		var quer string = "INSERT INTO users (SRN, Name, email, password,phone_number, dept_id) VALUES (" + "\"" + lol["SRN"].(string) + "\"" + "," + "\"" + lol["name"].(string) + "\"" + "," + "\"" + lol["email"].(string) + "\"" + "," + "\"" + lol["password"].(string) + "\"" + "," + "\"" + lol["phone"].(string) + "\"" + "," + "\"" + lol["department_id"].(string) + "\"" + ");"
		fmt.Println(quer)
		err2 := Query_exec1(db, quer)
		if err2 != nil {
			return c.Status(500).SendString("Failed to insert data: " + err2.Error())
		}
		return c.Status(200).SendString("ok")
	})
	app.Post("/newproject", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		fmt.Println(string(c.Body()))
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			return c.Status(500).SendString("Failed to insert data: " + err.Error())
		}
		err2 := Query_exec1(db, "call AddProject("+"\""+lol["des"].(string)+"\""+","+"\""+lol["domain"].(string)+"\""+","+"\""+lol["email"].(string)+"\""+","+"\""+lol["Project_name"].(string)+"\""+");")
		fmt.Println("call AddProject(" + "\"" + lol["des"].(string) + "\"" + "," + "\"" + lol["domain"].(string) + "\"" + "," + "\"" + lol["email"].(string) + "\"" + "," + "\"" + lol["Project_name"].(string) + "\"" + ");")
		if err2 != nil {
			fmt.Println(err)
			return c.Status(500).SendString("Failed to insert data: " + err2.Error())
		} else {
			fmt.Println("All OK")
		}
		return c.Status(200).SendString("ok")
	})
	app.Post("/newgroup", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}

		fmt.Println(string(c.Body()))
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			return c.Status(500).SendString("Failed to insert data: " + err.Error())
		}
		fmt.Println("call AddStudyGroup(" + "\"" + lol["email"].(string) + "\"" + "," + "\"" + lol["Group_name"].(string) + "\"" + ");")
		err2 := Query_exec1(db, "call AddStudyGroup("+"\""+lol["email"].(string)+"\""+","+"\""+lol["Group_name"].(string)+"\""+");")

		if err2 != nil {
			fmt.Println(err)
			return c.Status(500).SendString("Failed to insert data: " + err2.Error())
		} else {
			fmt.Println("All OK")
		}
		return c.Status(200).SendString("ok")
	})
	app.Post("/login", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil || lol["email"] == "" || lol["password"] == "" {
			fmt.Println("v have error", err)
			return c.Status(500).SendString("Failed to insert data: ")
		} else {
			fmt.Println(str)
			var teststring string = display(db, "users", "email=\""+lol["email"].(string)+"\" and password=\""+lol["password"].(string)+"\"")
			fmt.Println(teststring)
			if teststring != "null" {
				return c.Status(200).SendString(teststring)
			} else {
				return c.Status(500).SendString("Failed to insert data: ")
			}
		}

	})
	app.Post("/custom_returnin_query", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		fmt.Println(str)
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
			return c.Status(500).SendString("Failed to insert data: ")
		} else {
			fmt.Println(str)
			var teststring string = Query_exec(db, lol["query"].(string))
			return c.JSON(fiber.Map{"body": teststring})
		}
	})
	app.Post("/custom_nonreturn_query", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
			return c.Status(500).SendString("Failed to insert data: ")
		} else {
			fmt.Println(str)
			err := Query_exec1(db, lol["query"].(string))
			if err != nil {
				fmt.Println("v have got an error", err)
				return c.Status(500).SendString("Failed to insert data: ")
			}
		}
		return c.Status(200).SendString("ok")
	})
	app.Post("/removerow", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {

			fmt.Println("v have error", err)
			return c.Status(500).SendString("Failed to insert data: ")
		} else {
			fmt.Println(str)
			_, err := db.Exec("delete from " + lol["table"].(string) + " where " + lol["condition"].(string) + ";")
			if err != nil {
				fmt.Println("v have got an error", err)
				return c.Status(500).SendString("Failed to insert data: ")
			}
			return c.Status(200).SendString("ok")
		}
	})
	app.Post("/update", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
			return c.Status(500).SendString("Failed to insert data: ")
		} else {
			fmt.Println(str)
			fmt.Println("update " + lol["table"].(string) + " set " + lol["newvalue"].(string) + " where " + lol["condition"].(string) + ";")
			_, err := db.Exec("update " + lol["table"].(string) + " set " + lol["newvalue"].(string) + " where " + lol["condition"].(string) + ";")
			if err != nil {
				fmt.Println("v have got an error", err)
				return c.Status(500).SendString("Failed to insert data: ")
			}
		}
		return c.Status(200).SendString("ok")
	})

	app.Listen(":4000")
}
func formatStruct(s interface{}) string {
	var values []string
	v := reflect.ValueOf(s)
	switch v.Kind() {
	case reflect.Struct:
		for i := 0; i < v.NumField(); i++ {
			field := v.Field(i)

			// Check if the field is a string
			if field.Kind() == reflect.String {
				values = append(values, "\""+field.String()+"\"")
			} else {
				values = append(values, fmt.Sprintf("%v", field.Interface()))
			}
		}
	case reflect.Map:
		for _, key := range v.MapKeys() {
			value := v.MapIndex(key)
			values = append(values, fmt.Sprintf("%v: %v", key.Interface(), value.Interface()))
		}
	default:
		return fmt.Sprintf("Unsupported kind: %s", v.Kind())
	}
	return strings.Join(values, ",")
}
func display(db *sql.DB, lol string, condition string) string {
	var teststring string
	fmt.Println("select * from " + lol + " where " + condition + ";")
	row, err := db.Query("select * from " + lol + " where " + condition + ";")
	if err != nil {
		fmt.Println("v have got an error", err)
		fmt.Println("select * from " + lol + " where " + condition + ";")
		return teststring
	}
	teststring = converting(row)
	return teststring
}
func Query_exec(db *sql.DB, lol string) string {
	row, err := db.Query(lol)
	if err != nil {
		fmt.Println("v have got an error", err)
		return err.Error()
	}
	return converting(row)
}
func Query_exec1(db *sql.DB, lol string) error {
	_, err := db.Query(lol)
	if err != nil {
		fmt.Println("v have got an error", err)
		return err
	}
	return nil
}
func converting(row *sql.Rows) string {
	columns, _ := row.Columns()
	var result []map[string]interface{}

	for row.Next() {
		values := make([]interface{}, len(columns))
		pointers := make([]interface{}, len(columns))

		for i := range values {
			pointers[i] = &values[i]
		}

		err := row.Scan(pointers...)
		if err != nil {
			fmt.Println("v have got an in display in error", err)
			continue
		}
		rowResult := make(map[string]interface{})
		for i, val := range values {
			switch v := val.(type) {
			case []byte:
				rowResult[columns[i]] = string(v)
			default:
				rowResult[columns[i]] = v
			}
		}
		result = append(result, rowResult)
	}

	jsonData, err := json.Marshal(result)
	if err != nil {
		fmt.Println("Error converting to JSON:", err)
		return ""
	}
	return string(jsonData)
}
