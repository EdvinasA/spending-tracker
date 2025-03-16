'use client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LockIcon from '@mui/icons-material/Lock';
import InsightsIcon from '@mui/icons-material/Insights';
import Footer from "@/components/footer/Footer";

export default function Home() {
    return (
        // Visa puslapio struktūra flex column
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#121212', color: '#fff' }}>
            {/* Turinys */}
            <Box sx={{ flex: 1 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '10vh' }}>
                    <Typography variant="h2" gutterBottom sx={{ marginTop: 3 }}>
                        Welcome to Spending Tracker
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Track your expenses effortlessly. Secure. Fast. Free.
                    </Typography>
                    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                        <Button variant="contained" color="primary">
                            Login
                        </Button>
                        <Button variant="outlined" color="secondary" sx={{ marginBottom: 3 }}>
                            Learn More
                        </Button>
                    </Box>
                </Container>

                <Container maxWidth="lg" sx={{ marginTop: 10 }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', textAlign: 'center', paddingY: 2 }}>
                                <CardContent>
                                    <MonetizationOnIcon sx={{ fontSize: 50, color: '#00e676' }} />
                                    <Typography variant="h5" gutterBottom>Track Expenses</Typography>
                                    <Typography variant="body2">Easily log your daily expenses and manage them effectively.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', textAlign: 'center', paddingY: 2 }}>
                                <CardContent>
                                    <LockIcon sx={{ fontSize: 50, color: '#00e676' }} />
                                    <Typography variant="h5" gutterBottom>Secure & Private</Typography>
                                    <Typography variant="body2">Your data is encrypted and safe. Privacy is our priority.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', textAlign: 'center', paddingY: 2 }}>
                                <CardContent>
                                    <InsightsIcon sx={{ fontSize: 50, color: '#00e676' }} />
                                    <Typography variant="h5" gutterBottom>Visual Insights</Typography>
                                    <Typography variant="body2">Get clear visual insights and charts of your spending habits.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}
