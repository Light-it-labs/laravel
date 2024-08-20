import { MODAL_ROUTES, useNavigateModal } from "~/router";
import { Button } from "~/ui";

export const Home = () => {
  const navigateModal = useNavigateModal();
  return (
    <div className="prose p-10 lg:prose-xl">
      <h1>Home Title</h1>

      <h2>HOME Subtitle</h2>

      <h3>HOME SubSubtitle</h3>

      <p>paragraph</p>

      <ul>
        <li>item</li>

        <li>item</li>

        <li>item</li>

        <li>item</li>
      </ul>

      <Button onClick={() => navigateModal(MODAL_ROUTES.successModal)}>
        I open the success modal
      </Button>
    </div>
  );
};
