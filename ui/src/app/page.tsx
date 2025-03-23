'use client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Typography, Button, Box, Grid2 as Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LockIcon from '@mui/icons-material/Lock';
import InsightsIcon from '@mui/icons-material/Insights';
import Footer from '@/components/footer/Footer';
import FeatureCard from '@/components/common/FeatureCard';
import { useTheme } from '@mui/material/styles';

export default function Home() {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
            <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '10vh' }}>
                <Typography variant="h2" gutterBottom sx={{ marginTop: 3 }}>
                    Welcome to Spending Tracker
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Track your expenses effortlessly. Secure. Fast. Free.
                </Typography>
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" href="/login">Login</Button>
                    <Button variant="outlined" color="secondary" href="/register">Register</Button>
                </Box>
            </Container>

            <Container maxWidth="lg" sx={{ marginTop: 10, flex: 1 }}>
            <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={<MonetizationOnIcon sx={{ fontSize: theme.typography.h3.fontSize, color: theme.palette.success.main }} />}
                            title="Track Expenses"
                            description="Easily log your daily expenses and manage them effectively."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={<LockIcon sx={{ fontSize: theme.typography.h3.fontSize, color: theme.palette.success.main }} />}
                            title="Secure & Private"
                            description="Your data is encrypted and safe. Privacy is our priority."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={<InsightsIcon sx={{ fontSize: theme.typography.h3.fontSize, color: theme.palette.success.main }} />}
                            title="Visual Insights"
                            description="Get clear visual insights and charts of your spending habits."
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}
