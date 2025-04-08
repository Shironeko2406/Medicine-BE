import React from "react";
import { useSelector } from "react-redux";
import MyNavbar from "../../Component/MyNavbar/MyNavbar";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Login = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link href="">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;

// import { useState } from "react"
// import { EyeOutlined, EyeInvisibleOutlined, LoginOutlined } from "@ant-design/icons"
// import { Button, Input, Card, Form } from "antd"
// import styled from "styled-components"
// import { BrandContainer, CardGrid, FooterLink, ForgotPassword, FormContainer, FormDescription, FormSection, FormTitle, ImageOverlay, ImageSection, Label, LabelContainer, LoginContainer, LogoCircle, PasswordContainer, SignupLink, SignupText, StyledButton, StyledCard, StyledInput } from "../../Styled/StyledComponent";
// import { Footer } from "antd/es/layout/layout";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false)

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <LoginContainer className="container-fluid">
//       <div className="container">
//         <StyledCard>
//           <CardGrid>
//             {/* Image Section */}
//             <ImageSection>
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                 alt="Login"
//                 className="img-fluid h-100 w-100 object-fit-cover"
//                 style={{ objectPosition: "center" }}
//               />
//               <ImageOverlay>
//                 <h2 className="text-white fs-2 fw-bold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
//                   Welcome Back
//                 </h2>
//                 <p className="text-white-80 mt-2 opacity-90" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
//                   Sign in to continue your journey
//                 </p>
//               </ImageOverlay>
//             </ImageSection>

//             {/* Form Section */}
//             <FormSection>
//               <BrandContainer>
//                 <LogoCircle>
//                   <LoginOutlined style={{ fontSize: "1.1rem" }} />
//                 </LogoCircle>
//                 <FormTitle>Brand</FormTitle>
//               </BrandContainer>
//               <FormDescription>Sign into your account</FormDescription>

//               <FormContainer>
//                 <Form layout="vertical" size="large">
//                   <Form.Item
//                     label={<Label>Email address</Label>}
//                     name="email"
//                     rules={[{ required: true, message: "Please input your email!" }]}
//                   >
//                     <StyledInput placeholder="name@example.com" />
//                   </Form.Item>

//                   <Form.Item style={{ marginBottom: "1rem" }}>
//                     <LabelContainer>
//                       <Label>Password</Label>
//                       <ForgotPassword href="#">Forgot password?</ForgotPassword>
//                     </LabelContainer>
//                     <PasswordContainer>
//                       <StyledInput
//                         type={showPassword ? "text" : "password"}
//                         placeholder="••••••••"
//                         suffix={
//                           <span style={{ cursor: "pointer", color: "#9333ea" }}>
//                             {showPassword ? (
//                               <EyeOutlined onClick={togglePasswordVisibility} />
//                             ) : (
//                               <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
//                             )}
//                           </span>
//                         }
//                       />
//                     </PasswordContainer>
//                   </Form.Item>

//                   <Form.Item>
//                     <StyledButton type="primary" htmlType="submit" block>
//                       Sign in
//                     </StyledButton>
//                   </Form.Item>
//                 </Form>

//                 <SignupText>
//                   Don't have an account? <SignupLink href="#">Register here</SignupLink>
//                 </SignupText>
//               </FormContainer>

//               <Footer>
//                 <FooterLink href="#">Terms of use</FooterLink>
//                 <FooterLink href="#">Privacy policy</FooterLink>
//               </Footer>
//             </FormSection>
//           </CardGrid>
//         </StyledCard>
//       </div>
//     </LoginContainer>
//   );
// };

// export default Login;
