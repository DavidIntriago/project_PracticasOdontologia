import { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
} from "@chakra-ui/react";
import { get_api, post_api } from "../hooks/Conexion";
import { save, get } from "../hooks/SessionUtil";

type ModalProp = {
    isOpen: boolean;
    onClose: () => void;
  };

  interface Usuario {
    Usuario: {
        id: number;
        nombre: string;
        apellido: string;
    };
}

interface Servicio {
    id: number;
    nombre: string;
}

    



const RequestAppointmentModal = ({ isOpen, onClose }: ModalProp) => {
    const [services, setServices] = useState<Servicio[]>([]);
    const [students, setStudents] = useState<Usuario[]>([]);
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [place, setPlace] = useState("");
    const [student, setStudent] = useState("");
    const [hour, setHour] = useState("");
    const [campaign, setCampaign] = useState("");
    

    useEffect(() => {
        const fetchServices = async () => {
            try {
                var campaign = get("campaign"); 
                if (!campaign) return;
                const getcampana = await get_api(`campaign/${campaign}`);
                setCampaign(getcampana.id);
                setServices([]); 
                const storedServices = await get_api(`campaign/${campaign}/services`);
                setServices(storedServices);
                const storedStudents = await get_api(`campaign/${campaign}/students`);
                setStudents(storedStudents);
                console.log(storedStudents)
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
            }
        };
    
        if (isOpen) {
            fetchServices(); // Ejecutar cuando el modal se abre
        }
    }, [isOpen]); // Dependencia de isOpen para recargar datos
    

    const handleSubmit = async () => {
        const externalPaciente = get("id");
        const paciente = await get_api(`users/${externalPaciente}`);
        console.log(paciente);
        if (!service || !date || !place || !student) {
            alert("Por favor completa todos los campos");
            return;
        }
        const appointmentData = { fecha: date, hora: hour, lugar: place, estado: "PENDIENTE", idCampana: campaign, idServicio: parseInt(service), dentistaId: parseInt(student), pacienteId: paciente.id };

    
        try {
            await post_api("cita", appointmentData).then((response) => {
                console.log(response);
                if (!response) {
                    alert("Error al solicitar la cita");
                    return;
                }
                alert("Cita solicitada correctamente");
            });
        } catch (error) {
            console.error("Error al solicitar la cita:", error);
        }
        console.log("Cita solicitada:", appointmentData);


        onClose(); 
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Solicitar Cita</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={3}>
                            <FormLabel>Servicio</FormLabel>
                            <Select
                                placeholder="Selecciona un servicio"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            >
                                {services.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel>Fecha</FormLabel>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel>Hora</FormLabel>
                            <Input
                                type="time"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel>Lugar</FormLabel>
                            <Input
                                placeholder="Ej. Clínica Central"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel>Practicante</FormLabel>
                            <Select
                                placeholder="Selecciona un practicante"
                                value={student}
                                onChange={(e) => setStudent(e.target.value)}
                            >
                                <option>
                                        Aleatorio
                                    </option>
                                {students.map((p) => (
                                    
                                    <option key={p.Usuario.id} value={p.Usuario.id}>
                                        {p.Usuario.nombre} {p.Usuario.apellido}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Solicitar
                        </Button>
                        <Button onClick={onClose} ml={3}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RequestAppointmentModal;


