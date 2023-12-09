import re


def sanitize_query(query: str) -> str:
    # Remove leading and trailing whitespaces
    query = query.strip()

    # Regular expression pattern:
    # [^\w\s^-] matches any character that is not alphanumeric (\w), whitespace (\s), hat (^), or dash (-)
    # (?<!\d)\.|\.(?!\d) matches a period (.) that is not part of a floating point number
    sanitized_query = re.sub(r'[^\w\s^:-]|(?<!\d)\.|\.(?!\d)', '', query)

    # Return sanitized query
    return sanitized_query
