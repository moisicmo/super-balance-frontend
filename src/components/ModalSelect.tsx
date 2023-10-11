import { Button, Drawer, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material";

export const ModalSelectComponent = React.memo((props: any) => {

    const {
        stateMultiple,
        title,
        opendrawer,
        handleDrawer,
        children,
        titleButton,
        onClickButton
    } = props;

    return (
        <Drawer
            PaperProps={{
                style: {
                    maxHeight: '75vh',
                    top: 'auto',
                    bottom: 0,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr',
                },
            }}
            anchor="bottom"
            open={opendrawer}
            onClose={() => handleDrawer(false)}
            style={{ zIndex: 9998 }}
        >
            <div style={{ overflowY: 'auto' }}>
                <Stack direction="row" justifyContent="space-between" style={{ padding: '8px', }}>
                    <Stack spacing={1}>
                        <Typography variant="h5">{title}</Typography>
                    </Stack>
                    {
                        titleButton &&
                        <div>
                            <Button
                                onClick={() => onClickButton()}
                                startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                variant="contained"
                            // disabled={permisions().filter((e) => e.name === 'Crear producto').length == 0}
                            >
                                {titleButton}
                            </Button>
                        </div>
                    }
                </Stack>
                <div style={{ padding: '16px' }}>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, {
                            stateMultiple: stateMultiple,
                        });
                    })}
                </div>
                <div style={{ padding: '3px', position: 'sticky', bottom: 0, background: '#fff' }}>
                    <Grid container sx={{ justifyContent: 'space-evenly' }}>
                        <Button onClick={() => handleDrawer(false)}>Cancelar</Button>
                        {
                            stateMultiple ?
                                <Button onClick={() => handleDrawer(false)}>Seleccionar</Button> : <></>
                        }
                    </Grid>
                </div>
            </div>
        </Drawer>
    )
});