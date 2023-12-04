from typing import List, Dict, Hashable, Any


def format_response(data: List[Dict[Hashable, Any]], total_hits: int) -> dict:
    return {
        'total_hits': total_hits,
        'data': data
    }
