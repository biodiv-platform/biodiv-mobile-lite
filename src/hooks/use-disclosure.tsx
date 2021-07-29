import { useCallback, useState } from "react";

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export const useDisclosure = (props?: UseDisclosureProps) => {
  const [isOpen, setIsOpen] = useState(props?.defaultIsOpen || false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, onOpen, onClose, onToggle };
};
