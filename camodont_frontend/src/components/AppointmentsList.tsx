import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Card, CardBody, Button, VStack, Collapse } from '@chakra-ui/react';
import { get_api } from '../hooks/Conexion';
import { get } from '../hooks/SessionUtil';

const AppointmentsList = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const external_id = await get("id");
        const apiAppointments = await get_api(`cita/paciente/${external_id}`);
        console.log(external_id);

        const pending = apiAppointments.filter(appointment => appointment.estado === "PENDIENTE");
        const completed = apiAppointments.filter(appointment => appointment.estado === "REALIZADO" || appointment.estado === "CANCELADO");

        setPendingAppointments(pending);
        setCompletedAppointments(completed);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  const toggleCompleted = () => setShowCompleted(!showCompleted);

  const renderAppointments = (appointments) => (
    appointments.map((appointment) => (
      <Card key={appointment.id} bg="white" boxShadow="md" borderRadius="lg" p={4} w="100%" maxW="500px">
        <CardBody>
          <Text fontWeight="bold" color="teal.800">
            Paciente: {appointment.paciente.nombre} {appointment.paciente.apellido}
          </Text>
          <Text color="gray.600">
            <strong>Fecha:</strong> {(appointment.fecha).split("T")[0]}
          </Text>
          <Text color="gray.600">
            <strong>Hora:</strong> {appointment.hora}
          </Text>
          <Text color="gray.600">
            <strong>Practicante:</strong> {appointment.dentista.nombre} {appointment.dentista.apellido}
          </Text>
          <Text color={appointment.estado === "Confirmada" ? "green.500" : appointment.estado === "Cancelada" ? "red.500" : "orange.500"}>
            <strong>Estado:</strong> {appointment.estado}
          </Text>
        </CardBody>
      </Card>
    ))
  );

  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="teal.700" textAlign="center">
        Citas
      </Heading>

      <VStack spacing={4}>
        {pendingAppointments.length > 0 ? renderAppointments(pendingAppointments) : (
          <Text color="gray.500" fontSize="md">No hay citas pendientes.</Text>
        )}

        <Button onClick={toggleCompleted} colorScheme="teal" mt={4}>
          {showCompleted ? "Ocultar Citas Realizadas" : "Mostrar Citas Realizadas"}
        </Button>

        <Collapse in={showCompleted} animateOpacity>
          {completedAppointments.length > 0 ? renderAppointments(completedAppointments) : (
            <Text color="gray.500" fontSize="md">No hay citas realizadas.</Text>
          )}
        </Collapse>
      </VStack>
    </Box>
  );
};

export default AppointmentsList;
