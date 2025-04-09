import React, { useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMedicineActionAsync, GetMedicineActionAsync } from '../../Redux/ReducerAPI/MedicineReducer';
import { useGlobalLoading } from '../../Context/LoadingContext';
import { useAsyncAction } from '../../Hook/UseAsyncAction';
import CreateMedicineModal from '../../Modal/CreateMedicineModal';
import EditMedicineModal from '../../Modal/EditMedicineModal';
import dayjs from 'dayjs';

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const {medicines} = useSelector((state) => state.MedicineReducer)
  const dispatch = useDispatch()
  const { showLoading, hideLoading } = useGlobalLoading();
  const { run } = useAsyncAction();

  useEffect(() => {
    showLoading()
    dispatch(GetMedicineActionAsync()).finally(() => hideLoading());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (medicineId) => {
    run(DeleteMedicineActionAsync(medicineId),() => {});
  };

  const handleUpdate = (medicine) => {
    setSelectedMedicine(medicine);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedMedicine([]);
  };


  return (
    <div>
      <div className='mb-5 flex justify-between'> 
        <h1 className="text-3xl font-bold text-gray-900">Medicine management</h1>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => setOpen(true)}>Create Prescription</button>
      </div>

      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Medicine Name</th>
              <th className="px-4 py-3">Dosage</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicine) => (
              <tr key={medicine.medicineId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{medicine.name}</td>
                <td className="px-4 py-3">{medicine.dosage}</td>
                <td className="px-4 py-3">{medicine.frequency}</td>
                <td className="px-4 py-3">
                  {medicine.srcImg ? (
                    <img src={medicine.srcImg} alt={medicine.name} className="w-12 h-12 object-cover rounded-full" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-4 py-3">{dayjs(medicine.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => handleUpdate(medicine)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(medicine.medicineId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center py-4 px-4 bg-gray-50">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">{`Page ${page + 1}`}</span>
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil(medicines.length / rowsPerPage) - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CreateMedicineModal
        open={open}
        onClose={() => setOpen(false)}
      />

      <EditMedicineModal
        open={openEdit}
        onClose={handleCloseEdit} 
        medicineData={selectedMedicine} 
      />
    </div>
  );
};

export default HomePage;
