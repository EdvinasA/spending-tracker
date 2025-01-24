"use client";

import { Button, TextField, Typography } from "@mui/material";
import { FormBox, ImageBox, LoginContainer, MainBox } from "@/components/login/LoginComponents";
import CustomLink from "@/components/login/CustomLink";

export default function LoginPage() {
    return (
        <MainBox>
            <LoginContainer>
                <ImageBox/>
                <FormBox>
                    <Typography variant="h5" fontWeight="bold">
                        Login To Your Account
                    </Typography>
                    <TextField label="Email" variant="outlined" size="small" fullWidth/>
                    <TextField label="Password" variant="outlined" size="small" type="password" fullWidth/>
                    <Button variant="contained" color="primary" fullWidth>
                        LOGIN
                    </Button>
                    <Typography variant="body2" marginTop={2}>
                        Don't have an account? <CustomLink href="/register" text="Sign Up"/>
                    </Typography>
                </FormBox>
            </LoginContainer>
        </MainBox>
    );
}
