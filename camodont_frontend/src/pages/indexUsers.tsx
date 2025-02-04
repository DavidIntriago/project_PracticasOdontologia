import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useColorMode,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaUser, FaBars, FaList, FaCalendarAlt, FaHistory, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { get_api } from "../hooks/Conexion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ServiceDetails from "../components/ServiceDetails";

const UserMenu = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false); // Estado para mostrar servicios
  const [services, setServices] = useState([]); // Estado para almacenar servicios
  const [selectedService, setSelectedService] = useState(null);

  // ✅ Corrección en useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const apiServices = await get_api("services");
        console.log(apiServices);
        const mappedServices = apiServices.map((service) => ({
          title: service.nombre,
          description: service.descripcion,
          duracion: service.duracion,
        }));

        setServices(mappedServices);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }

    fetchData();
  }, [showServices]); // ✅ Ahora la dependencia está correctamente cerrada

  const menuItems = [
    { label: "Perfil", icon: <FaUser />, action: () => console.log("Perfil") },
    { label: "Servicios", icon: <FaList />, action: () => setShowServices(true) }, // Activa servicios
    { label: "Citas", icon: <FaCalendarAlt />, action: () => console.log("Citas") },
    { label: "Historial", icon: <FaHistory />, action: () => console.log("Historial") },
    { label: "Cerrar sesión", icon: <FaSignOutAlt />, action: () => console.log("Salir") },
  ];

  return (
    <Box>
      <Flex justify="start" p={4}>
        <IconButton
          icon={<FaBars />}
          aria-label="Menú"
          colorScheme="teal"
          onClick={() => setIsOpen(true)}
        />
      </Flex>

      {/* Drawer (Menú lateral) */}
      <Drawer isOpen={isOpen} placement="left" onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "light" ? "white" : "gray.700"}>
          <DrawerCloseButton />
          <DrawerHeader>Menú de Usuario</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {menuItems.map((item, index) => (
                <Button key={index} leftIcon={item.icon} colorScheme="teal" variant="ghost" onClick={item.action}>
                  {item.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 📌 Si showServices es true, se muestra la lista de servicios sobre la misma pantalla */}
      {showServices && (
        <Box
          position="fixed" // 🔹 Fijar el contenedor encima del fondo
          top="0"
          left="0"
          width="100vw" // 🔹 Ocupa el ancho completo de la pantalla
          height="100vh" // 🔹 Ocupa la altura completa de la pantalla
          bg={colorMode === "light" ? "white" : "gray.800"}
          p={10}
          overflowY="auto"
          zIndex="20" // 🔹 Mayor zIndex para que quede sobre todo
        >
          <Flex justify="space-between" mb={4}>
            <Heading size="lg">Nuestros Servicios</Heading>
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Volver"
              onClick={() => setShowServices(false)}
              colorScheme="red"
            />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {services.map((service, index) => (
              <Box key={index} p={6} borderWidth="1px" borderRadius="lg" shadow="md">
                <Heading size="md" mb={2}>{service.title}</Heading>
                <Text mb={4}>{service.description}</Text>

                <Button
                  colorScheme="teal"
                  width="full"
                  onClick={() => setSelectedService(service)}
                >
                  Solicitar Cita
                </Button>


              </Box>
            ))}
          </SimpleGrid>

        </Box>
      )}
     
     {selectedService && (
  <Box
  position="fixed" // Fijado en la pantalla
  top="0"
  left="0"
  width="100vw" // Ocupa todo el ancho de la pantalla
  height="100vh" // Ocupa toda la altura de la pantalla
  bg={colorMode === "light" ? "white" : "gray.800"} // Color de fondo oscuro
  p={10}
  overflowY="auto"
  zIndex="20" // Asegura que se muestre encima del fondo
>

    <ServiceDetails 
      service={selectedService} 
      onClose={() => setSelectedService(null)} 
    />
  </Box>
)}




    </Box>
  );
};

export default UserMenu;
