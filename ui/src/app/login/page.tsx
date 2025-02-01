"use client";

import { Button, TextField, Typography } from "@mui/material";
import { FormBox, ImageBox, LoginContainer, MainBox } from "@/components/login/LoginComponents";
import CustomLink from "@/components/login/CustomLink";
import PasswordField from "@/components/common/PasswordField";

export default function LoginPage() {
    return (
        <MainBox>
            <LoginContainer>
                <ImageBox/>
                <FormBox>
                    <Typography variant="h4" fontWeight="bold">
                        Login To Your Account
                    </Typography>
                    <TextField label="Email" variant="outlined" size="small" fullWidth/>
                    <PasswordField label="Password" variant="outlined" size="small" fullWidth/>
                    <Button variant="contained" color="primary" fullWidth>
                        LOGIN
                    </Button>


                    {/*<Divider sx={{ width: "100%", my: 2 }}>Or log in with</Divider>*/}
                    {/*<Button*/}
                    {/*    variant="outlined"*/}
                    {/*    color="secondary"*/}
                    {/*    fullWidth*/}
                    {/*    sx={{ height: "45px" }}*/}
                    {/*    startIcon={<img src="/assets/google.svg" alt="Google" width="20px" height="20px" />}*/}
                    {/*>*/}
                    {/*    Google*/}
                    {/*</Button>*/}


                    <Typography variant="body2" marginTop={2}>
                        Don't have an account? <CustomLink href="/register" text="Sign Up"/>
                    </Typography>
                </FormBox>
            </LoginContainer>
        </MainBox>
    );
}
