"use client";

import { Button, TextField, Typography } from "@mui/material";
import { FormBox, ImageBox, RegisterContainer, MainBox } from "@/components/register";
import CustomLink from "@/components/register/CustomLink";
import PasswordField from "@/components/common/PasswordField";
import { useApi } from "@/shared/use-api/useApi";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/constants";

interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const [registerRequest, setReqisterRequest] = useState<RegisterForm>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);

    const { statusCode, error: apiError, loading, execute } = useApi('/register', 'POST');

    const onSubmit = async () => {
        setError(null);
        if (registerRequest.password !== registerRequest.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        await execute({ email: registerRequest.email, password: registerRequest.password });
        if (statusCode === 200) {
            redirect(Routes.Categories)
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReqisterRequest({
            ...registerRequest,
            [e.target.name]: e.target.value
        });
    };
    return (
        <MainBox>
            <RegisterContainer>
                <ImageBox />
                <FormBox>
                    <Typography variant="h4" fontWeight="bold">
                        Create an account
                    </Typography>
                    <Typography variant="body2">
                        Already have an account? <CustomLink href={Routes.Login} text="Log in" />
                    </Typography>
                    <TextField onChange={onChange} name='email' label="Email" type="email" variant="outlined" size="small" fullWidth />
                    <PasswordField onChange={onChange} name='password' label="Password" variant="outlined" size="small" fullWidth />
                    <PasswordField onChange={onChange} name='confirmPassword' label="Confirm Password" variant="outlined" size="small" fullWidth />
                    {apiError && <Typography variant="body2" color="error">{apiError}</Typography>}
                    {error && <Typography variant="body2" color="error">{error}</Typography>}

                    <Button 
                        onClick={onSubmit} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
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
