import { LightbulbIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const email = "hello@livepayoutcalculator.com";
const subject = "Live Payout feature request";
const body = "Hello Live Payout,\n\nFeature request:\n\nWhy it would help:\n";
const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function FeatureRequestButton() {
  return (
    <Button
      type="button"
      variant="outline"
      data-feature-request
      onClick={() => {
        toast("Have a feature idea?", {
          description: "Tell us what would make your show easier to price.",
          action: {
            label: "Email us",
            onClick: () => { window.location.href = mailto; },
          },
        });
      }}
    >
      <LightbulbIcon data-icon="inline-start" />
      Request a feature
    </Button>
  );
}

export { FeatureRequestButton };
