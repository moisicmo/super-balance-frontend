import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { SideNav, TopNav } from '.';

const SIDE_NAV_WIDTH = 220;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

export const Layout = ({ children }: { children: any }) => {
    const { pathname } = useLocation();
    const [openNav, setOpenNav] = useState(false);
    const [settingsOpenNav, setSettingsOpenNav] = useState(false)
    const handlePathnameChange = useCallback(
        () => {

            if (settingsOpenNav) setSettingsOpenNav(false)
            if (openNav) setOpenNav(false)
        },
        [openNav, settingsOpenNav]
    );

    useEffect(
        () => {
            handlePathnameChange();
        },
        [pathname]
    );

    return (
        <>
            <TopNav onNavOpen={() => setOpenNav(true)} onTapSettings={() => setSettingsOpenNav(true)} />
            <SideNav onClose={() => setOpenNav(false)} open={openNav} />
            <LayoutRoot>
                <LayoutContainer>
                    {children}
                </LayoutContainer>
            </LayoutRoot>
        </>
    );
};
