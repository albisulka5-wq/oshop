using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// BASIC LANGUAGE FEATURES

// 1. Variables & Types
int age = 25;
string name = "John";
double salary = 50000.50;
bool isActive = true;
var autoType = "Auto-typed";

// 2. Arrays & Collections
int[] numbers = { 1, 2, 3, 4, 5 };
List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
Dictionary<string, int> ages = new Dictionary<string, int> { { "John", 30 }, { "Jane", 25 } };

// 3. Strings
string greeting = $"Hello, {name}!";
string multiline = @"Line 1
Line 2";
string concatenated = "Hello" + " " + "World";

// 4. Conditionals
if (age > 18)
{
    Console.WriteLine("Adult");
}
else if (age > 13)
{
    Console.WriteLine("Teenager");
}
else
{
    Console.WriteLine("Child");
}

// 5. Loops
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

foreach (var item in names)
{
    Console.WriteLine(item);
}

while (age > 0)
{
    age--;
}

// 6. LINQ Queries
var adults = names.Where(n => n.Length > 3).ToList();
var doubled = numbers.Select(n => n * 2).ToList();
var sorted = numbers.OrderBy(n => n).ToList();

// 7. Methods
public static int Add(int a, int b)
{
    return a + b;
}

public static void Greet(string message = "Hello")
{
    Console.WriteLine(message);
}

// 8. Classes & Objects
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// 9. Exception Handling
try
{
    int result = 10 / int.Parse("0");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
finally
{
    Console.WriteLine("Cleanup");
}

// 10. Enums
public enum Status { Active, Inactive, Pending }

// COMMON FRAMEWORKS

// ASP.NET Core Controller Example
// [ApiController]
// [Route("api/[controller]")]
// public class UsersController : ControllerBase
// {
//     [HttpGet("{id}")]
//     public IActionResult GetUser(int id) { return Ok(new { id }); }
// }

// Entity Framework Core
// var users = dbContext.Users.Where(u => u.IsActive).ToList();
// dbContext.Users.Add(new User { Name = "John" });
// dbContext.SaveChanges();

// Dependency Injection
// services.AddScoped<IUserService, UserService>();

// JSON Serialization
// string json = JsonSerializer.Serialize(person);
// var obj = JsonSerializer.Deserialize<Person>(json);