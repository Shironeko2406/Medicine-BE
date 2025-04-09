import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { LoginActionAsync } from "../../Redux/ReducerAPI/AuthenticationReducer"
import { useNavigate } from "react-router-dom"
import { useAsyncAction } from "../../Hook/UseAsyncAction"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { run } = useAsyncAction();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    if (name === "rememberMe") {
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        })
      }
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    run(LoginActionAsync(formData),() => navigate("/user"));
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 400,
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
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Please sign in to continue
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              name="username"
              variant="outlined"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              variant="outlined"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    color="primary"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
                Forgot password?
              </Link>
            </Box>

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
              Sign In
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link onClick={() => navigate("/register")}sx={{ textDecoration: "none", fontWeight: "bold", cursor: "pointer" }}>
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login
