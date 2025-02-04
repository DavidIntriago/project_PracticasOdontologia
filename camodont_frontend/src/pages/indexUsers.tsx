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
import ServiceDetails from "../components/ServiceDetails";

const UserMenu = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const apiServices = await get_api("services");
        const mappedServices = apiServices.map((service) => ({
          title: service.nombre,
          description: service.descripcion,
          duracion: service.duracion,
          id: service.id,
        }));
        setServices(mappedServices);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }
    if (showServices) fetchServices();
  }, [showServices]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const apiAppointments = await get_api("cita");
        setAppointments(apiAppointments);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }
    if (showAppointments) fetchAppointments();
  }, [showAppointments]);

  const menuItems = [
    { label: "Perfil", icon: <FaUser />, action: () => console.log("Perfil") },
    { label: "Servicios", icon: <FaList />, action: () => setShowServices(true) },
    { label: "Citas", icon: <FaCalendarAlt />, action: () => setShowAppointments(true) },
    { label: "Historial", icon: <FaHistory />, action: () => console.log("Historial") },
    { label: "Cerrar sesión", icon: <FaSignOutAlt />, action: () => console.log("Salir") },
  ];

  return (
    <Box>
      <Flex justify="start" p={4}>
        <IconButton icon={<FaBars />} aria-label="Menú" colorScheme="teal" onClick={() => setIsOpen(true)} />
      </Flex>

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

      {showServices && (
        <Box position="fixed" top="0" left="0" width="100vw" height="100vh" bg={colorMode === "light" ? "white" : "gray.800"} p={10} overflowY="auto" zIndex="20">
          <Flex justify="space-between" mb={4}>
            <Heading size="lg">Nuestros Servicios</Heading>
            <IconButton icon={<FaArrowLeft />} aria-label="Volver" onClick={() => setShowServices(false)} colorScheme="red" />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {services.map((service, index) => (
              <Box key={index} p={6} borderWidth="1px" borderRadius="lg" shadow="md">
                <Heading size="md" mb={2}>{service.title}</Heading>
                <Text mb={4}>{service.description}</Text>
                <Button colorScheme="teal" width="full" onClick={() => setSelectedService(service)}>
                  Solicitar Cita
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {showAppointments && (
        <Box position="fixed" top="0" left="0" width="100vw" height="100vh" bg={colorMode === "light" ? "white" : "gray.800"} p={10} overflowY="auto" zIndex="20">
          <Flex justify="space-between" mb={4}>
            <Heading size="lg">Mis Citas</Heading>
            <IconButton icon={<FaArrowLeft />} aria-label="Volver" onClick={() => setShowAppointments(false)} colorScheme="red" />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <Box key={index} p={6} borderWidth="1px" borderRadius="lg" shadow="md">
                  <Heading size="md" mb={2}>Cita con {appointment.doctor}</Heading>
                  <Text><strong>Fecha:</strong> {appointment.fecha}</Text>
                  <Text><strong>Hora:</strong> {appointment.hora}</Text>
                  <Text><strong>Servicio:</strong> {appointment.servicio}</Text>
                </Box>
              ))
            ) : (
              <Text>No tienes citas agendadas.</Text>
            )}
          </SimpleGrid>
        </Box>
      )}

      {selectedService && (
        <Box position="fixed" top="0" left="0" width="100vw" height="100vh" bg={colorMode === "light" ? "white" : "gray.800"} p={10} overflowY="auto" zIndex="20">
          <ServiceDetails service={selectedService} onClose={() => setSelectedService(null)} />
        </Box>
      )}
    </Box>
  );
};

export default UserMenu;