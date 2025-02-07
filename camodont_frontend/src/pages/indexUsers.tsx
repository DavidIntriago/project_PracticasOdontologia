import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  VStack,
  useColorMode,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaUser, FaBars, FaList, FaCalendarAlt, FaHistory, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { get_api } from "../hooks/Conexion";
import ServiceDetails from "../components/ServiceDetails";
import { useRouter } from "next/navigation";
import { borrarSesion } from "../hooks/SessionUtil";

const UserMenu = () => {
  const { colorMode } = useColorMode();
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  const generateRandomDoctor = () => {
    const names = ["Dr. Pérez", "Dra. Gómez", "Dr. Ramírez", "Dra. López", "Dr. Fernández"];
    return names[Math.floor(Math.random() * names.length)];
  };

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
        const mappedAppointments = apiAppointments.map((appointment) => ({
          ...appointment,
          doctor: generateRandomDoctor(),
        }));
        setAppointments(mappedAppointments);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }
    if (showAppointments) fetchAppointments();
  }, [showAppointments]);

  const menuItems = [
    { label: "Perfil", icon: <FaUser />, action: () => console.log("Perfil") },
    { label: "Campañas", icon: <FaUser />, action: () => console.log("Campañas") },
    { label: "Servicios", icon: <FaList />, action: () => { setShowServices(true); setShowAppointments(false); } },
    { label: "Citas", icon: <FaCalendarAlt />, action: () => { setShowAppointments(true); setShowServices(false); } },
    { label: "Historial", icon: <FaHistory />, action: () => console.log("Historial") },
    { label: "Cerrar sesión", icon: <FaSignOutAlt />, action: () => {borrarSesion();
      router.push("/");  },}
  ];

  return (
    <Flex>
      <Box width="250px" bg={colorMode === "light" ? "gray.100" : "gray.700"} p={4} minHeight="100vh">
        <VStack spacing={4} align="stretch">
          {menuItems.map((item, index) => (
            <Button key={index} leftIcon={item.icon} colorScheme="teal" variant="ghost" onClick={item.action}>
              {item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      <Box flex="1" p={10} bg={colorMode === "light" ? "white" : "gray.800"} overflowY="auto">
        {showServices && (
          <>
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
          </>
        )}

        {showAppointments && (
          <>
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
                    <Text><strong>Servicio:</strong> {appointment.Servicio.nombre}</Text>
                    <Text><strong>Lugar:</strong> {appointment.lugar}</Text>
                  </Box>
                ))
              ) : (
                <Text>No tienes citas agendadas.</Text>
              )}
            </SimpleGrid>
          </>
        )}

        {selectedService && (
          <ServiceDetails service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </Box>
    </Flex>
  );
};

export default UserMenu;
