export default function PlanDetail({params}:{params: {plan_slug:string}}){
  return (
    <div>
      <p>Plan detail {params.plan_slug}</p>
    </div>
  )
}
