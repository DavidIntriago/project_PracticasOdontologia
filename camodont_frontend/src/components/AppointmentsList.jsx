import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Card, CardBody, Select, VStack } from '@chakra-ui/react';
import { get_api } from '../hooks/Conexion';
import { get } from '../hooks/SessionUtil';



const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        var external_id = await get("id");
        const apiAppointments = await get_api(`cita/paciente/${external_id}`);
        console.log(external_id);
        setAppointments(apiAppointments);
        console.log(apiAppointments);
        setFilteredAppointments(apiAppointments);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (filter === "Todos") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(app => app.estado === filter));
    }
  }, [filter, appointments]);

  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="teal.700" textAlign="center">
        Citas de Pacientes
      </Heading>

      <Select
        placeholder="Filtrar por estado"
        onChange={(e) => setFilter(e.target.value)}
        mb={4}
        maxW="300px"
        mx="auto"
      >
        <option value="Todos">Todos</option>
        <option value="PENDIENTE">Pendiente</option>
        <option value="Confirmada">Confirmada</option>
        <option value="Cancelada">Cancelada</option>
      </Select>

      <VStack spacing={4}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id} bg="white" boxShadow="md" borderRadius="lg" p={4} w="100%" maxW="500px">
              <CardBody>
                <Text fontWeight="bold" color="teal.800">
                  Paciente: {appointment.paciente.nombre} {appointment.paciente.apellido}
                </Text>
                <Text color="gray.600">
                  <strong>Fecha:</strong> {appointment.fecha}
                </Text>
                <Text color="gray.600">
                  <strong>Hora:</strong> {appointment.hora}
                </Text>
                <Text color={appointment.estado === "Confirmada" ? "green.500" : appointment.estado === "Cancelada" ? "red.500" : "orange.500"}>
                  <strong>Estado:</strong> {appointment.estado}
                </Text>
              </CardBody>
            </Card>
          ))
        ) : (
          <Text color="gray.500" fontSize="md">
            No hay citas disponibles.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default AppointmentsList;
