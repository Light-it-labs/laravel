import { MODAL_ROUTES, useNavigateModal } from "@/services/router";
import { Button } from "@/shared/ui";

export const Home = () => {
  const navigateModal = useNavigateModal();
  return (
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

      <Button onClick={() => navigateModal(MODAL_ROUTES.exampleModal)}>
        I open the example modal
      </Button>
    </div>
  );
};
