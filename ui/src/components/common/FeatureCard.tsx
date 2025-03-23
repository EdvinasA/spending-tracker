'use client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const theme = useTheme();

    return (
        <Card sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            textAlign: 'center',
            paddingY: 2
        }}>
            <CardContent>
                <Box>
                    {icon}
                </Box>
                <Typography variant="h5" gutterBottom>{title}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
}
