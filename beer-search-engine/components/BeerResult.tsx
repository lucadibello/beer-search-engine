import { Beer } from "@/service/beer-service";

export default function BeerResult(props: { beer: Beer }) {
  return (
    <div>
      <h1>{props.beer.name}</h1>
    </div>
  )
}