
"use client";

import { useState } from "react";

import SecretExperience from "./SecretExperience";
import SecretTrigger from "./SecretTrigger";

type SecretOverlayProps = {
  className?: string;
};

export default function SecretOverlay({
  className = "",
}: SecretOverlayProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={className}>
        <SecretTrigger onActivate={() => setOpen(true)} />
      </div>

      <SecretExperience
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
