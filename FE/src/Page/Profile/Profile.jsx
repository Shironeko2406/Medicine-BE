import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalLoading } from '../../Context/LoadingContext';
import { GetUserByLoginActionAsync } from '../../Redux/ReducerAPI/UserReducer';

const Profile = () => {
  const {userProfile} = useSelector((state) => state.UserReducer)
  const dispatch = useDispatch()
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    showLoading()
    dispatch(GetUserByLoginActionAsync()).finally(() => hideLoading());
  }, []);
  const gender = userProfile.gender === 0 ? "Male" : "Female";
  const dateOfBirth = dayjs(userProfile.dateOfBirth).format('DD/MM/YYYY');

  return (
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full">
        <div className="flex justify-center mb-8">
          <img
            src={userProfile.srcAvatar}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-indigo-600 object-cover shadow-lg"
          />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">{userProfile.fullName}</h1>
          <p className="text-xl text-indigo-600">{userProfile.userName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-sm text-gray-500 font-semibold">Email:</span>
            <span className="text-sm text-gray-700">{userProfile.email}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-sm text-gray-500 font-semibold">Gender:</span>
            <span className="text-sm text-gray-700">{gender}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-sm text-gray-500 font-semibold">Date of Birth:</span>
            <span className="text-sm text-gray-700">{dateOfBirth}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
            Edit Profile
          </button>
        </div>
      </div>
  );
};

export default Profile;
