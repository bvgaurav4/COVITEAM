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
type project struct {
	Project_id            string `json:"project_id"`
	Project_name          string `json:"project_name"`
	Project_desc          string `json:"project_desc"`
	Project_tags          string `json:"project_tags"`
	Project_creation_date string `json:"project_creation_date"`
	Project_photo         string `json:"project_photo"`
}
type group struct {
	Group_id            string `json:"group_id"`
	Group_name          string `json:"group_name"`
	Group_creation_date string `json:"group_creation_date"`
	Group_photo         string `json:"group_photo"`
}
type group_members struct {
	Group_id string `json:"group_id"`
	SRN      string `json:"SRN"`
	State    string `json:"state"`
}
type project_members struct {
	Project_id string `json:"project_id"`
	SRN        string `json:"SRN"`
	Role       string `json:"role"`
	Permission string `json:"permission"`
}
type resources struct {
	Resource_id    string `json:"resource_id"`
	Resources_name string `json:"resources_name"`
	Resources_desc string `json:"resources_desc"`
	Resources_tags string `json:"resources_tags"`
}
type project_resources struct {
	Project_id  string `json:"project_id"`
	Resource_id string `json:"resource_id"`
}
type domain struct {
	Domain_id   string `json:"domain_id"`
	Domain_name string `json:"domain_name"`
	Domain_desc string `json:"domain_desc"`
	Domain_tags string `json:"domain_tags"`
}
type department struct {
	Dept_id   string `json:"dept_id"`
	Dept_name string `json:"dept_name"`
	Dept_desc string `json:"dept_desc"`
	Dept_tags string `json:"dept_tags"`
}
type creates_project struct {
	SRN        string `json:"SRN"`
	Project_id string `json:"project_id"`
}
type creates_group struct {
	SRN      string `json:"SRN"`
	Group_id string `json:"group_id"`
}
type user_domain_interests struct {
	SRN       string `json:"SRN"`
	Domain_id string `json:"domain_id"`
}

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
		return c.SendString("meow  meow nigga")
	})
	app.Post("/getgrps", func(c *fiber.Ctx) error {
		var str string = string(c.Body())
		var lol map[string]interface{}
		err := json.Unmarshal([]byte(str), &lol)
		if err != nil {
			fmt.Println("v have error", err)
		}
		fmt.Println("fuck off")
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
		fmt.Println("fuck off")
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
		fmt.Println("fuck off")
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
		var teststring string = display(db, lol["table"].(string), "1")

		return c.JSON(fiber.Map{"body": teststring})
	})

	app.Post("/newuser", func(c *fiber.Ctx) error {
		users := user{}
		var str string = string(c.Body())
		userAgent := c.Get("User-Agent")
		fmt.Println("User-Agent:", userAgent)
		fmt.Println(string(c.Body()))
		err := json.Unmarshal([]byte(str), &users)

		if err != nil {
			fmt.Println(err)
			return c.Status(500).SendString("Failed to insert data: " + err.Error())

		}
		var stuff string = formatStruct(users)

		err2 := insert("users", stuff, db)
		if err2 != nil {
			return c.Status(500).SendString("Failed to insert data: " + err2.Error())

		}
		return c.JSON(users)
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
			if teststring != "" {
				return c.Status(200).SendString("ok")
			} else {
				return c.Status(500).SendString("Failed to insert data: ")
			}
		}

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
func insert(table string, stuff string, db *sql.DB) error {

	fmt.Println("insert into " + table + " values(" + stuff + ");")
	var str string = "insert into " + table + " values(" + stuff + ")"
	if db == nil {
		fmt.Println("db is nil")
	}
	_, err := db.Exec(str)
	if err != nil {
		fmt.Println("v have got an error", err)
	}
	return err
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
