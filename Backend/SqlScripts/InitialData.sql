create Database EmployeeDB

create table dbo.Department(
	DepartmentId int identity(1,1),
	DepartmentName varchar(500)
)


insert into dbo.Department values
('Sales')


insert into dbo.Department values
('Product')

create table dbo.Employee(
	EmployeeId int  identity(1,1),
	FirstName varchar(500),
	LastName varchar(500),
	Department varchar(500),
	DateOfHire date,
	Birthday date,
	ProfilePhoto varchar(500),
	ProfileDescription varchar(8000)
)



insert into dbo.Employee values
('David', 'Bain', 'Product', '2016-01-01', '1989-04-13', 'myPicture.png', 'My name is David I work at Orbis Education')

select * from dbo.Employee