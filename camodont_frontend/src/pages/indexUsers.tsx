import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, IconButton, Button, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CalendarIcon, ChatIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Campaigns from '../components/Campaigns';

// Componentes de contenido simulados
const Campañas = () => <Text fontSize="xl">📢 Aquí se gestionan las campañas.</Text>;
const Citas = () => <Text fontSize="xl">📆 Aquí se gestionan las citas.</Text>;
const Salir = () => <Text fontSize="xl" color="red.600">🔴 Cerrando sesión...</Text>;

const IndexUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('Bienvenida');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString('es-ES');
      setCurrentTime(`${date} ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <CalendarIcon />, label: 'Campañas' },
    { icon: <ChatIcon />, label: 'Citas' },
    { icon: <ArrowRightIcon />, label: 'Salir' }
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Campañas':
        return <Campaigns />;
      case 'Citas':
        return <Citas />;
      case 'Salir':
        return <Salir />;
      default:
        return <Text fontSize="xl">🏠 Bienvenido al sistema de gestión de odontología.</Text>;
    }
  };

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box
        w={isOpen ? '220px' : '60px'}
        bg="teal.700"
        color="white"
        p={4}
        transition="width 0.3s"
      >
        {/* Botón hamburguesa */}
        <IconButton
          icon={<HamburgerIcon />}
          onClick={toggleMenu}
          mb={6}
          aria-label="Toggle Menu"
          colorScheme="teal"
          variant="outline"
        />

        {/* Menú dinámico */}
        <VStack spacing={6} align="stretch">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              leftIcon={item.icon}
              justifyContent={isOpen ? 'flex-start' : 'center'}
              variant="ghost"
              color="white"
              _hover={{ bg: 'teal.500' }}
              onClick={() => setSelectedMenu(item.label)}
            >
              {isOpen && item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Área principal */}
      <Box flex={1} bg="gray.100">
        {/* Navbar superior */}
        <Flex
          bg="white"
          p={4}
          boxShadow="sm"
          justify="space-between"
          align="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="teal.800">
            {currentTime}
          </Text>
          <Avatar name="Usuario" src="https://via.placeholder.com/150" size="md" />
        </Flex>

        {/* Contenido dinámico */}
        <Box p={6}>
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default IndexUsers;
