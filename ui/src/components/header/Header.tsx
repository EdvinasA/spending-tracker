'use client';
import { HIDDEN_HEADER_PATHS } from "@/shared/constants";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {!HIDDEN_HEADER_PATHS.includes(pathname) &&
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
              <Button
                variant="outlined"
                component={Link}
                href="/login"
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      }
    </>
  );
}
