
use FullStackAssignment

create table Categories(
CategoryId int identity(101,1) constraint pk_CategoryId primary key,
CategoryName varchar(100) not null,
CategoryImage varchar(500)
)


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
[Password] varchar(300),
Roles varchar(20) default 'user',
)


go
create proc usp_AddCategory(@CategoryName varchar(50), @CategoryImgUrl varchar(200))
as 
if( exists(Select 'a' from Categories Where CategoryName = @CategoryName))
	return -1
else
	begin
	Insert into Categories(CategoryName, CategoryImage) values (@CategoryName, @CategoryImgUrl);
	return 99
	end
go

go 
create proc usp_UpdateProduct(@ProductId int, @ProductName varchar(50), @Description varchar(200), @UnitPrice Money, @UnitInStock int, @Discontinued Bit, @CategoryId int)
as
if( exists(Select 'a' from Products where ProductId=@ProductId))
	begin
		Update Products Set ProductName=@ProductName, [Description]=@Description, UnitPrice=@UnitPrice, UnitsInStock=@UnitInStock, Discontinued=@Discontinued, 
		CategoryId=@CategoryId, ModifiedDate=GetDate() where ProductId=@ProductId;
		return 99
	end
else
	return -1
go


Select * from Cart

update users set Roles = 'admin' where UserId =1





Go
Create Procedure usp_AddProduct 
	@ProductName varchar(50),
	@Description varchar(100),
	@UnitPrice Money,
	@UnitsInStock int,
	@Discontinued Bit,
	@CategoryId int,
	@ProductImage varchar(200)
As
	if( exists(Select 'a' from Products Where ProductName = @ProductName))
		return -1
	else
		begin
		Insert into Products(ProductName, [Description], UnitPrice, UnitsInStock, Discontinued, CategoryId, ProductImage)
		values (@ProductName, @Description, @UnitPrice, @UnitsInStock, @Discontinued, @CategoryId, @ProductImage)
		return 99;
		end
Go

Go
Create Procedure usp_AddNewUser
	@FirstName varchar(50),
	@LastName varchar(50),
	@Gender char(6),
	@DateOfBirth Datetime,
	@MobileNumber char(10),
	@EmailId varchar(150)
As
	Insert into Users(FirstName, LastName, Gender, DateOfBirth, MobileNumber, EmailId)
	values (@FirstName, @LastName, @Gender, @DateOfBirth, @MobileNumber, @EmailId)
Go

Select * from Categories

alter table Users add [Password] varchar(300)

go 
create proc usp_registerUser(@FirstName varchar(50),@LastName varchar(50),@Gender char(6) ,@DateOfBirth DateTime ,@MobileNumber char(10),@EmailId varchar(150),@Password varchar(150))
as 
begin 
	insert Users (FirstName ,LastName,Gender,DateOfBirth,MobileNumber,EmailId,[Password]) values (@FirstName,@LastName,@Gender,@DateOfBirth,@MobileNumber,@EmailId,@Password)
end


go
create PROCEDURE usp_loginUser
    @EmailId VARCHAR(150),
    @EncryptedPassword VARCHAR(150) OUTPUT  -- Define an output parameter for the password
AS
BEGIN
    DECLARE @passwrd VARCHAR(150)
    SELECT @passwrd = Password FROM Users WHERE EmailId = @EmailId
    IF (@passwrd IS NOT NULL)
    BEGIN
        -- Set the output parameter to the password value
        SET @EncryptedPassword = @passwrd
    END
    ELSE
    BEGIN
        -- If no password is found, set the output parameter to NULL
        SET @EncryptedPassword = NULL
    END
END



select * from Categories

update Categories set CategoryImage='../../assets/Images/aboutUs.jpg' 

create table Cart(
CartId int identity(1,1),
productId int constraint fk_productId foreign key references Products(ProductId),
ProductImage varchar(500),
cartStock int ,
ProductName varchar(100),
ProductPrice decimal,
ProductDescription varchar(100),
UserId int constraint fk_userId foreign key references Users(UserId)
)

go 
alter proc usp_addToCart(@ProductId INT,
    @ProductImage VARCHAR(500),
    @CartStock INT,
    @ProductName VARCHAR(100),
    @ProductPrice DECIMAL,
    @ProductDescription VARCHAR(100),
    @UserId INT )
as 
BEGIN
	if(not exists (select 'a' from Users where UserId=@UserId) or not exists (select 'a' from Products where ProductId=@ProductId))
	begin
		 return -99
	end
	if( exists (select 'a' from Cart where UserId=@UserId and productId = @ProductId) )
	begin
		 return -100
	end
     INSERT INTO Cart (ProductId, ProductImage, CartStock, ProductName, ProductPrice, ProductDescription, UserId)
    VALUES (@ProductId, @ProductImage, @CartStock, @ProductName, @ProductPrice, @ProductDescription, @UserId);
	return 1
END;

 

go
create proc usp_updateCartStock(@ProductId INT,
    @CartStock INT,
    @UserId INT )
as 
BEGIN
	if(not exists (select 'a' from Users where UserId=@UserId) or not exists (select 'a' from Products where ProductId=@ProductId))
	begin
		 return -99
	end
	else
	begin
		update Cart set cartStock=@CartStock where productId=@ProductId and UserId =@UserId
		return (select @CartStock From Cart where  productId=@ProductId and UserId =@UserId)
	end
END;

go
create proc usp_deleteCart(@CartId int )
as 
BEGIN
	if(not exists (select 'a' from Cart where CartId=@CartId))
	begin
		 return -99
	end
	delete From Cart where CartId=@CartId
	return 1
END;

Select * from Users