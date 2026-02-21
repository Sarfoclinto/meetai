import ResponsiveDialog from "@/components/responsive-dialog";
import AgentForm from "./agent-form";
import { AgentGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

const UpdateAgentDialogue = ({ onOpenChange, open, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Edit agent detials"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
export default UpdateAgentDialogue;
