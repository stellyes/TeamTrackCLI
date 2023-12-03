INSERT INTO departments (department_name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Finance'),
    ('Sales'),
    ('Information Technology');

INSERT INTO roles (job_title, department_id, salary)
VALUES
    ('Manager', 100, 80000.00),
    ('HR Specialist', 100, 55000.00),
    ('Marketing Coordinator', 101, 60000.00),
    ('Financial Analyst', 102, 70000.00),
    ('Sales Representative', 103, 65000.00),
    ('IT Support Specialist', 104, 60000.00),
    ('Assistant Manager', 100, 70000.00),
    ('Recruiter', 100, 55000.00),
    ('Marketing Manager', 101, 85000.00),
    ('Financial Manager', 102, 90000.00),
    ('Sales Manager', 103, 80000.00),
    ('IT Manager', 104, 85000.00),
    ('HR Assistant', 100, 50000.00),
    ('Content Writer', 101, 55000.00),
    ('Accountant', 102, 65000.00),
    ('Sales Associate', 103, 60000.00),
    ('Network Administrator', 104, 70000.00),
    ('HR Director', 100, 95000.00),
    ('Marketing Director', 101, 90000.00),
    ('Chief Financial Officer', 102, 110000.00);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 500, NULL),
    ('Mary', 'Johnson', 501, NULL),
    ('Michael', 'Williams', 502, NULL),
    ('Sarah', 'Brown', 503, NULL),
    ('David', 'Davis', 504, 1000),
    ('Jennifer', 'Wilson', 505, 1001),
    ('William', 'Jones', 506, 1002),
    ('Linda', 'Martinez', 507, 1003),
    ('Richard', 'Anderson', 508, 1000),
    ('Patricia', 'Lee', 509, 1001),
    ('Charles', 'Garcia', 510, 1002),
    ('Karen', 'Hernandez', 511, 1003),
    ('Joseph', 'Miller', 512, 1000),
    ('Elizabeth', 'Lopez', 513, 1001),
    ('Thomas', 'Perez', 514, 1002),
    ('Susan', 'Gonzalez', 515, 1003),
    ('Daniel', 'Harris', 516, 1000),
    ('Jessica', 'Clark', 517, 1001),
    ('Matthew', 'Young', 518, 1002),
    ('Nancy', 'Moore', 519, 1003);
