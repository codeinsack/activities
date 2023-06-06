import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "semantic-ui-react";

const ModalContainer = () => {
  const { modalStore } = useStore();

  return (
    <Modal
      size="mini"
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
    >
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
