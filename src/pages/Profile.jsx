import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { usePrivy } from '@privy-io/react-auth';

function Profile() {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email?.address) {
      fetchUserByEmail(user.email.address);
    }
  }, [user, fetchUserByEmail]);

  useEffect(() => {
    setProfile(currentUser);
  }, [currentUser]);

  if (!profile) return null; // Show nothing if the profile is not yet available

  return (
    <div className="bg-[#13131a] border border-gray-500 rounded-xl p-6 mx-auto mt-16 max-w-4xl">
      <h1 className="text-white text-3xl font-bold mb-6">Profile</h1>
      <div className="text-white text-xl mb-4">
        <p><span className="font-semibold">Name:</span> {profile.username}</p>
        <p><span className="font-semibold">Age:</span> {profile.age}</p>
        <p><span className="font-semibold">Location:</span> {profile.location}</p>
        <p><span className="font-semibold">Email:</span> {profile.createdBy}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Records</h2>
        <ul className="list-disc list-inside text-white">
          {profile.records?.length ? (
            profile.records.map((record, index) => (
              <li key={index} className="mb-2">
                {record.name}
              </li>
            ))
          ) : (
            <li>No records found</li>
          )}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Diagnosed Problems</h2>
        <ul className="list-disc list-inside text-white">
          {profile.diagnosedProblems?.length ? (
            profile.diagnosedProblems.map((problem, index) => (
              <li key={index} className="mb-2">
                {problem}
              </li>
            ))
          ) : (
            <li>No diagnosed problems found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
