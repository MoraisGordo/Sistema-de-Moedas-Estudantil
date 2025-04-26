
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from "./imgs/logo.png"
import Face4Icon from '@mui/icons-material/Face4';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Col, Nav } from 'react-bootstrap';
import { Toolbar, Typography } from '@mui/material';
import Alunos from './pages/Alunos';
import NovoAluno from './pages/NovoAluno';


export default function Global() {

    const navegar = useNavigate();
    const [aaaaa, setAaaaa] = useState(false);
    const { page, id } = useParams();
    const drawerWidth = 250;


    const data_urls = {
        "Alunos": "alunos",


    };
    const iconsInterface = {
        "Alunos": <Face4Icon sx={{ color: "#ccaa32" }} />,
    }
    const urls_hash = new Map(Object.entries(data_urls))
    const icons = new Map(Object.entries(iconsInterface))

    const listaMenu = [
        "Alunos",

    ]


    const handleDrawerToggle = () => {
        setAaaaa(!aaaaa);
    };

    const url_nome_paginas = {
        alunos: "alunos",
        novoAluno: "novoAluno"

    }

    const drawer = (
        <div>
            <Divider style={{ opacity: "1" }} />
            <List>
                {listaMenu.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={handleDrawerToggle}
                            component={Link}
                            selected={
                                page === urls_hash.get(text)
                            }
                            to={`/${urls_hash.get(text)}`}
                        >
                            <ListItemIcon style={{ color: "#007cc2" }}>
                                {icons.get(text)}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" style={{ color: "#474646" }}>
                                        {text}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* <ListItem key={"SAIR"} disablePadding>
                    <ListItemButton >
                        <ListItemIcon style={{ color: "#007cc2" }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"SAIR"} />
                    </ListItemButton>
                </ListItem> */}
            </List>
        </div>
    )

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                    style={{
                        position: "relative",
                        boxShadow:
                            "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        <img className="w-100 pe-5 px-5" src={logo} alt="BH Tec Logo"></img>
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}px)` }}
                >
                    <Toolbar style={{ position: "absolute" }} />
                    <div className="pt-4" style={{
                        position: 'relative',
                        overflow: "auto",
                        height: "100vh"
                    }}>
                        {/* Fundo com blur */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            //backgroundImage: `url(${fundo})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            filter: "blur(8px)",
                            zIndex: 0
                        }} />
                        {/* Conteúdo sem blur */}
                        <Box className="p-5" style={{
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {page === url_nome_paginas.alunos && <Alunos />}
                            {page === url_nome_paginas.novoAluno && <NovoAluno />}
                        </Box>
                    </div>
                </Box>
            </Box>
        </>
    );
}
