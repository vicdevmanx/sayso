import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function InfoDisplay({ info: InfoComponent, trigger }) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Trigger: wrapped in a span so you can pass any JSX (icon, button, etc.) */}
      <span onClick={handleOpen} className="inline-block cursor-pointer">
        {trigger}
      </span>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen} className='p-0 border-0'>
          {/* Hidden trigger since we handle opening manually */}
          <DrawerTrigger asChild>
            <span className="hidden" />
          </DrawerTrigger>
          <DrawerContent className=" border-0 bg-[#1c1f26]">
            <div className="p-2">
              <InfoComponent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#1c1f26",
              boxShadow: 24,
              p: 0,
              borderRadius: 2,
              maxWidth: "900px",
              maxHeight: "90vh",
            }}
          >
            <div className="">
              <InfoComponent />
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}
