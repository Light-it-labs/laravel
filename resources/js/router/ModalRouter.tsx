import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";

import { SuccessModal } from "@/modals";
import { MODAL_ROUTES } from "./routes";

export const ModalRouter = ({ showModal }: { showModal: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TransitionGroup>
      <Transition key={location.pathname} timeout={600}>
        {(state) => {
          const show = state !== "exited" && state !== "exiting";

          if (!showModal) {
            return null;
          }

          const goBack = () => state !== "exiting" && navigate(-1);

          return (
            <Routes location={location}>
              <Route
                path={`${MODAL_ROUTES.successModal}`}
                element={<SuccessModal show={show} onClose={goBack} />}
              />
            </Routes>
          );
        }}
      </Transition>
    </TransitionGroup>
  );
};
