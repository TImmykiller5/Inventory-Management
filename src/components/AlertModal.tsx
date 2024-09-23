import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

const AlertModal = ({ isOpen, onClose, onConfirm, loading }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <div className="flex pt-6 space-x-2 items-center justify-end w-full">
          <Button variant="outline" onClick={e => { e.stopPropagation(); onClose()}} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={e => { e.stopPropagation(); onConfirm()}} disabled={loading}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
