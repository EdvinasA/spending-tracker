"use client";

import { Button, TextField, Typography } from "@mui/material";
import { FormBox, ImageBox, RegisterContainer, MainBox } from "@/components/register";
import CustomLink from "@/components/register/CustomLink";
import PasswordField from "@/components/common/PasswordField";

export default function RegisterPage() {
    return (
        <MainBox>
            <RegisterContainer>
                <ImageBox />
                <FormBox>
                    <Typography variant="h4" fontWeight="bold">
                        Create an account
                    </Typography>
                    <Typography variant="body2">
                        Already have an account? <CustomLink href="/login" text="Log in" />
                    </Typography>
                    <TextField label="Email" type="email" variant="outlined" size="small" fullWidth />
                    <TextField label="Username" variant="outlined" size="small" fullWidth />
                    <PasswordField label="Password" variant="outlined" size="small" fullWidth />
                    <PasswordField label="Confirm Password" variant="outlined" size="small" fullWidth />

                    <Button variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>

                    {/*Google Sign Up*/}

                    {/*<Divider sx={{ width: "100%", my: 2 }}>Or sign up with</Divider>*/}
                    {/*<Button*/}
                    {/*    variant="outlined"*/}
                    {/*    color="secondary"*/}
                    {/*    fullWidth*/}
                    {/*    startIcon={<img src="/assets/google.svg" alt="Google" width="20px" height="20px" />}*/}
                    {/*>*/}
                    {/*    Google*/}
                    {/*</Button>*/}



                </FormBox>
            </RegisterContainer>
        </MainBox>
    );
}
