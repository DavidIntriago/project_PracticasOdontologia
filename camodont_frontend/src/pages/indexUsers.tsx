import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, IconButton, Button, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CalendarIcon, ChatIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Services from '../components/Services';
import AppointmentsList from '../components/AppointmentsList';
import { borrarSesion, get } from '../hooks/SessionUtil';
import { useRouter } from "next/navigation";
import { get_api } from '../hooks/Conexion';

const IndexUsers = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('Bienvenida');
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const rol = get('rol');
      const externalId = get('id');
      const nombre = await get_api(`users/${externalId}`).then((data) => data.correo);
      setRole(rol);
      setUserName(nombre);
    }
    fetchUserData();

    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString('es-ES');
      setCurrentTime(`${date} ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = () => {
    if (role === "2") {
      return [
        { icon: <ChatIcon />, label: 'Citas' },
        { icon: <ArrowRightIcon />, label: 'Salir' }
      ];
    } else {
      return [
        { icon: <CalendarIcon />, label: 'Campañas' },
        { icon: <ChatIcon />, label: 'Citas' },
        { icon: <ArrowRightIcon />, label: 'Salir' }
      ];
    }
  }

  const Salir = () => {
    const router = useRouter();
    borrarSesion();
    router.push("/");
    return null;
  }

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Campañas':
        return <Services />;
      case 'Citas':
        return <AppointmentsList />;
      case 'Salir':
        return Salir();
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
        <Flex align="center" mb={6} direction="column" justify="center">
          {isOpen && (
            <>
              <Avatar name={userName} size="lg" mb={4} />
              <Text>{userName}</Text>
            </>
          )}
        </Flex>

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
          {menuItems().map((item, index) => (
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
        </Flex>

        <Box p={6}>
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default IndexUsers;
