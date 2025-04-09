import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
  Input,
  Container,
  Stack,
} from "@mui/material"
import { Visibility, VisibilityOff, CloudUpload } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useAsyncAction } from "../../Hook/UseAsyncAction"
import { v4 as uuidv4 } from "uuid";
import { imageDB } from "../../Firebase/Config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { RegisterActionAsync } from "../../Redux/ReducerAPI/UserReducer"
import { useGlobalLoading } from "../../Context/LoadingContext"
import { useMessage } from "../../Context/MessageContext"

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { run } = useAsyncAction()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    srcAvatar: "",
    gender: 0,
    dateOfBirth: "",
  })
  const [errors, setErrors] = useState({
    userName: "",
    fullName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    dateOfBirth: "",
  })
  const { showLoading, hideLoading } = useGlobalLoading();
  const { showMessage } = useMessage(); 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "dateOfBirth" ? value : value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    try {
      showLoading()
      const avatarRef = ref(imageDB, `avatars/${uuidv4()}-${file.name}`);
      await uploadBytes(avatarRef, file);
      const downloadURL = await getDownloadURL(avatarRef);

      setFormData((prev) => ({
        ...prev,
        srcAvatar: downloadURL,
      }));

      showMessage("Tải ảnh thành công!", "success");
    } catch (err) {
      console.error("Upload failed:", err);
      showMessage("Tải ảnh thất bại!", "error");
    } finally {
      hideLoading(); // tắt loading
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required"
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.passwordHash) {
      newErrors.passwordHash = "Password is required"
    } else if (formData.passwordHash.length < 6) {
      newErrors.passwordHash = "Password must be at least 6 characters"
    }
    if (formData.confirmPassword !== formData.passwordHash) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Format the date to ISO string for API
    const formattedData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
    }

    run(RegisterActionAsync(formattedData), () => navigate("/"));
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Please fill in your information to register
          </Typography>
        </Box>

        <Container maxWidth="md">
          <Box component="form" onSubmit={handleSubmit} sx={{ py: 4 }}>
            <Stack spacing={3} alignItems="center">
              {/* Avatar upload section - centered */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={formData.srcAvatar}
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    bgcolor: "#ccc",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{
                    borderRadius: 2,
                    color: "#667eea",
                    borderColor: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                    },
                  }}
                >
                  UPLOAD AVATAR
                  <Input
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleAvatarChange}
                    inputProps={{ accept: "image/*" }}
                  />
                </Button>
              </Box>

              {/* First row: username, fullname, email - equal width */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} width="100%">
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    variant="outlined"
                    autoComplete="username"
                    autoFocus
                    value={formData.userName}
                    onChange={handleChange}
                    error={!!errors.userName}
                    helperText={errors.userName}
                    InputProps={{
                      sx: { borderRadius: 1 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    variant="outlined"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{
                      sx: { borderRadius: 1 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      sx: { borderRadius: 1 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
              </Stack>

              {/* Second row: password, confirm password - equal width */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} width="100%">
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    name="passwordHash"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="passwordHash"
                    variant="outlined"
                    autoComplete="new-password"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    error={!!errors.passwordHash}
                    helperText={errors.passwordHash}
                    InputProps={{
                      sx: { borderRadius: 1 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    variant="outlined"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      sx: { borderRadius: 1 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
              </Stack>

              {/* Third row: gender, date of birth */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} width="100%" alignItems="flex-start">
                <Box sx={{ flex: 1 }}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ color: "text.primary" }}>
                      Gender
                    </FormLabel>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                      <FormControlLabel value={0} control={<Radio />} label="Male" />
                      <FormControlLabel value={1} control={<Radio />} label="Female" />
                      <FormControlLabel value={2} control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    id="dateOfBirth"
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    variant="outlined"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      sx: { borderRadius: 1 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error fieldset": {
                          borderColor: "red",
                        },
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
              </Stack>

              {/* Register button - centered */}
              <Box sx={{ width: { xs: "100%", sm: "50%" }, mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>

              {/* Sign in link - centered */}
              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link
                  onClick={() => navigate("/")}
                  sx={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#667eea",
                    cursor: "pointer"
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Paper>
    </Box>
  )
}

export default RegisterPage
