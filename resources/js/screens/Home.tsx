import React from "react";

import { ExampleModal } from "@/modals";
import { Button } from "@/ui";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="prose p-10 text-white lg:prose-xl">
        <h1 className="text-white">HOME Title</h1>

        <h2 className="text-white">HOME Subtitle</h2>

        <h3 className="text-white">HOME SubSubtitle</h3>

        <p>paragraph</p>

        <ul>
          <li>item</li>

          <li>item</li>

          <li>item</li>

          <li>item</li>
        </ul>

        <Button onClick={() => setIsModalOpen(true)}>
          I open the example modal
        </Button>
      </div>
      <ExampleModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
