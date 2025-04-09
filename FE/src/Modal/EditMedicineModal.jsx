import { useState, useEffect } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Avatar,
  Typography,
  Stack,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useAsyncAction } from "../Hook/UseAsyncAction"
import { useMessage } from "../Context/MessageContext"
import { useGlobalLoading } from "../Context/LoadingContext"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { imageDB } from "../Firebase/Config"
import { v4 as uuidv4 } from "uuid";
import { EditMedicineActionAsync } from "../Redux/ReducerAPI/MedicineReducer"

// Define the hidden input for image upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const EditMedicineModal = ({ open, onClose, medicineData }) => {
  const [medicine, setMedicine] = useState({
    name: "",
    dosage: "",
    frequency: "",
    srcImg: "",
  });

  const { showLoading, hideLoading } = useGlobalLoading();
  const { showMessage } = useMessage(); 
  const { run } = useAsyncAction()

  useEffect(() => {
    if (medicineData) {
      setMedicine({
        name: medicineData.name,
        dosage: medicineData.dosage,
        frequency: medicineData.frequency,
        srcImg: medicineData.srcImg,
      });
    }
  }, [medicineData]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicine((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      showLoading()
      const avatarRef = ref(imageDB, `avatars/${uuidv4()}-${file.name}`);
      await uploadBytes(avatarRef, file);
      const downloadURL = await getDownloadURL(avatarRef);

      setMedicine((prev) => ({
        ...prev,
        srcImg: downloadURL,
      }));

      showMessage("Image uploaded successfully!", "success");
    } catch (err) {
      console.error("Upload failed:", err);
      showMessage("Image upload failed!", "error");
    } finally {
      hideLoading(); // turn off loading
    }
  }

  const handleSubmit = () => {
    run(EditMedicineActionAsync(medicine, medicineData.medicineId), () => {
        onClose();
        setMedicine({
          name: "",
          dosage: "",
          frequency: "",
          srcImg: "",
        });
      });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Edit Medicine
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please fill in the details of the medicine
        </Typography>

        <Stack spacing={3} alignItems="center">
          {/* Image Upload Section */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={medicine.srcImg || "https://via.placeholder.com/100"}
              alt="Medicine preview"
              sx={{ width: 100, height: 100, bgcolor: "lightgrey" }}
            >
              {!medicine.srcImg && "M"}
            </Avatar>
            <Button component="label" variant="outlined" size="small" sx={{ mt: 2, textTransform: "uppercase", px: 2 }}>
              Choose Image
              <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>

          {/* Medicine Information Group */}
          <Box width="100%">
            <Stack spacing={2.5} width="100%">
              <TextField
                autoFocus
                name="name"
                label="Medicine Name *"
                fullWidth
                variant="outlined"
                value={medicine.name}
                onChange={handleChange}
                required
              />

              <Box display="flex" width="100%" gap={2}>
                <TextField
                  name="dosage"
                  label="Dosage *"
                  fullWidth
                  variant="outlined"
                  value={medicine.dosage}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 200mg"
                />

                <TextField
                  name="frequency"
                  label="Frequency *"
                  fullWidth
                  variant="outlined"
                  value={medicine.frequency}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 1 time/day"
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      {/* Dialog Action Buttons */}
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "flex-end" }}>
        <Button onClick={onClose} variant="outlined" sx={{ minWidth: 100, mr: 1 }}>
          CANCEL
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!medicine.name || !medicine.dosage || !medicine.frequency}
          sx={{ minWidth: 100 }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditMedicineModal
