import Balance from "./_components/Balance";
import { Box } from '@mui/material';

export default async function Page() {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 2, // Add padding as needed
            }}
        >
            <Balance />
        </Box>
    )
}
