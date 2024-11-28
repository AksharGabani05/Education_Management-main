import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const DashboardLayout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header onMenuToggle={showSidebar ? toggleSidebar : undefined} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        {showSidebar && <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardLayout;