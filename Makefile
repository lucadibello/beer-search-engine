# Activate conda venv
activate:
	conda enable beer-search-engine

# Deactivate conda venv
deactivate:
	conda deactivate beer-search-engine

# Export dependencies
export:
	conda env export --no-builds > environment.yml