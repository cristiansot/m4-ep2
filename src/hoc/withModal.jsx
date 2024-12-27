import React, { useState } from 'react';

const withModal = (WrappedComponent) => {
  return (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <>
        <WrappedComponent
          {...props}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </>
    );
  };
};

export default withModal;
