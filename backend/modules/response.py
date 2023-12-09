from typing import List, Dict, Hashable, Any


def format_response(data: List[Dict[Hashable, Any]], total_hits: int, additional_data: Dict[Hashable, Any] = None):
    return {
        'total_hits': total_hits,
        'data': data,
        # Spread additional data
        **additional_data
    }
