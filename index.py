"""Professional demo script showing basic Python types and formatted output."""

# Personal information
name = "Vella"
favorite_food = "pica"
email = "vlla123@fake.com"

# Counts
age = 25
items_purchased = 3
total_students = 30

# Numeric values
price = 10.99
gpa = 3.2
distance_km = 5.5

# Boolean flags
is_student = False
for_sale = False
is_online = True


def format_currency(amount: float) -> str:
    """Return a nicely formatted currency value."""
    return f"${amount:,.2f}"


def academic_feedback(gpa_value: float) -> str:
    """Return feedback based on GPA."""
    return "Urime! Ti ke një GPA të mirë." if gpa_value >= 3.0 else "Ti duhet të përmirësosh GPA-n tënd."


def sale_status(is_for_sale: bool) -> str:
    """Return the sale status for a product."""
    return "Produkti është në shitje." if is_for_sale else "Produkti nuk është në shitje."


def student_status(is_student_flag: bool) -> str:
    """Return whether the person is a student."""
    return "Je student." if is_student_flag else "Nuk je student."


def main() -> None:
    """Print a summary of the user's profile and status."""
    print(f"Emri im është {name} dhe email-i im është {email}. Unë dua të ha {favorite_food}.")
    print(f"Kam {age} vjet, kam blerë {items_purchased} produkte dhe në klasë janë gjithsej {total_students} studentë.")
    print(f"Çmimi është {format_currency(price)}.")
    print(f"GPA është {gpa}.")
    print(f"Ti vrapove {distance_km} km.")
    print(academic_feedback(gpa))
    print(sale_status(for_sale))
    print(student_status(is_student))
    print(f"A je online? {'Po' if is_online else 'Jo'}.")


if __name__ == "__main__":
    main()
