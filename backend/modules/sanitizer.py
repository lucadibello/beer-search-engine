import re


def sanitize_query(query: str) -> str:
    # Remove leading and trailing whitespaces
    query = query.strip()

    # Remove all non-alphanumeric characters
    query = re.sub(r"[^a-zA-Z0-9\s]", "", query)

    # Return sanitized query
    return query
