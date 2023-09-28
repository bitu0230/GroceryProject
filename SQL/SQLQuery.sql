
use FullStackAssignment

create table Categories(
CategoryId int identity(101,1) constraint pk_CategoryId primary key,
CategoryName varchar(100) not null,
CategoryImage varchar(50)
)

-- upfdate a column name 
EXEC sp_rename 'Category.CateoryId', 'CategoryId', 'COLUMN';

--sp_help Category

create Table Products(
ProductId int identity(1001,1) constraint pk_ProductId primary key,
ProductName varchar(50) not null,
[Description] varchar(100),
UnitPrice Money not null constraint chk_UnitPrice check(UnitPrice >=1),
UnitsInStock int not null constraint chk_UnitsInStock check(UnitsInStock >=1),
Discontinued Bit default 1 ,
CategoryId int constraint fk_CategoryId references Categories(CategoryID) ,
CreatedDate DateTime not null default GetDate(),
ModifiedDate Datetime 
)


create Table Users(
UserId int identity(1,1) constraint pk_userId primary key,
FirstName varchar(50) not null,
LastName varchar(50) not null,
Gender char(6) constraint chk_Gender check(Gender in('Male','Female','Others')),
DateOfBirth Datetime constraint chk_DateOfBirth check(DateOfBirth <= DATEADD(YEAR, -18, GETDATE())) ,
MobileNumber char(10) constraint unk_MobileNumber Unique not null,
EmailId varchar(150) constraint unk_EmailId Unique not null,
CreatedDate DateTime not null default GetDate(),
)
