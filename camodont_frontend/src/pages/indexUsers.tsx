import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, IconButton, Button, VStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CalendarIcon, ChatIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Services from '../components/Services';
import AppointmentsList from '../components/AppointmentsList';
import CompleteProfile from '../components/Profile';
import { borrarSesion, get } from '../hooks/SessionUtil';
import { useRouter } from "next/navigation";

const IndexUsers = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Bienvenida');
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [datosIncompletos, setDatosIncompletos] = useState(false);
  const { isOpen: isProfileOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = () => {
      const rol = get('rol');
      const nombre = get('nombre');
      const apellidos = get('apellidos');
      const telefono = get('telefono');

      setRole(rol);
      setUserName(nombre);

      if (!nombre || !apellidos || !telefono) {
        setDatosIncompletos(true);
        onOpen(); 
      }
    };
    fetchUserData();
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
  };

  const Salir = () => {
    borrarSesion();
    router.push("/");
    return null;
  };

  const renderContent = () => {
    if (isProfileOpen) {
      return (
        <CompleteProfile
          external_id={get("user_id")}
          onComplete={() => {
            setDatosIncompletos(false);
            onClose();
          }}
        />
      );
    }

    switch (selectedMenu) {
      case 'Campañas':
        return <Services />;
      case 'Citas':
        return <AppointmentsList />;
      case 'Salir':
        return Salir();
      default:
        return <Text>Bienvenido {userName}</Text>;
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
        <Flex align="center" direction="column" justify="center" mb={6}>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            colorScheme="teal"
            variant="outline"
            mb={4}
          />
          <Avatar name={userName} size="lg" mb={4} />
          {isOpen && <Text>{userName}</Text>}
        </Flex>

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
        <Box p={6}>
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default IndexUsers;
