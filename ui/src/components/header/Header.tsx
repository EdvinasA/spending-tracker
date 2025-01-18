import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Spending tracker
                    </Typography>
                    <Button variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
