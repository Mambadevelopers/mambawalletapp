import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Home() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <PageTitle
        title={`Hello, ${user.firstName} ${user.lastName} , Welcome to MAMBAwALLETX`}
      />
      <div className="bg-tertiary p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md text-white">Account Number</h1>
          <h1 className="text-md text-white">{user._id}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">Balance</h1>
          <h1 className="text-md text-secondary">${user.balance || 0}</h1>
        </div>
      </div>
      <div className="bg-tertiary p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">First Name</h1>
          <h1 className="text-md text-secondary">{user.firstName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">Last Name</h1>
          <h1 className="text-md text-secondary">{user.lastName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-white">Email</h1>
          <h1 className="text-md text-white">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">Mobile</h1>
          <h1 className="text-md text-secondary">{user.phoneNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">Identification Type</h1>
          <h1 className="text-md text-secondary">{user.identificationType}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-secondary">Identification Number</h1>
          <h1 className="text-md text-secondary">{user.identificationNumber}</h1>
        </div>
      </div>
      <div className="bg-tertiary p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md text-white">Address</h1>
          <h1 className="text-md text-white">{user.address}</h1>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
