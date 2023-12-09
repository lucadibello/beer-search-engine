from typing import List, Dict, Hashable, Any


def format_response(data: List[Dict[Hashable, Any]], total_hits: int, additional_data: Dict[Hashable, Any] = None):
    response = {
        'total_hits': total_hits,
        'data': data,
    }
    if additional_data is not None:
        response.update(additional_data)
    return response