"use client";

import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { FormBox, ImageBox, LoginContainer, MainBox } from "@/components/login/LoginComponents";
import CustomLink from "@/components/login/CustomLink";
import PasswordField from "@/components/common/PasswordField";
import { useEffect, useState } from "react";
import { useApi } from "@/shared/use-api/useApi";
import { redirect } from "next/navigation";
import Cookies from 'js-cookie'
import { Routes } from "@/shared/constants";

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginComponent() {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: '',
    });
    const { data, loading, statusCode, execute } = useApi<{ token: string }>('/login', 'POST');

    useEffect(() => {
        if (!loading && data && statusCode === 200) {
            Cookies.set('token', data.token);
            redirect(Routes.Categories)
        }
    }, [data, loading, statusCode]);

    const onSubmit = async () => {
        await execute(loginForm);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <MainBox>
            <LoginContainer>
                <ImageBox />
                <FormBox>
                    <Typography variant="h4" fontWeight="bold">
                        Login To Your Account
                    </Typography>
                    <TextField 
                        onChange={onChange} 
                        name='email' 
                        label="Email" 
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        disabled={loading}
                    />
                    <PasswordField 
                        onChange={onChange} 
                        name='password' 
                        label="Password" 
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        disabled={loading}
                    />
                    <Button 
                        onClick={onSubmit} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        disabled={loading}
                        sx={{ 
                            height: '45px',
                            position: 'relative'
                        }}
                    >
                        {loading ? (
                            <CircularProgress 
                                size={24} 
                                sx={{ 
                                    color: 'white',
                                    position: 'absolute'
                                }}
                            />
                        ) : 'LOGIN'}
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
                        Don't have an account? <CustomLink href={Routes.Register} text="Sign Up" />
                    </Typography>
                </FormBox>
            </LoginContainer>
        </MainBox>
    );
}