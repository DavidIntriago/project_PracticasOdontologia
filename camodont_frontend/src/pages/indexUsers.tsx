import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, IconButton, Button, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CalendarIcon, TimeIcon, ChatIcon, ArrowRightIcon } from '@chakra-ui/icons';

const indexUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const time = now.toLocaleTimeString('es-ES', options);
      const date = now.toLocaleDateString('es-ES');
      setCurrentTime(`${date} ${time}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <CalendarIcon />, label: 'Campañas' },
    { icon: <ChatIcon />, label: 'Citas' },
    { icon: <ArrowRightIcon />, label: 'Salir' }
  ];

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box
        w={isOpen ? '200px' : '60px'}
        bg="teal.600"
        color="white"
        p={4}
        transition="width 0.3s"
        boxShadow="md"
      >
        <IconButton
          icon={<HamburgerIcon />}
          onClick={toggleMenu}
          mb={6}
          aria-label="Toggle Menu"
          colorScheme="teal"
          variant="outline"
        />
        <VStack spacing={6} align="stretch">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              leftIcon={item.icon}
              justifyContent={isOpen ? 'flex-start' : 'center'}
              variant="ghost"
              color="white"
              _hover={{ bg: 'teal.700' }}
            >
              {isOpen && item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex={1} bg="gray.100">
        {/* Top Navbar */}
        <Flex
          bg="white"
          p={4}
          boxShadow="sm"
          justify="space-between"
          align="center"
        >
          <Text fontSize="lg" fontWeight="bold">
          {currentTime}



          </Text>
          <Avatar name="Usuario" src="https://via.placeholder.com/150" size="md" />
        </Flex>

        {/* Content Area */}
        <Box p={6}>
          <Text fontSize="xl" color="teal.800">
            Bienvenido al sistema de gestión de odontología
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default indexUsers;