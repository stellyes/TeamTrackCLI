const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create connection to connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "TeamTrack",
});

// get all departments
function getDepartments() {
  const sql = `SELECT id, department_name FROM departments`;
  
  connection.query(sql, (err, rows) => {
    if (err) {
      throw new Error(err);
    }

    console.table(rows);
    init();
  });
}

// Get all roles
function getRoles() {
  const sql = `SELECT id, job_title AS title, department_id AS department, salary FROM roles`;
  
  connection.query(sql, (err, rows) => {
    if (err) {
      throw new Error(err);
    }

    console.table(rows);
    init();
  });
}

// Get all employees
function getEmployees() {
  const sql = `SELECT id, first_name, last_name, role_id AS role, manager_id FROM employees`;
  
  connection.query(sql, (err, rows) => {
    if (err) {
      throw new Error(err);
    }
    console.table(rows);
    init();
  });
}

// Create a department
function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter a department name:",
        name: "department_name",
        validate: function (input) { 
          return input.length < 31 // At most 30 characters
        }
      }
    ])
    .then((data) => {
      params = [data.department_name];
      const sql = `INSERT INTO departments (department_name)
      VALUES (?)`;
    
      connection.query(sql, params, (err, rows) => {
        if (err) {
          throw new Error(err);
        }
        console.log(`Department ${params[0]} added to TeamTrack.departments`);
        init();
      });
    });
}

// Create a role
function addRole() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    inquirer
        .prompt([
          {
            type: "input",
            message:
              "Please enter a job title:",
            name: "job_title",
            validate: function (input) { 
              return input.length < 31 // At most 30 characters
            }
          },
          {
            type: "list",
            message:
              "Please enter a deparment:",
            name: "department_id",
            choices: res.map((department) => department.department_name)
          },
          {
            type: "number",
            message:
              "Please enter a salary:",
            name: "salary",
          },
        ])
        .then((data) => {
          // Find department with matching name
          const department = res.find(
            (department) => department.name === data.department
          );
          connection.query(
            "INSERT INTO roles SET ?", 
            {
              job_title: data.job_title,
              salary: data.salary,
              department_id: department.id
            }, 
            (err, rows) => {
            if (err) {
              throw new Error(err);
            }
            
            console.log(`Role ${data.job_title} added to TeamTrack.roles`)
            init();
          });
        });
  });
}

// Create a employee
function addEmployee() {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) throw err;
    
    connection.query(
      `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees WHERE manager_id IS NULL`, 
      (err, res) => {
      if (err) throw err;
      inquirer
      .prompt([
        {
          type: "input",
          message:
            "Please enter a first name:",
          name: "first_name",
          validate: function (input) { 
            return input.length > 0 // ensures first_name is entered
          }
        },
        {
          type: "input",
          message:
            "Please enter a last name:",
          name: "last_name",
          validate: function (input) { 
            return input.length > 0 // ensures last_name is entered
          }
        },
        {
          type: "list",
          message:
            "Please select a role:",
          name: "role",
          choices: roles.map((role) => role.job_title)
        },
        {
          type: "list",
          message: "Please select a manager:",
          name: "manager",
          choices: res.map((manager) => manager.name)
        }
      ])
      .then((data) => {
        // Locate role and manager with same name
        const role = roles.find(
          (role) => role.job_title === data.role
        );

        const manager = res.find(
          (manager) => manager.name === data.manager
        )

        connection.query("INSERT INTO employees SET ?", 
        {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: role.id,
          manager_id: manager.id
        }, 
    
        (err, res) => {
          if (err) {
            throw new Error(err);
          }
          
          console.log(`Employee "${data.first_name} ${data.last_name}" added to TeamTrack.employees`);
          init();
        });
      });
    });
  });
}

// Update employee role
function updateEmployee(){
  const employeeSQL = `SELECT id, CONCAT(first_name, " ", last_name) AS name, role_id, manager_id FROM employees`;
  connection.query(employeeSQL, (err, employees) => {
    const roleSQL = `SELECT * FROM roles`
    connection.query(roleSQL, (err, roles) => {
      inquirer
      .prompt([
        {
          type: "list",
          message: "Please select an employee you wish to edit:",
          name: "employee",
          choices: employees.map((employee) => employee.name)
        },
        {
          type: "list",
          message: "Please select which role you wish to set for the employee:",
          name: "role",
          choices: roles.map((role) => role.job_title)
        }
      ])
      .then((data) => {
        // Locate role and manager with same name
        const role = roles.find(
          (role) => role.job_title === data.role
        );

        const employee = employees.find(
          (employee) => employee.name === data.employee
        )
        const sql = `UPDATE employees SET role_id = ${role.id} WHERE id = ${employee.id}`;
        connection.query(sql, (err, res) => {
          if (err) {
            throw new Error(err);
          }
          
          console.log(`${data.employee}'s role has been modified to be "${data.role}"`);
          init();
        })
      })
    })
  });
}


function getParams(type) {
  switch (type) {
    case "update-role": 
      inquirer
      .prompt([
        {
          type: "number",
          message:
            "Please enter a role ID:",
          name: "role_id",
        },
        {
          type: "number",
          message: "Please enter an employee ID",
          name: "employee_id"
        }
      ])
      .then((data) => {
        return data;
      });
      break;
    default:
      console.log("ERROR: invalid parameter type on getParams(type)");
  }
}

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message:
          "Thanks for using TeamTrackCLI. Please choose from the following options:",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
        ],
      },
    ])
    .then(function (data) {
      switch (data.choice) {
        case "View all departments":
          getDepartments();
          break;
        case "View all roles":
          getRoles();
          break;
        case "View all employees":
          getEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          return;
      }
    });
}

init(); 
return;