const searchBeer = (query: string) => {
  if (process.env.API_URL === undefined) {
    throw new Error("API_URL is not defined")
  }
  return fetch(process.env.API_URL + "/search?q=" + query)
}

export {}
