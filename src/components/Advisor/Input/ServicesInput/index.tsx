import React, { useState } from 'react';
import ServiceList from './ServiceList';
import RemoveServiceModal from './modals/RemoveServiceModal';
import Service from '../../../../common/api/schema/Service';
import AddServiceModal from './modals/AddServiceModal';
import EditServiceModal from './modals/EditServiceModal';
import useMessages from '../../../../hooks/useMessages';
import { MessageType } from '../../../../common/types/Message';

export default function ServicesInput(props: {
  services: Service[];
  addService: (s: Service) => void;
  editService: (name: string, edited: Service) => void;
  removeService: (name: string) => void;
}): JSX.Element {
  const { services, addService, editService, removeService } = props;

  const { newMessage } = useMessages();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [serviceToRemoveName, setServiceToRemoveName] = useState('');
  const [serviceToEdit, setServiceToEdit] = useState<Partial<Service>>({});

  const openEditModal = (toEdit: string) => {
    const current = services.find((s) => s.name === toEdit);
    if (current === undefined) {
      throw new Error(
        `Cannot edit service: no service with name "${toEdit} exists`,
      );
    }
    setServiceToEdit(current);
    setEditModalOpen(true);
  };

  const openRemoveModal = (toRemove: string) => {
    const current = services.find((s) => s.name === toRemove);
    if (current === undefined) {
      throw new Error(
        `Cannot remove service: no service with name "${toRemove} exists`,
      );
    }
    setServiceToRemoveName(toRemove);
    setRemoveModalOpen(true);
  };

  return (
    <>
      <ServiceList
        services={services}
        addService={() => setAddModalOpen(true)}
        editService={openEditModal}
        removeService={openRemoveModal}
      />
      <AddServiceModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
        submit={addService}
        currentServiceNames={services.map((s) => s.name)}
      />
      <EditServiceModal
        data={serviceToEdit}
        isOpen={editModalOpen}
        close={() => setEditModalOpen(false)}
        submit={(s: Service) => {
          if (serviceToEdit.name) {
            editService(serviceToEdit.name, s);
          } else {
            newMessage(
              'Something went wrong while trying to edit a service',
              MessageType.Error,
            );
          }
        }}
        currentServiceNames={services.map((s) => s.name)}
      />
      <RemoveServiceModal
        serviceToRemove={serviceToRemoveName}
        isOpen={removeModalOpen}
        close={() => setRemoveModalOpen(false)}
        removeService={() => {
          removeService(serviceToRemoveName);
          setRemoveModalOpen(false);
        }}
      />
    </>
  );
}
