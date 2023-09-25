<div className="flex flex-col p-2 m-2 items-center">
  <div className="w-full flex flex-row justify-between gap-3 px-3">
    <div className="bg-blue-900 w-full mt-3 p-2 drop-shadow-xl border-b-red-800 border-b-4 font-sans font-semibold text-xl sm:text-2xl">
      {bill.bill_id.toLocaleUpperCase()} - {bill.short_title}
    </div>
  </div>
  <div className="flex flex-col sm:flex-row justify-between gap-3 px-3 w-full mt-4">
    <div className="flex flex-col justify-start w-full sm:w-1/3 items-center mb-4 sm:mb-0">
      <div className="font-semibold underline mb-2">Bill Information</div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-2">
        <li>
          <p className="font-semibold">Bill ID:</p>
        </li>
        <li className="col-span-2">
          <p>{bill.bill_id.toLocaleUpperCase()}</p>
        </li>
        <li>
          <p className="font-semibold">Bill Type:</p>
        </li>
        <li className="col-span-2">
          <p>
            {convertBillType(bill.bill_type)} ({bill.bill_type.toUpperCase()})
          </p>
        </li>
        <li>
          <p className="font-semibold">Congress:</p>
        </li>
        <li className="col-span-2">
          <p>{bill.congress}</p>
        </li>
        <li>
          <p className="font-semibold">Introduced Date:</p>
        </li>
        <li className="col-span-2">
          <p>{bill.introduced_date}</p>
        </li>
        <li>
          <p className="font-semibold">Bill Title:</p>
        </li>
        <li className="col-span-2">
          <p>{bill.title}</p>
        </li>
        <li>
          <p className="font-semibold">Sponsor:</p>
        </li>
        <li className="col-span-2">
          <Link
            href={`/members/${bill.sponsor}/${bill.sponsor_id}`}
            className="col-span-3"
          >
            {" "}
            {bill.sponsor_title} {bill.sponsor}
          </Link>
        </li>
        <li>
          <p className="font-semibold">Latest Major Action:</p>
        </li>
        <li className="col-span-2">
          <p>
            {bill.latest_major_action} ({bill.latest_major_action_date})
          </p>
        </li>{" "}
      </ul>
    </div>
    <div className="flex flex-col justify-start w-full sm:w-2/3 items-center">
      {congressBill && congressBill.title}
    </div>
  </div>
</div>;
