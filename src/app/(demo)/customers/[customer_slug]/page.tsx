export default function CustomerDetail({params}:{params: {customer_slug:string}}){
  return (
    <div>
      <p>User detail {params.customer_slug}</p>
    </div>
  )

}
