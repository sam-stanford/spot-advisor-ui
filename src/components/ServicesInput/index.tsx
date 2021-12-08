import React, { useContext, useEffect, useState } from 'react';
import Service from '../../common/api/schema/Service';
import ServiceList from './ServiceList';
import NewServiceModal from './modals/AddServiceModal';
import EditServiceModal from './modals/EditServiceModal';
import RemoveServiceModal from './modals/RemoveServiceModal';
import MessagesContext from '../../contexts/Messages/MessagesContext';
import { MessageType } from '../../common/types/Message';

// TODO: Pass as props instead
const testServices: Service[] = [
  {
    name: 'Test 1',
    minMemory: 0.4,
  },
  {
    name: 'Test 2',
    minMemory: 0.6,
  },
];

export default function ServicesInput(props: {
  services: Service[];
  addService: (s: Service) => void;
  editService: (name: string, edited: Service) => void;
  removeService: (name: string) => void;
}): JSX.Element {
  const { services, addService, editService, removeService } = props;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const { addMessage } = useContext(MessagesContext);

  useEffect(() => {
    setTimeout(() => {
      addMessage({
        message: 'hello',
        type: MessageType.ERROR,
        duration: 500,
      });
    }, 1000);
  }, []);

  return (
    <>
      <ServiceList
        services={testServices}
        addService={() => setAddModalOpen(true)}
        editService={() => setEditModalOpen(true)}
        removeService={() => setRemoveModalOpen(true)}
      />
      <NewServiceModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        addService={addService}
      />
      <EditServiceModal
        open={editModalOpen}
        setOpen={setEditModalOpen}
        editService={editService}
      />
      <RemoveServiceModal
        open={removeModalOpen}
        setOpen={setRemoveModalOpen}
        removeService={removeService}
      />
    </>
  );
}
