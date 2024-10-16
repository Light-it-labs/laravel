import React from "react";

import { Button, Modal } from "~/components";

export const Home = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className='prose p-10 lg:prose-xl'>
      <h1>Home Title</h1>
      <h2>HOME Subtitle</h2>
      <h3>HOME SubSubtitle</h3>
      <Button onClick={() => setIsOpen(!isOpen)}> Open </Button>
      <p>paragraph</p>
      <ul>
        <li>item</li>

        <li>item</li>

        <li>item</li>

        <li>item</li>
      </ul>
      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content className='flex size-full min-w-0 flex-col gap-4 bg-white px-2 py-4 text-black md:gap-6 md:p-8 md:pt-10'>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Description>
            This modal provides a preview of the selected document, allowing you
            to view its content without downloading
          </Modal.Description>
          <Modal.Footer>
            <Button variant='error' onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
