import { MODAL_ROUTES } from "@/router";
import { useNavigateModal } from "@/router/useNavigateModal";
import { Button } from "@/ui/Button";

export function Home() {
  const navigateModal = useNavigateModal();
  return (
    <div className="prose lg:prose-xl p-10 text-white">
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
      <Button onClick={() => navigateModal(MODAL_ROUTES.successModal)}>
        I open the success modal
      </Button>
    </div>
  );
}
