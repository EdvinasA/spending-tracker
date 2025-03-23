'use client';
import { HIDDEN_HEADER_PATHS } from "@/shared/constants";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Header() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkToken = () => {
      setToken(Cookies.get('token'));
    };

    checkToken();

    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setToken(undefined);
  };

  return (
    <>
      {!HIDDEN_HEADER_PATHS.includes(pathname) &&
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Image src="/assets/logotest.svg" alt="Logo" width={40} height={40}/>
              {/*<IconButton*/}
              {/*  size="large"*/}
              {/*  edge="start"*/}
              {/*  color="inherit"*/}
              {/*  aria-label="menu"*/}
              {/*  sx={{ mr: 2 }}*/}
              {/*>*/}
              {/*  <MenuIcon />*/}
              {/*</IconButton>*/}
              <Typography variant="h6" component="div" sx={{ marginLeft: 2, flexGrow: 1, fontWeight: 600 }}>
                Spending tracker
              </Typography>

              {!token ? (
                <Button
                  variant="outlined"
                  component={Link}
                  href="/login"
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  component={Link}
                  href="/"
                >
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      }
    </>
  );
}
